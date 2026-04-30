import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInForm } from "./signin-form";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <SignInForm />;
}
