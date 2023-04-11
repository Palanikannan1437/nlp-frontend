"use client"

import { useRef } from "react";
import { Application, Company, User } from "../db/schema";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function IntroductionForm({ user, company }: { user: User, company: Company }) {
  const router = useRouter();

  async function submitApplication(e) {
    e.preventDefault()
    if (!introRef.current?.value) {
      return;
    }
    const application: Application = {
      user_id: user.id,
      resume: introRef.current?.value,
      company_id: company.id,
      status: "pending"
    }

    try {
      const res = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast(`Application Submitted and you're personality type is ${data.data}`)
        setTimeout(() => {
          router.push('/add-application')
        }, 2000);
      }
    } catch (error) {
      console.error(error)
    }

  }

  const introRef = useRef<HTMLTextAreaElement>(null)

  return (
    <>
      <ToastContainer />
      <form className="w-3/4" onSubmit={e => submitApplication(e)}>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Please give a brief introduction about you....</label>
        <textarea ref={introRef} id="message" rows={20} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 -700" placeholder="Leave a comment..."></textarea>
        <button type="submit" className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>
    </>
  )
}
