import { NextResponse } from 'next/server';
import { insertApplication } from "../../db";
import { Application } from '@/app/db/schema';

async function Predict(text: string): Promise<string> {
  const res = await fetch(`${process.env.NEXTAUTH_ML_URL}/predict-personality`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }),
  });

  const data = await res.json();
  return data.personality;
}

async function Summarize(text: string): Promise<string> {
  const res = await fetch(`${process.env.NEXTAUTH_ML_URL}/summarize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }),
  });

  const data = await res.json();
  return data.summary;
}

export async function POST(request: Request) {
  const application: Application = await request.json();

  const personality = await Predict(application.resume as string)
  const summary = await Summarize(application.resume as string)

  const res = await insertApplication({ ...application, personality, summary });

  return NextResponse.json({ data: personality });
}
