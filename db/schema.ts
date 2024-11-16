import {
  date,
  integer,
  pgTable,
  pgEnum,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

// Define the users table
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  dob: date("dob").notNull(),
  gender: varchar("gender", { length: 255 }).notNull(),
});

export const transactionsTable = pgTable("transactions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  amount: integer("amount").notNull(),
  date: timestamp("date").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  transactionType: varchar("transactionType", { length: 255 }).notNull(),
});
