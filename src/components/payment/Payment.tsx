"use client";
import { base } from "@/utils/config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { convertToSubcurrecny } from "@/lib/convertToSubcurrecny";

if (base.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
}

const stripePromise = loadStripe(base.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export default function Payment({ amount }: { amount: number }) {
  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrecny(amount),
          currency: "usd",
        }}
      >
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}
