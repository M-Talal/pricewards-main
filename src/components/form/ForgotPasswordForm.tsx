import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputPassword } from "../ui/password-input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { forgotPassword } from "@/server-actions/auth";
import { Loader2 } from "lucide-react";
import { useAuthModal } from "../../context/auth-modal-wrapper";
import { useToast } from "../ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPassword, null);
  const { openModal, closeModal } = useAuthModal();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (state?.success) {
      closeModal("forgotPassword");
      openModal("otp");
      const params = new URLSearchParams(searchParams);
      params.set("email", state?.email);
      params.set("type", "reset");
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
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="johndoe@3xample.com"
          required
        />
      </div>

      <div className="space-y-6 pt-6">
        <SubmitButton />
        <div className="relative flex items-center justify-center my-4">
          <span className="text-sm relative z-10 px-4 text-muted-foreground font-semibold bg-white">
            Go back to SignIn
          </span>
          <div className="absolute w-full border-t border-gray-300"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            openModal("signin");
            closeModal("forgotPassword");
          }}
        >
          Sign in
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
        <>Forgot</>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </Button>
  );
}
