import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputPassword } from "../ui/password-input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/server-actions/auth";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useAuthModal } from "../../context/auth-modal-wrapper";
import { usePathname, useRouter } from "next/navigation";

export default function SignInForm({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) {
  const [state, formAction] = useFormState(login, null);
  const { openModal, closeModal } = useAuthModal();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (state?.success) {
      if (state?.user?.role !== "client") {
        router.push("/products");
      } else {
        router.push(pathName);
      }
      setIsOpen(false);
    }
  }, [state?.success]);
  return (
    <form action={formAction} className="space-y-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      {(state?.error || state?.success === false) && (
        <div className="bg-red-100 text-destructive p-4 py-2 rounded-md mb-4">
          <ul>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <li>
                {state?.message} {state?.error}
              </li>
            </div>
          </ul>
        </div>
      )}
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
        <Label htmlFor="password">Password</Label>
        <InputPassword
          id="password"
          required
          name="password"
          placeholder="********"
        />
        <Link
          href="#"
          onClick={() => {
            openModal("forgotPassword");
            closeModal("signin");
          }}
          className="text-sm font-semibold text-end block pt-3"
        >
          Forgot password?
        </Link>
      </div>

      <div className="space-y-6">
        <SubmitButton />
        <div className="relative flex items-center justify-center my-4">
          <span className="text-sm relative z-10 px-4 text-muted-foreground font-semibold bg-white">
            Don&apos;t have an account
          </span>
          <div className="absolute w-full border-t border-gray-300"></div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            openModal("signup");
            closeModal("signin");
          }}
        >
          Sign Up
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
        <>Login</>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </Button>
  );
}
