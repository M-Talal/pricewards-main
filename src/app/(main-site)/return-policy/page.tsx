// pages/return-policy.tsx

import Image from "next/image";
import React from "react";

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Return and Exchange Policy</h1>
      <p className="mb-4">
        At Pricewards, we strive to ensure that every product crafted by our
        designers meets your expectations. However, we understand that there
        may be occasions where you wish to return an item. Please review our
        policy below:
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Custom Orders:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Returns:</strong> Due to the bespoke nature of custom-made
          designs, we generally cannot accept returns unless the item is
          defective or not as ordered. If your order does not match the design
          specifications or is flawed, please contact us within 5 days of
          receipt to initiate a return process.
        </li>
        <li>
          <strong>Exchanges:</strong> We offer exchanges in the rare event
          that a product arrives damaged or defective. Please contact us
          within 5 days of receiving your order to arrange for an exchange
          with a new, corrected item.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Non-Custom Items:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Returns:</strong> For non-customized products, returns can
          be made within 14 days of receipt. Items must be returned in their
          original condition and packaging.
        </li>
        <li>
          <strong>Exchanges:</strong> If you wish to exchange a non-custom
          item, please return the original item for a refund and place a new
          order for the item you want.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Process:</h2>
      <p className="mb-4">
        To initiate a return or exchange, please contact our customer service
        team at{" "}
        <a
          href="mailto:customer.service@pricewards.com"
          className="text-blue-500 underline"
        >
          customer.service@pricewards.com
        </a>
        . You will need to provide your order number, details of the item, and
        the reason for return or exchange.
        <br />
        Once your return is approved, you will receive instructions on how to
        send back the item. Please note that customers are responsible for
        return shipping costs unless the item is defective.
        <br />
        Refunds will be processed to the original method of payment within
        7-10 business days of receiving the returned item.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Important Notes:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Custom items that are returned without prior approval will not be
          accepted.
        </li>
        <li>
          We reserve the right to refuse returns or exchanges that do not meet
          our policy requirements.
        </li>
      </ul>

      <p className="mt-6">
        Thank you for choosing Pricewards. We are committed to ensuring your
        satisfaction with every order.
      </p>
    </div>
  );
}
