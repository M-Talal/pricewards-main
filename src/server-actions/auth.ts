"use server";

import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { base } from "@/utils/config";
import { revalidatePath, revalidateTag } from "next/cache";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    const response = await fetch(`${base.URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

      next: {
        tags: ["login"],
      },
    });

    const data = await response.json();
    const user = data?.user;
    console.log(data);
    if (data?.success) {
      console.log("Logged in successfully");
      // Create the session
      // const expires = new Date(Date.now() + 10 * 1000); // for 10 sec
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // for 1 hour
      const session = await encrypt({ user, expires });
      // Save the session in a cookie
      cookies().set("session", session, { expires, httpOnly: true });
    } else {
    }
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while logging in",
    };
  }

  // console.log("Redirecting to /");
  // revalidatePath("/login");
  // redirect("/");
}

export async function register(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const phoneNumber = formData.get("phone");
    const image = formData.get("profile-image");
    const profileName = formData.get("profile-name");
    console.log(profileName);
    console.log(image);
    const roleCheck = formData.get("designer");
    const role = roleCheck === "on" ? "designer" : "client";
    const description = formData.get("description");
    const address = formData.get("address");
    console.log(address);

    console.log(role);

    const response = await fetch(`${base.URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        role,
        image,
        profileName,
        description,
        address,
      }),
      next: {
        tags: ["register"],
      },
    });

    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while logging in",
    };
  }
}

export async function verifyOTP(prevState: any, formData: FormData) {
  try {
    const otp = formData.get("pin");
    const email = formData.get("email");

    console.log(otp, email);

    const response = await fetch(`${base.URL}/api/auth/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while verifying OTP",
    };
  }
}

export async function forgotPassword(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    console.log(email);

    const response = await fetch(`${base.URL}/api/auth/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while logging in",
    };
  }
}

export async function resetPassword(prevState: any, formData: FormData) {
  try {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const email = formData.get("email");

    console.log(password);
    console.log(email);
    console.log(confirmPassword);

    const response = await fetch(`${base.URL}/api/auth/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email, confirmPassword }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while resetting password",
    };
  }
}

export async function resendOTP(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    console.log(email);
    const response = await fetch(`${base.URL}/api/auth/resendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while logging in",
    };
  }
}
