'use client'
import { createContext, useContext, useState } from "react"

const DrawerContext = createContext(undefined)

export function DrawerContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}


export function useDrawer() {
  const context = useContext(DrawerContext)
  if (!context)
    throw new Error('useDrawer must be used inside a `DrawerContextProvider`')

  return context
}