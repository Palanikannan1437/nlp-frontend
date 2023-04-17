import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";
import { NewApplication, NewCompany, NewReviewer, NewUser, applications, companies, people, reviewers, users } from "./schema";
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';

const {
  DATABASE_HOST: host,
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
} = process.env;

if (!host || !username || !password) {
  throw new Error("Some of env variables are missing");
}

const client = new Client({
  fetch,
  host,
  username,
  password,
});

const connection = client.connection();
export const db = drizzle(connection);

export const getPeople = async () => {
  return await db.select().from(people);
}

export const getUsers = async () => {
  return await db.select().from(users);
}

export const getUser = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
}

export async function insertUser(user: NewUser) {
  return await db.insert(users).values(user);
}

export const getCompanies = async () => {
  return await db.select().from(companies);
}

export const getCompany = async (id: number) => {
  return await db.select().from(companies).where(eq(companies.id, id));
}

export async function insertCompany(company: NewCompany) {
  return await db.insert(companies).values(company);
}

export const getApplication = async (id: number) => {
  return await db.select().from(applications).leftJoin(users, eq(applications.user_id, users.id)).leftJoin(companies, eq(applications.company_id, companies.id)).where(eq(applications.id, id));
}

export const getApplications = async () => {
  return await db.select().from(applications);
}

export async function changeApplicationStatus(applicationStatus: "accepted" | "rejected", userId: number) {
  return await db.update(applications)
    .set({ status: applicationStatus })
    .where(eq(applications.id, userId));
}

export async function insertApplication(application: NewApplication) {
  return await db.insert(applications).values(application);
}

export async function insertReviewers(reviewer: NewReviewer) {
  return await db.insert(reviewers).values(reviewer);
}
