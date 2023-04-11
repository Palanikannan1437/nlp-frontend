import { NextResponse } from 'next/server';
import { changeApplicationStatus } from "../../../db/";
import { Application } from '../../../db/schema';

export async function POST(request: Request) {
  const application: Application = await request.json();

  await changeApplicationStatus(application.status, application.user_id);

  return NextResponse.json({ status: "success" });
}

