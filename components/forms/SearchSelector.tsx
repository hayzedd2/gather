"use client";
import { CheckIcon } from "lucide-react";
import React from "react";

interface SearchByProps {
  defaultValue: string;
  searchByOptions: string[];
  onSelectSearchBy: (s: string) => void;
}

const SearchSelector = ({
  defaultValue,
  searchByOptions,
  onSelectSearchBy,
}: SearchByProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={selectRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex gap-1 text-[13px] font-[500] text-[#595959]"
      >
        {defaultValue}
        <svg
          className={`h-5 mt-0.5 w-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="shadow-md bg-white p-1 min-w-[200px] rounded-xl z-50  top-10 right-0 absolute flex flex-col gap-1">
          {searchByOptions.map((s, i) => (
            <button
              onClick={() => {
                onSelectSearchBy(s);
                setIsOpen(false);
              }}
              key={i}
              style={{
                backgroundColor: s == defaultValue ? "#f0f0f0" : "",
              }}
              className="
                   hover:bg-[#f0f0f0]
               w-full font-[500] rounded-[0.5rem] px-3 flex justify-between items-center   h-8 text-left text-sm text-[#595959]"
            >
              {s}
              {s == defaultValue && <CheckIcon size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSelector;
