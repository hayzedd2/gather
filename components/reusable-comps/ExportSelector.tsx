"use client";
import React from "react";
import { CustomButton } from "./CustomButton";
import Pill from "./Pill";
import { exportToCSV, exportToXLSX } from "@/helpers/export";

type JsonData = {
  [x: string]: string | string[];
}[];
type supportedExportTypes = "csv" | "xlsx" | "pdf" | "yaml";
interface dataTypeInterface {
  label: string;
  format: supportedExportTypes;
  isSupported: boolean;
}
interface exportInterface {
  fileName: string;
  data: JsonData;
}

const dataTypes: dataTypeInterface[] = [
  {
    label: "Export as csv",
    format: "csv",
    isSupported: true,
  },
  {
    label: "Export as xlsx",
    format: "xlsx",
    isSupported: true,
  },
  {
    label: "Export as pdf",
    format: "pdf",
    isSupported: true,
  },
  {
    label: "Export as yaml",
    format: "yaml",
    isSupported: false,
  },
];
const ExportSelector = ({ fileName, data }: exportInterface) => {
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
  const handleExport = (type: supportedExportTypes) => {
    switch (type) {
      case "csv":
        exportToCSV(data, fileName);
        break;
      case "xlsx":
        exportToXLSX(data, fileName);
        break;
    }
    setIsOpen(false);
  };
  return (
    <div ref={selectRef} className="relative">
      <CustomButton
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex"
      >
        Export data
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${
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
      </CustomButton>
      {isOpen && (
        <div className="shadow-md bg-white p-1 min-w-[200px] rounded-xl z-50  top-10 left-0 absolute">
          {dataTypes.map((type) => (
            <button
              onClick={() => {
                handleExport(type.format);
              }}
              key={type.format}
              className={`${
                type.isSupported
                  ? "hover:bg-[#f0f0f0]"
                  : "cursor-default flex gap-1 items-center"
              } w-full font-[500] rounded-[0.5rem] px-3   h-8 text-left text-sm text-[#595959]`}
            >
              {type.label}
              {!type.isSupported && <Pill s="Soon" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportSelector;
