import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputPassword } from "../ui/password-input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { forgotPassword, resetPassword } from "@/server-actions/auth";
import { Loader2 } from "lucide-react";
import { useAuthModal } from "../../context/auth-modal-wrapper";
import { useToast } from "../ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitButton } from "../common/SubmitButton";

export default function ResetPasswordForm() {
  const [state, formAction] = useFormState(resetPassword, null);
  const { openModal, closeModal } = useAuthModal();
  const { toast } = useToast();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  useEffect(() => {
    if (state?.success) {
      closeModal("resetPassword");
      openModal("signin");
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
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <InputPassword
          id="password"
          name="password"
          placeholder="Enter your new Password"
          required
        />
      </div>

      <div>
        <input hidden name="email" value={email || ""} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <InputPassword
          id="confirm-password"
          name="confirm-password"
          placeholder="Enter your Confirm Password"
          required
        />
      </div>

      <div className="space-y-6 pt-6">
        <SubmitButton text="Reset" />
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
            closeModal("resetPassword");
          }}
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}
