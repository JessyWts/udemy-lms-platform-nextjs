import { auth } from "@clerk/nextjs/server";

export const currentUserId = async (): Promise<string | null> => {
  const session = await auth();

  return session?.userId;
};
