"use client"

import Image from 'next/image'
import { useAppSelector } from '@/app/redux/hooks'
import { selectJoke } from '@/app/redux/features/joke/jokeSlice'

export default function Home() {
  const joke = useAppSelector(selectJoke);
  console.log(joke)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome</h1>
    </main>
  )
}
