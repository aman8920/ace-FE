'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import {
  Card,
  Spacer,
  Button,
  // Text,
  Input,
  // Row,
  Checkbox,
} from '@nextui-org/react';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '@/applicationcontext/AuthProvider';

export default function LoginForm(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { login } = useAuth()

  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')


    await login(email, password)

    // const body = new FormData()
    // body.append('username', email)
    // body.append('password', password)

    // console.log(body)

    // const headers = {
    //   Accept: '*/*',
    // }
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers,
    //   body,
    // })

    // if (response.ok) {
    //   router.push('/dashboard')
    // } else {
    //   // Handle errors
    // }
  }


  return (
    <Card shadow="none" className="w-1/6 h-full border-none outline-none bg-transparent m-auto items-center justify-center">
      <form onSubmit={handleSubmit} autoComplete='on' aria-autocomplete='on'>
        <Input
          size="sm"
          className={{ innerWrapper: "bg-transparent", inputWrapper: "bg-transparent" }}
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onValueChange={setEmail}
          startContent={<EmailIcon fontSize="small" />}
          autoComplete="on"
        />
        <Spacer y={2} />
        <Input
          fullWidth
          className={{ innerWrapper: "bg-transparent", inputWrapper: "bg-transparent" }}
          name="password"
          size="sm"
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onValueChange={setPassword}
          startContent={<LockIcon fontSize="small" />}
          endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
            {isVisible ? (
              <VisibilityOffIcon fontSize="small" color="disabled" />
            ) : (
              <VisibilityIcon fontSize="small" color="disabled" />
            )}
          </button>}

        />

        <Spacer y={5} />
        <Button className="w-full" type="submit">Sign in</Button>
      </form>
    </Card>
  )
}