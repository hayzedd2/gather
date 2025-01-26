"use client";

import Aside from "@/components/Aside";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }
  return (
    <div className="flex">
      <Aside user={session.user} />
      <main className="flex-1  min-h-screen max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
