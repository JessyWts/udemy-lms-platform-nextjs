import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const signature = request.headers.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("[STRIPE_WEBHOOK_ERROR]", error.message);
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
      if (!userId || !courseId) {
        console.log("STRIPE_WEBHOOK", "Missing metadata");
        return new NextResponse("Webhook Error: Missing metadata", {
          status: 400,
        });
      }

      await db.purchase.create({
        data: {
          userId: userId,
          courseId: courseId,
        },
      });
    } else {
      return new NextResponse(
        `Webhook Error: Unhandled event type ${event.type}`,
        {
          status: 200,
        }
      );
    }

    return new NextResponse("OK", {
      status: 200,
    });
  } catch (error) {
    console.log("STRIPE_WEBHOOK", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
