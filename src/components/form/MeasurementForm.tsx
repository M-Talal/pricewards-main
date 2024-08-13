"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { customAddToCart } from "@/server-actions/cart";
import { useFormState } from "react-dom";
import { SubmitButton } from "../common/SubmitButton";
import { useSearchParams } from "next/navigation";
import { useFabric } from "@/context/fabric-wrapper";

const MeasurementForm: React.FC = () => {
  const [state, formAction] = useFormState(customAddToCart, null);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const fabric = useFabric();
  const newPrice = fabric.selectedFabrics.cost as string;

  const customProductDetails = JSON.stringify(fabric.selectedFabrics);

  // remove $ sign from price
  const price = newPrice.replace("$", "");
  console.log(fabric.selectedFabrics);

  useEffect(() => {
    if (state?.loginError) {
      toast({
        title: "Login Required",
        description: "You need to login to add to cart",
      });
    }
    if (state?.success) {
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    }
  }, [state]);

  const productId = id as string;

  return (
    <div className="p-8 mt-10 bg-gray-100 rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Measurements</h1>
      <p className="mb-6">
        You&apos;ll need a flexible measuring tape. Wear form-fitting clothing
        to get the most accurate measurements. If possible, have someone else
        help you with these measurements to ensure accuracy.
      </p>
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input hidden name="productId" value={productId} />
            <input hidden name="price" value={price} />
            <input
              hidden
              name="customProductDetails"
              value={customProductDetails}
            />
            <label className="block mb-2 font-semibold">Chest:</label>
            <p className="mb-2">
              Stand normally with your arms at your sides. Place the measuring
              tape around the fullest part of your chest, under your arms. Keep
              the tape parallel to the floor. Do not puff out your chest or hold
              your breath; just stand normally.
            </p>
            <input
              type="number"
              step="any"
              name="chest"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter chest"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Waist:</label>
            <p className="mb-2">
              Identify your natural waistline (this is the narrowest part of
              your waist, usually just above the belly button). Wrap the
              measuring tape around your waistline, keeping it parallel to the
              floor. Relax and breathe out before you measure.
            </p>
            <input
              type="number"
              step="any"
              name="waist"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Waist"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Hips:</label>
            <p className="mb-2">
              Stand with your feet together. Measure around the fullest part of
              your hips and buttocks, keeping the tape parallel to the floor.
            </p>
            <input
              type="number"
              step="any"
              name="hips"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Hips"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">
              Neck Circumference:
            </label>
            <p className="mb-2">
              Measure around the base of your neck, where a shirt collar would
              sit. Ensure one finger fits between the tape and your neck for
              comfort.
            </p>
            <input
              type="number"
              step="any"
              name="neck"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter neck circumference"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Sleeve Length:</label>
            <p className="mb-2">
              Bend your elbow 90 degrees and place your hand on your hip. Start
              the tape at the nape of your neck, in the center. Measure across
              your shoulder to your elbow, and then down to your wrist. The
              total length is your sleeve length.
            </p>
            <input
              type="number"
              step="any"
              name="sleeve"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Sleeve Length"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Shoulder Width:</label>
            <p className="mb-2">
              Measure from the edge of one shoulder to the edge of the other,
              across the back. Keep the measuring tape parallel to the floor.
            </p>
            <input
              type="number"
              step="any"
              name="shoulder"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter shoulder Width"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Inseam:</label>
            <p className="mb-2">
              Best done by someone else. If you have pants that fit perfectly,
              measure the inseam of those pants. Measure from the crotch seam to
              the bottom of the leg.
            </p>
            <input
              type="number"
              step="any"
              name="inseam"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Inseam"
              required
            />
          </div>
        </div>
        <div className="max-w-sm">
          <SubmitButton text="Continue" />
        </div>
      </form>
    </div>
  );
};

export default MeasurementForm;
