import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInForm } from "./signin-form";

export default async function SignInPage(
  props: { searchParams: Promise<{ registered?: string; error?: string }> }
) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  const searchParams = await props.searchParams;
  const showRegistered = searchParams.registered === "true";
  const showAccessDenied = searchParams.error === "access_denied";

  return (
    <SignInForm
      showRegistered={showRegistered}
      showAccessDenied={showAccessDenied}
    />
  );
}
