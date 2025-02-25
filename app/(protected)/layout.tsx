import Aside from "@/components/Aside";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const sessions = await auth.api.getSession({ headers: await headers() });

  if (!sessions) {
    redirect("/login");
  }
  return (
    <div className="flex">
      <Aside user={sessions.user} />
      <main className="w-full min-h-screen">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
