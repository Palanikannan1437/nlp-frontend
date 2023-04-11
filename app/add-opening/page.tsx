"use client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRef } from "react";
import { Application, Company, User } from "../db/schema";
import { useRouter } from "next/navigation";

export default function IntroductionForm() {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null)
  const logoRef = useRef<HTMLInputElement>(null)

  async function submitApplication(e) {
    e.preventDefault()
    if (!nameRef.current?.value || !logoRef.current?.value) {
      return;
    }

    const company: Company = {
      name: nameRef.current?.value,
      logo: logoRef.current?.value,
    }

    try {
      const res = await fetch('/api/application/openings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      toast(`Added ${company.name}`);

      if (res.status === 200) {
        router.push('/applications')
      }
    } catch (error) {
      console.error(error)
    }

  }


  return (
    <>
      <ToastContainer />
      <form className="w-72 mx-auto" onSubmit={e => submitApplication(e)}>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 mt-10">Please Fill your company details</label>
        <div className="mb-6">
          <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
          <input ref={nameRef} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
        <div className="mb-6">
          <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900">Company Logo Url</label>
          <input ref={logoRef} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
        <button type="submit" className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>
    </>
  )
}
