type JsonData = {
  [x: string]: string | string[];
}[];

interface ExportCSVProps {
  data: JsonData;
  filename?: string;
}
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

export const handleCSVExport = (data: JsonData, filename: string) => {
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
