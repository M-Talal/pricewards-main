import { metadata } from "@/app/layout";
import { base } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(base.NEXT_STRIPE_SECRET_KEY);
export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();
    console.log(amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 400 }
    );
  }
}
