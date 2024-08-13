import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/server-actions/cart";
import Link from "next/link";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { amount: number; payment_intent: string };
}) {
  const payment_intent = searchParams.payment_intent;

  console.log("Payment Intent: ", payment_intent);

  if (!payment_intent) {
    console.log("No Payment Intent");
    return <FailedPayment />;
  }

  console.log("Payment Intent: ", payment_intent);

  const res = await confirmPayment(payment_intent);
  console.log("Response: ", res);
  if (!res?.success) {
    return <FailedPayment />;
  }

  console.log(payment_intent);
  return (
    <div className=" max-w-2xl mx-auto min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="bg-black mx-auto text-white rounded-full w-16 h-16  flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Your Payment is Successfull</h1>
        <p className="text-muted-foreground font-semibold mb-8 text-center">
          Your payment is received. We will soon dispatch your products. If any
          problem please chat to customer service at support@pricewards.com
        </p>
        <Button className="max-w-sm" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}

function FailedPayment() {
  return (
    <div className=" max-w-2xl mx-auto min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="bg-black mx-auto text-white rounded-full w-16 h-16  flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Your Payment is Failed</h1>
        <p className="text-muted-foreground font-semibold mb-8 text-center">
          Your payment is failed. Please try again or contact support
          atsupport@pricewards.com
        </p>
        <Button className="max-w-sm" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
