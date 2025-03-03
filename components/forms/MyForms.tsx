"use client";
import SingleForm from "@/components/forms/SingleForm";
import { Input } from "@/components/ui/input";
import React, { useRef, useTransition } from "react";
import EmptyFormsList from "./EmptyFormsList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Loader, Search, XCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useGetForms } from "@/hooks/useGetForms";
import { FormSkeletonLoader } from "./FormSkeletonLoader";

const MyForms = () => {
  const searchParams = useSearchParams();
  const { data: forms, isPending } = useGetForms();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isSearching, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const s = searchParams.get("search")?.toString() || "";
  const handleSearch = useDebouncedCallback((query: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`);
    });
  }, 100);
  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleSearch("");
    }
  };
  if (isPending) {
    return <FormSkeletonLoader />;
  }
  if (!forms || forms.length === 0) {
    return <EmptyFormsList />;
  }

  const filteredForms = forms.filter((f) =>
    f.title.toLowerCase().includes(s.toLowerCase())
  );

  return (
    <>
      <div className="search flex mt-8 gap-1 flex-col">
        <p className="text-muted-foreground text-[14px] font-[500]">
          Search for a form
        </p>
        <div className="flex w-full rounded-md border border-input bg-transparent px-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent  items-center">
          {!isSearching ? (
            <Search className="text-muted-foreground size-4" />
          ) : (
            <Loader className=" animate-spin size-4 text-muted-foreground" />
          )}
          <Input
            ref={inputRef}
            placeholder="Customer complaint form"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className="flex-1 shadow-none border-none focus:outline-none focus-visible:ring-0 focus:border-none"
            defaultValue={s}
          />
          {s && (
            <Button
              className="size-4"
              onClick={handleClearInput}
              variant={"ghost"}
              size={"icon"}
            >
              <XCircleIcon className="size-5 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
      <div className="forms mt-4">
        {filteredForms.length > 0 ? (
          filteredForms.map((f) => (
            <SingleForm
              id={f.id}
              viewCount={f.viewCount}
              key={f.id}
              submissionsCount={f._count.submissions}
              title={f.title}
              lastEdited={f.lastEdited}
            />
          ))
        ) : (
          <p className="text-subtle text-[14px] font-[500]">
            No matching forms found
          </p>
        )}
      </div>
    </>
  );
};

export default MyForms;
