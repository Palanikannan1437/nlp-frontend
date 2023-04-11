import { InferModel } from "drizzle-orm";
import { index, mysqlEnum, mysqlTable, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { int } from "drizzle-orm/mysql-core";

export const people = mysqlTable("people", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  age: int("age"),
  occupation: text("occupation"),
});

export const users = mysqlTable('users', {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  name: text("name").notNull(),
  occupation: text("occupation"),
  image: varchar("image", { length: 500 })
});

export type User = InferModel<typeof users>; // return type when queried
export type NewUser = InferModel<typeof users, 'insert'>; // insert type

export const companies = mysqlTable('companies', {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: varchar("logo", { length: 255 }),
}, (Company) => ({
  nameIndex: uniqueIndex('name_idx').on(Company.name),
}));

export type Company = InferModel<typeof companies>; // return type when queried

export type NewCompany = InferModel<typeof companies, 'insert'>; // insert type

export const applications = mysqlTable('applications', {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").notNull().references(() => users.id),
  company_id: int("company_id").notNull().references(() => companies.id),
  position: varchar("position", { length: 256 }),
  resume: varchar("resume", { length: 10000 }),
  status: mysqlEnum('status', ['pending', 'accepted', 'rejected']).default('pending'),
  personality: varchar("personality", { length: 256 }),
  summary: varchar("summary", { length: 1000 }),
});

export type Application = InferModel<typeof applications>; // return type when queried
export type NewApplication = InferModel<typeof applications, 'insert'>; // insert type

export const reviewers = mysqlTable('reviewers', {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").notNull().references(() => users.id),
  company_id: int("company_id").notNull().references(() => companies.id),
}, (reviewer) => ({
  ReviewerIndex: index('ReviewerIndex').on(reviewer.user_id),
  ReviewerCompanyIndex: index('ReviewerCompanyIndex').on(reviewer.company_id),
}));

export type Reviewer = InferModel<typeof reviewers>; // return type when queried
export type NewReviewer = InferModel<typeof reviewers, 'insert'>; // insert type
