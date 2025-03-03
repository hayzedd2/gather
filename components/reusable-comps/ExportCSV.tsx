import React from "react";

type JsonData = {
  [x: string]: string | string[];
}[];

interface ExportCSVProps {
  data: JsonData;
  filename?: string;
}

const ExportCSV = ({ data, filename = "export.csv" }: ExportCSVProps) => {
  const convertToCSV = (jsonData: JsonData): string => {
    if (!jsonData.length) return "";
    const headers = Object.keys(jsonData[0]).join(",") + "\n";
    const rows = jsonData
      .map((row) =>
        Object.values(row)
          .map((value) => `"${String(value).replace(/"/g, '""')}"`) // Escape quotes
          .join(",")
      )
      .join("\n");
    return headers + rows;
  };

  const handleExport = () => {
    if (data.length === 0) return;
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-[100px] bg-black text-[14px] font-[500] hover:opacity-80 bx-shadow w-max text-white py-[6px] px-[14px] cursor-pointer"
    >
      Export as csv
    </button>
  );
};

export default ExportCSV;
