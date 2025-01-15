import { Webhook } from "svix";
import { User } from "@prisma/client";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { createUser } from "@/lib/user";

export async function POST(request: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occurred -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await request.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", {
        status: 400,
      });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;

      if (!id || !email_addresses) {
        return new Response("Error occurred -- missing data", {
          status: 400,
        });
      }

      const user: User = {
        id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url ?? "",
        role: "USER",
        emailVerified: null,
      };

      await createUser(user);
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.log("CLERK_USER_CREATE_WEBHOOK", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
