import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/forms");
  }
  return (
    <div className="flex min-h-[100dvh]  items-center justify-center">
      {children}
    </div>
  );
}
