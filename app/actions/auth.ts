"use server";

import { signIn } from "@/auth";

export async function handleSignIn(formData: FormData) {
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/todo"
  });
}
