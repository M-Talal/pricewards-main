import Payment from "@/components/payment/Payment";

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { amount: number };
}) {
  const amount = searchParams.amount as number;

  if (!amount) {
    return <div>Amount is required</div>;
  }

  console.log(amount);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-1 max-w-lg">
        <Payment amount={amount} />
      </div>
    </div>
  );
}
