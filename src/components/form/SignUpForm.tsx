import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputPassword } from "../ui/password-input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/server-actions/auth";
import { Loader2 } from "lucide-react";
import { useAuthModal } from "../../context/auth-modal-wrapper";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UploadProfileImage from "../designer/UploadProfileImage";
import { Textarea } from "../ui/textarea";

export default function SignUpForm() {
  const [state, formAction] = useFormState(register, null);
  const { openModal, closeModal } = useAuthModal();
  const [isDesigner, setIsDesigner] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (state?.success) {
      closeModal("signup");
      openModal("otp");
      const params = new URLSearchParams(searchParams);
      params.set("email", state?.email);
      router.push(`${pathname}?${params.toString()}`);
      toast({
        title: "Success!",
        description: state?.message,
      });
    }

    if (state?.success === false) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state?.message,
      });
    }
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: state?.error,
      });
    }
  }, [state]);
  return (
    <form className="space-y-4" action={formAction}>
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <div className="pb-16 pt-8">
        <UploadProfileImage />
      </div>

      <div className="space-y-2">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              name="first-name"
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" name="last-name" placeholder="Doe" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@3xample.com"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 (XXX) XXX-XXXX"
              required
            />
          </div>

          <div className={`col-span-1 space-y-1`}>
            <Label htmlFor="password">Password</Label>
            <InputPassword
              id="password"
              required
              name="password"
              placeholder="********"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              required
              name="address"
              type="text"
              placeholder="1234 Main St, City, Country"
            />
          </div>

          {isDesigner && (
            <>
              <div className={`col-span-2 space-y-1`}>
                <Label htmlFor="profile-name">Brand Name</Label>
                <Input
                  id="profile-name"
                  name="profile-name"
                  placeholder="North Purwokerto"
                  required
                />
              </div>
              <div className={`col-span-2 space-y-1`}>
                <Label htmlFor="description">Profile Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="North Purwokerto"
                  required
                />
              </div>
            </>
          )}
        </div>
        <div className="pt-4 flex items-center space-x-2">
          <Checkbox
            id="designer"
            name="designer"
            onClick={() => {
              setIsDesigner(!isDesigner);
            }}
          />
          <label
            htmlFor="designer"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I am a designer
          </label>
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <SubmitButton />
        <div className="relative flex items-center justify-center my-4">
          <span className="text-sm relative z-10 px-4 text-muted-foreground font-semibold bg-white">
            Already have an account?
          </span>
          <div className="absolute w-full border-t border-gray-300"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            openModal("signin");
            closeModal("signup");
          }}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="secondary" className="w-full" disabled={pending}>
      {!pending ? (
        <>Sign Up</>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </Button>
  );
}
