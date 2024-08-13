"use server";

import { base } from "@/utils/config";

export async function getAllDesigners() {
  try {
    const response = await fetch(`${base.URL}/api/user/findAllDesigners`, {
      cache: "no-cache",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}
