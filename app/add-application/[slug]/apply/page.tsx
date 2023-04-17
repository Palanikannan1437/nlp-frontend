import IntroductionForm from "@/app/components/IntroductionForm";
import { getCompany } from "@/app/db";
import { getCurrentUser } from "@/lib/session";

type SlugParamsCompany = {
  slug: number;
}
export const dynamicParams = true
export default async function ApplicationsPage({ params }: { params: SlugParamsCompany }) {
  const user = await getCurrentUser();

  const [company] = await getCompany(params.slug)

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-blue-700 text-xl mb-3">
          Apply to {company.name}
        </p>
        <IntroductionForm user={user} company={company} />
      </div>
    </>
  )
}

