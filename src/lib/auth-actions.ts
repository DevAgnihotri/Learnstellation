"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  // Extract form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Client-side Firebase auth will handle this
  // For now, just redirect to handle client-side auth
  revalidatePath("/", "layout");
  revalidatePath("/dashboard", "page");
  // The actual login will be handled on the client side
}

export async function signup(formData: FormData) {
  // Extract form data
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Client-side Firebase auth will handle this
  revalidatePath("/", "layout");
  revalidatePath("/dashboard", "page");
  // The actual signup will be handled on the client side
}

export async function signout() {
  // Client-side Firebase auth will handle this
  redirect("/logout");
}