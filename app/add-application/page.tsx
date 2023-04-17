import Link from "next/link";
import { db, getCompanies } from "../db"
import { applications, companies } from "../db/schema";
import { and, eq, isNull } from "drizzle-orm/expressions";
import { getCurrentUser } from "@/lib/session";

async function getUserNotAppliedCompanies(currUserId: number) {
  return await db.select().from(companies).leftJoin(applications, and(eq(applications.company_id, companies.id), eq(applications.user_id, currUserId))).where(isNull(applications.id));
}

export const dynamic = 'force-dynamic'

export default async function ApplicationsPage() {
  const { id: currUserId } = await getCurrentUser();
  const companies = await getUserNotAppliedCompanies(currUserId);
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {companies.length > 0 ? companies.map(company => {
            return (
              <div key={company.companies.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex flex-col items-center pb-10 mt-10">
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={company.companies.logo} alt={company.companies.name + "'s Logo"} />
                  <h5 className="mb-1 text-xl font-medium text-gray-900">{company.companies.name}</h5>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <Link href={`/add-application/${company.companies.id}/apply`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Apply</Link>
                  </div>
                </div>
              </div>
            )
          }) :
            <div className="flex justify-center mx-auto">
              <h1>No job openings remaining, please try later....</h1>
            </div>
          }
        </div>
      </div>
    </>
  )
}
