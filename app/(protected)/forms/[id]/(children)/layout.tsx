import Navbar from "@/components/Navbar";
import SingleFormHeader from "@/components/SingleFormHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
interface SingleFormLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const SingleFormLayout = async ({
  children,
  params,
}: SingleFormLayoutProps) => {
  const id = (await params).id;
  const sessions = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => {
      throw redirect("/login");
    });

  if (!sessions) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mb-5">
        <SingleFormHeader id={id} />
        {children}
      </div>
    </div>
  );
};

export default SingleFormLayout;
