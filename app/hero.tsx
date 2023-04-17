"use client"

import { Session } from "next-auth";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Hero({ session }: { session: Session | null }) {
  const router = useRouter();

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?w=2000&t=st=1681121890~exp=1681122490~hmac=f4e924e86a1383c4376a72823f0f41174074cab2dffcffaff822338b9fc2f887" />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Lean Hire</h1>
            <p className="mb-8 leading-relaxed">{`For years we've been okay with the rigidity and the arbitrary outcomes of existing hiring processes. Interviews are terrible. Month-long screenings are not feasible.

              And bad hires are often fatal for early stage startups.

              Instead, we believe that you can find the best suited hire by using NLP!`}</p>
            <div className="flex justify-center">
              <button onClick={() => session ? router.push("/add-application") : signIn("google")} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</button>
              <button onClick={() => router.push("/add-application")} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">View Companies</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
