"use cleint";

import { convertToSubcurrecny } from "@/lib/convertToSubcurrecny";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { base } from "@/utils/config";
import { useSession } from "../form/auth-wrapper";
import { useSearchParams } from "next/navigation";

export default function CheckoutForm({ amount }: { amount: number }) {
  const session = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  console.log("orderId", orderId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${base.URL}/api/payment/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": session?.user?.token || "",
      },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message || "An unknown error occurred");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // return_url: `http://localhost:3000/payment-success?amount=${amount}`,
        return_url: `${base.FRONTEND_URL}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setLoading(false);
      return;
    } else {
      // the payment ui will close automatically
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      <Button className="mt-4 w-full" disabled={!stripe || loading}>
        {!loading ? (
          <>pay ${amount}</>
        ) : (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        )}
      </Button>

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </form>
  );
}
