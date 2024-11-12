import {
  date,
  integer,
  pgTable,
  pgEnum,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

// Define the enum for gender
const genderEnum = pgEnum("gender", ["male", "female", "other"]);

// Define the users table
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  dob: date("dob").notNull(),
  gender: genderEnum("gender").notNull(),
});

export const transactionsTable = pgTable("transactions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  amount: integer("amount").notNull(),
  date: timestamp("date").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
});
