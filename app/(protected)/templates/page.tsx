"use client";
import TemplateCard from "@/components/TemplateCard";
import { formTemplates } from "@/content/template";
import { FormField } from "@/types/type";
import { Input } from "@/components/ui/input";
import React, { useMemo, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearch("");
    }
  };
  const filteredTemplates = useMemo(() => {
    return formTemplates.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === "all" || t.category === selectedCategory)
    );
  }, [formTemplates, search, selectedCategory]);
  

  const categories = Array.from(new Set(formTemplates.map((t) => t.category)));

  return (
    <section className="p-4 py-10 max-w-5xl mx-auto">
      <div className="w-full items-center text-center flex-col flex justify-center ">
        <h3 className="font-[600] text-[2rem]">Form templates</h3>
        <h6 className="mt-[-3px] max-w-[500px]">
          Start with a template to create your form faster!
        </h6>
      </div>
      <div className="flex flex-col gap-3 dotted-up py-4 mt-4">
        <div className="w-full gap-y-3 justify-between flex flex-wrap items-center">
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All types</SelectItem>
                {categories.map((c, i) => (
                  <SelectItem value={c} key={i}>
                    {c}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="w-[300px]">
            <div className="flex w-full rounded-md border border-input bg-transparent px-2 text-base shadow-sm transition-colors  items-center">
              <Search className="text-muted-foreground size-4" />
              <Input
                ref={inputRef}
                placeholder="Search for a template"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="flex-1  shadow-none border-none focus:outline-none focus-visible:ring-0 focus:border-none"
                value={search}
              />
              {search && (
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
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-y-3 ">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((t, i) => (
              <TemplateCard
                key={t.key}
                formConfig={t.formConfig as unknown as FormField[]}
                title={t.title}
                description={t.description}
                tags={t.tags}
                buttonText={t.buttonText}
              />
            ))
          ) : (
            <p className="font-[500] text-muted-foreground text-[15px]">
              No matching templates found
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
