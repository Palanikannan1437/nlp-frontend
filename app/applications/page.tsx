import { eq } from "drizzle-orm/expressions";
import { db } from "../db";

import { applications, companies, users } from "../db/schema";
import Link from "next/link";

async function getApplicationsWithUsers() {
  return await db.select()
    .from(applications)
    .leftJoin(users, eq(applications.user_id, users.id))
    .leftJoin(companies, eq(applications.company_id, companies.id))
    .where(eq(applications.status, "pending"));
}
export const dynamic = 'force-dynamic'
export default async function ApplicationsPage() {
  const applications = await getApplicationsWithUsers()

  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {applications.length > 0 ? applications.map(application => {
            return (
              <div key={application.applications.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex flex-col items-center pb-10 mt-10">
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={application.users?.image} alt="Bonnie image" />
                  <h5 className="mb-1 text-xl font-medium text-gray-900">{application.users?.name}</h5>
                  <span className="text-sm text-gray-500">{application.applications.personality}</span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <Link href={`/applications/${application.applications.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">{application.companies?.name}</Link>
                    <Link href={`/applications/${application.applications.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">See Analysis</Link>
                  </div>
                </div>
              </div>
            )
          }) :
            <div className="flex justify-center mx-auto">
              <h1>No applications to review yet....</h1>
            </div>
          }
        </div>
      </div>
    </>
  )
}
