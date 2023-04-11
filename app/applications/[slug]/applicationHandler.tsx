"use client"

import { Application } from "@/app/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplicationHandler({ application }: { application: Application }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const acceptHandler = async (statusApp: "accepted" | "rejected") => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/application/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: statusApp, user_id: application.user_id }),
      });

      if (res.status === 200) {
        router.push('/applications')
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <button onClick={() => acceptHandler("accepted")} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Accept</button>
        <button onClick={() => acceptHandler("rejected")} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Reject</button>
      </div>
    </>
  )
}
