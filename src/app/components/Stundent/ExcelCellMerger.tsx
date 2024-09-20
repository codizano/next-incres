"use client";
import React, { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";

const ExcelCellMerger: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mergedData, setMergedData] = useState<string | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const mergeCells = () => {
    if (!file) {
      alert("Por favor, selecciona un archivo primero.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // obteniene el nombre de la primera hoja de la hoja
        const worksheet = workbook.Sheets[sheetName];

        const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
        const merges: XLSX.Range[] = [];

        let startRow = 0;
        for (let R = range.s.r; R <= range.e.r; R++) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
          const cell = worksheet[cellAddress];

          if (cell && cell.v) {
            // Si encontramos una celda con contenido y no es la primera fila
            if (R > startRow) {
              // Creamos un merge desde startRow hasta la fila anterior
              merges.push({ s: { r: startRow, c: 0 }, e: { r: R - 1, c: 0 } });
            }
            // Actualizamos startRow para el próximo grupo
            startRow = R;
          }

          // Si llegamos al final, creamos el último merge
          if (R === range.e.r) {
            merges.push({ s: { r: startRow, c: 0 }, e: { r: R, c: 0 } });
          }
        }

        // Aplicamos los merges a la hoja de cálculo
        worksheet["!merges"] = merges;

        // Convertimos la hoja de cálculo modificada de vuelta a un archivo
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, worksheet, sheetName);
        const mergedExcel = XLSX.write(newWorkbook, {
          bookType: "xlsx",
          type: "array",
        });

        // Creamos un blob y un enlace de descarga
        const blob = new Blob([mergedExcel], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        setMergedData(url);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={mergeCells}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Combinar celdas
      </button>
      {mergedData && (
        <a
          href={mergedData}
          download="merged_excel.xlsx"
          className="block mt-4 text-blue-500 hover:underline"
        >
          Descargar archivo Excel con celdas combinadas
        </a>
      )}
    </div>
  );
};

export default ExcelCellMerger;
