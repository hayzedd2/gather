import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type JsonData = {
  [x: string]: string | string[];
}[];

export const exportToCSV = (data: JsonData, filename: string): void => {
  // Get all unique keys across all responses
  const allKeys = new Set<string>();
  data.forEach((response) => {
    Object.keys(response).forEach((key) => allKeys.add(key));
  });

  // Create header row
  const headers = Array.from(allKeys);
  let csvContent = headers.join(",") + "\n";

  // Create data rows
  data.forEach((response) => {
    const row = headers.map((header) => {
      const value = response[header] === undefined ? "-" : response[header];
      const cellValue =
        typeof value === "string"
          ? `"${value.replace(/"/g, '""')}"`
          : String(value);
      return cellValue;
    });
    csvContent += row.join(",") + "\n";
  });

  // Create and download the CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${filename}.csv`);
};

export const exportToXLSX = (data: JsonData, filename: string): void => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  // Create a workbook with the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Form Responses");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${filename}.xlsx`);
};
