"use client"

import { signIn } from "next-auth/react"

export default function SignInComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => signIn()}>Sign In</button>
    </main>
  )
}
