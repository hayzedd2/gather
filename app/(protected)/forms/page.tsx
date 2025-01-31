import EmptyFormsList from "@/components/EmptyFormsList";
import FormSearchInput from "@/components/FormSearchInput";
import SingleForm from "@/components/SingleForm";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prismaDb } from "@/lib/db";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { search } = await searchParams;
  const sessions = await auth.api.getSession({
    headers: await headers(),
  });
  if (!sessions) {
    return null;
  }
  const forms = await prismaDb.form.findMany({
    where: {
      userId: sessions.user.id,
      title: {
        contains: (search as string) || "",
        mode: "insensitive",
      },
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
    <div className="p-4  py-10 max-w-3xl mx-auto">
      <div className="w-full  flex justify-between items-center ">
        <div className="flex flex-col">
          <h3 className="font-[600] text-[1.6rem]">Your forms</h3>
          <h6 className="mt-[-4px]">Manage your forms and submissions.</h6>
        </div>
        <div>
          <Link href={"/forms/new"}>
            <Button>Create new form</Button>
          </Link>
        </div>
      </div>
      {/* <FormSearchInput/> */}
      <div className="mt-4">
        {forms.length > 0 ? (
          forms.map((f) => (
            <SingleForm
              key={f.id}
              id={f.id}
              title={f.title}
              updatedAt={f.updatedAt.toDateString()}
              submissionsCount={f._count.submissions}
            />
          ))
        ) : (
          <div>
            {search ? (
              <div>
                <p className="text-subtle font-[500]">
                  No matching forms found.
                </p>
              </div>
            ) : (
              <EmptyFormsList />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
