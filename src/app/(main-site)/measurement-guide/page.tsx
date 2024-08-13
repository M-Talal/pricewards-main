// pages/measurement-guide.tsx

import Image from "next/image";
import React from "react";

export default function MeasurementGuidePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Measurement&apos;s Guide</h1>
      <p className="mb-4">Pricewards Customer Measurement Guide</p>
      <p className="mb-4">
        Before you start, you&apos;ll need a flexible measuring tape. Wear
        form-fitting clothing to get the most accurate measurements. If
        possible, have someone else help you with these measurements to ensure
        accuracy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Chest</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Stand normally with your arms at your sides.</li>
        <li>
          Place the measuring tape around the fullest part of your chest, under
          your arms.
        </li>
        <li>Keep the tape parallel to the floor.</li>
        <li>
          Do not puff out your chest or hold your breath; just stand normally.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Waist</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Identify your natural waistline (this is the narrowest part of your
          waist, usually just above the belly button).
        </li>
        <li>
          Wrap the measuring tape around your waistline, keeping it parallel to
          the floor.
        </li>
        <li>Relax and breathe out before you measure.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Hips</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Stand with your feet together.</li>
        <li>
          Measure around the fullest part of your hips and buttocks, keeping the
          tape parallel to the floor.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Sleeve Length</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Bend your elbow 90 degrees and place your hand on your hip.</li>
        <li>Start the tape at the nape of your neck, in the center.</li>
        <li>
          Measure across your shoulder to your elbow, and then down to your
          wrist. The total length is your sleeve length.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Shoulder Width</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Measure from the edge of one shoulder to the edge of the other, across
          the back.
        </li>
        <li>Keep the measuring tape parallel to the floor.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Inseam</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Best done by someone else. If you have pants that fit perfectly,
          measure the inseam of those pants.
        </li>
        <li>Measure from the crotch seam to the bottom of the leg.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        7. Neck Circumference
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Measure around the base of your neck, where a shirt collar would sit.
        </li>
        <li>
          Ensure one finger fits between the tape and your neck for comfort.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Tips for Accuracy</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Do not pull the tape measure too tight; it should sit comfortably
          around each area.
        </li>
        <li>
          Always round to the nearest half-inch if your measurement falls
          between two different numbers.
        </li>
        <li>
          Record all measurements in both inches and centimeters for designer
          reference.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Saving and Updating Measurements
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Save these measurements in your Pricewards profile for easy access and
          use in future orders.
        </li>
        <li>Update your measurements regularly if your size changes.</li>
      </ul>

      <p className="mt-6">
        By providing this guide to your customers, you ensure they take the most
        accurate measurements possible, which will lead to better-fitting custom
        garments and higher customer satisfaction. Feel free to adjust this
        guide to better fit the specific requirements of the designs or products
        offered by Pricewards.
      </p>
    </div>
  );
}
