import { NextResponse } from 'next/server';
import { insertCompany } from "../../../db/";
import { Company } from '../../../db/schema';

export async function POST(request: Request) {
  const company: Company = await request.json();

  await insertCompany(company);

  return NextResponse.json({ status: "success" });
}

