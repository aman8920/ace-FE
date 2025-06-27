'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div
      className="flex flex-col h-screen w-screen m-auto justify-center items-center"
      style={{ backgroundColor: '#fff' }}
    >
      <LoginForm />
    </div>
  )
}
