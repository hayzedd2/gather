"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const FormSearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";

  const [search, setSearch] = React.useState(searchQuery);
  const [debouncedSearch] = useDebounce(search, 300);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, router, searchParams]);

  return (
    <div className="search flex mt-8 gap-1 flex-col">
      <p className="text-muted-foreground text-[14px] font-[500]">
        Search for a form
      </p>
      <Input
        placeholder="Customer complaint form"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default FormSearchInput;
