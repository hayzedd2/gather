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

// export const exportToPDF = (jsonData: FormResponse[]): void => {
//     // Create new PDF document
//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
    
//     // Add title
//     doc.setFontSize(18);
//     doc.text('Form Responses', pageWidth / 2, 15, { align: 'center' });
//     doc.setFontSize(12);
    
//     // Get all keys for table headers
//     const allKeys = new Set<string>();
//     jsonData.forEach(response => {
//       Object.keys(response).forEach(key => allKeys.add(key));
//     });
//     const headers = Array.from(allKeys);
    
//     // Prepare table data
//     const tableData = jsonData.map(response => {
//       return headers.map(header => {
//         const value = response[header];
//         return value !== undefined ? String(value) : '';
//       });
//     });
    
//     // Generate the table
//     doc.autoTable({
//       head: [headers],
//       body: tableData,
//       startY: 25,
//       margin: { top: 20 },
//       styles: { overflow: 'linebreak' },
//       columnStyles: { 0: { cellWidth: 'auto' } },
//       didDrawPage: (data) => {
//         // Add page numbers
//         const pageCount = doc.internal.getNumberOfPages();
//         for (let i = 1; i <= pageCount; i++) {
//           doc.setPage(i);
//           const pageSize = doc.internal.pageSize;
//           const pageHeight = pageSize.getHeight();
//           doc.setFontSize(10);
//           doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
//         }
//       }
//     });
    
//     // Save the PDF
//     doc.save('form_responses.pdf');
//   };