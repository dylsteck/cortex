import { Message } from "ai";
import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, timestamp, json, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  fid: varchar("fid", { length: 64 }),
  username: varchar("username", { length: 64 }),
  name: varchar("name", { length: 64 }),
  bio: varchar("bio", { length: 256 }),
  verified_address: varchar("verified_address", { length: 256 }),
  signer_uuid: varchar("signer_uuid", { length: 64 }),
  pfp_url: varchar("pfp_url", { length: 256 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  messages: json("messages").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});

export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
  messages: Array<Message>;
};
