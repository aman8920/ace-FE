'use client'
import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { redirect, useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm';
import { Spinner } from "@nextui-org/react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const headers = {
    Accept: '*/*',
  }

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      // console.log("getting token from cookies")
      if (token) {
        // console.log("Got a token in the cookies, let's see if it is valid")
        const headers = {
          "Authorization": `Bearer ${token}`
        }
        const response = await fetch('/api/authenticate', { method: "GET", headers })
        const data = await response.json()
        const status = response.status
        const user = data["data"]
        // console.log(user)
        // console.log(status)
        if (status === 200 && user) {
          setUser(user)
          setToken(token)
        } else {
          Cookies.remove('token')
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }
    loadUserFromCookies()
  }, [])

  const login = async (email, password) => {
    const body = new FormData()
    body.append('username', email)
    body.append('password', password)

    const response = await fetch('/api/login', { method: "POST", headers, body })
    const data = await response.json()
    const token = data["data"]["access_token"]
    // console.log(token)

    if (token) {
      // console.log("Got token")
      Cookies.set('token', token, { expires: 60 })
      setToken(token)
      const headers = {
        "Authorization": `Bearer ${token}`
      }
      let response = await fetch('/api/authenticate', { method: "GET", headers })
      let data = await response.json()
      const user = data["data"]
      setUser(user)
      // redirect("/pane")
      router.push("/dashboard")
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setToken(null)
    setUser(null)
    // delete api.defaults.headers.Authorization
    // window.location.pathname = '/login'
    redirect("/login")
    router.push("/login")
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, token, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)


export const ProtectRoute = ({ children }) => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter()

  if (loading){
    return <Spinner />;
  } else if (!loading && !isAuthenticated) {
    redirect("/login")
  }
  return children;

  // useEffect(() => {
  //   console.log(loading)
  //   console.log(isAuthenticated)
  //   if (loading || (!isAuthenticated && window.location.pathname !== '/login')) {
  //     console.log("still loading")
  //   } else if (!loading && !isAuthenticated) {
  //     console.log('redirecting to login page')
  //     router.push("/login")
  //   } else {
  //     return children
  //   }
  // }, [loading, isAuthenticated])

  // return isAuthenticated ? children : null
};
