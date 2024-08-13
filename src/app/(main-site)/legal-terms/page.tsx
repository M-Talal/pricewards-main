// pages/legal-terms.tsx

import Image from "next/image";
import React from "react";

export default function LegalTermsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Legal Terms</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Pricewords! By accessing or using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Modifications</h2>
      <p className="mb-4">
        We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of the site constitutes your acceptance of the modified terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Responsibilities</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Provide accurate information when creating an account.</li>
        <li>Use the website only for lawful purposes.</li>
        <li>Refrain from engaging in any activity that interferes with or disrupts the website.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Account Terms</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Users must be at least 18 years old to create an account.</li>
        <li>Users are responsible for maintaining the confidentiality of their account information.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate or suspend your account at our discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the site, us, or third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
      <p className="mb-4">
        Pricewords is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Governing Law</h2>
      <p className="mb-4">
        These terms are governed by the laws of the United States, without regard to its conflict of law principles.
      </p>
    </div>
  );
}
