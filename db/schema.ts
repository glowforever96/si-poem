import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  nickname: varchar("nickname", { length: 50 }),
  image: text("image"),
  provider: varchar("provider", { length: 50 }),
  providerId: varchar("provider_id", { length: 255 }),
  createdAt: timestamp("created_at"),
});

export const historyTable = pgTable("history", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  task: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  start: timestamp("start").notNull(),
  end: timestamp("end").notNull(),
  duration: integer().notNull(),
  dateString: varchar("date_string", { length: 10 }).notNull(),
});
