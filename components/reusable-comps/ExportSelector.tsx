"use client";
import React from "react";
import { CustomButton } from "./CustomButton";
import Pill from "./Pill";
import { exportToCSV, exportToXLSX } from "@/helpers/export";

type JsonData = {
  [x: string]: string | string[];
}[];
type supportedExportTypes = "csv" | "xlsx" | "pdf" | "json" |"csv-some" | "xlsx-some"| "json-some";
interface dataTypeInterface {
  label: string;
  format: supportedExportTypes;
  isSupported: boolean;
}
interface exportInterface {
  fileName: string;
  data: JsonData;
  selectedData : JsonData
}

const dataTypes: dataTypeInterface[] = [
  {
    label: "Export all to .csv",
    format: "csv",
    isSupported: true,
  },
  {
    label: "Export all to .xlsx",
    format: "xlsx",
    isSupported: true,
  },
  {
    label: "Export all to .json",
    format: "json",
    isSupported: true,
  },
  {
    label: "Export all to .pdf",
    format: "pdf",
    isSupported: false,
  },
  {
    label: "Export selected to .csv",
    format: "csv-some",
    isSupported: false,
  },
  {
    label: "Export selected to .xlsx",
    format: "xlsx-some",
    isSupported: false,
  },
  {
    label: "Export selected to .json",
    format: "json-some",
    isSupported: false,
  },
];
const ExportSelector = ({ fileName, data, selectedData }: exportInterface) => {
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
      case "csv-some":
        exportToCSV(selectedData, fileName)
      case "xlsx-some":
        exportToXLSX(selectedData, fileName)
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
              disabled={type.format.includes("some") && selectedData.length == 0}
              key={type.format}
              className={`${
                type.isSupported
                  ? "hover:bg-[#f0f0f0]"
                  : "cursor-default flex gap-1 items-center"
              } w-full font-[500] disabled:cursor-default rounded-[0.5rem] px-3   h-8 text-left text-sm text-[#595959]`}
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
