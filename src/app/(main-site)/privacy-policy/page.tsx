// pages/privacy-policy.tsx

import Image from "next/image";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Pricewards values your privacy. This policy outlines how we collect,
        use, and protect your personal information.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          <strong>Information Collection:</strong> We collect personal
          information such as name, email, and payment details.
        </li>
        <li className="mb-2">
          <strong>Use of Information:</strong> We use your data to process
          orders and improve our services.
        </li>
        <li className="mb-2">
          <strong>Cookies:</strong> We use cookies to enhance your experience.
        </li>
        <li className="mb-2">
          <strong>Data Sharing:</strong> We do not share your data with third
          parties without your consent.
        </li>
        <li className="mb-2">
          <strong>Security:</strong> We implement security measures to protect
          your data.
        </li>
        <li className="mb-2">
          <strong>User Rights:</strong> You can request access to or deletion
          of your data.
        </li>
      </ul>
      <p className="mt-6">
        Thank you for trusting Pricewards with your personal information. We
        are committed to protecting your privacy.
      </p>
    </div>
  );
}
