"server-only";

import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { SIWNResponseData } from "@/components/custom/sign-in-with-neynar";

import { user, chat, User } from "./schema";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUserById(id: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.id, id));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function getUserByFid(fid: number): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.fid, `${fid}`));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(userData: SIWNResponseData) {
  try {
    return await db.insert(user).values({
        fid: userData.fid,
        username: userData.user.username,
        name: userData.user.display_name,
        bio: userData.user.profile.bio.text,
        verified_address: userData.user.verifications[0] ?? '',
        signer_uuid: userData.signer_uuid,
        pfp_url: userData.user.pfp_url,
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string;
  messages: any;
  userId: string;
}) {
  try {
    const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

    if (selectedChats.length > 0) {
      return await db
        .update(chat)
        .set({
          messages: JSON.stringify(messages),
        })
        .where(eq(chat.id, id));
    }

    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      messages: JSON.stringify(messages),
      userId,
    });
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    return await db.delete(chat).where(eq(chat.id, id));
  } catch (error) {
    console.error("Failed to delete chat by id from database");
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(chat)
      .where(eq(chat.userId, id))
      .orderBy(desc(chat.createdAt));
  } catch (error) {
    console.error("Failed to get chats by user from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}
