import SingleFormHeader from "@/components/SingleFormHeader";
import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
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
  const form = await prismaDb.form.findUnique({
    where: {
      userId: sessions.user.id,
      id,
    },
    include: {
      _count: {
        select: {
          submissions: true,
        },
      },
    },
  });
  return (
    <div className="max-w-3xl mx-auto py-10">
      <SingleFormHeader  form={form}  />
      {children}
    </div>
  );
};

export default SingleFormLayout;
