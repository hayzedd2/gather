import Aside from "@/components/Aside";
import Navbar from "@/components/Navbar";
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
    <div className="">
    
      <main className="w-full">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
