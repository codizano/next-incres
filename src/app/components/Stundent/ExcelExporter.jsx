'use client'
import React, { useState } from 'react';
import XLSX from 'xlsx';

const ExcelExporter = ({ data, columnsToCombine }) => {
  const [combinedData, setCombinedData] = useState([]);

  const handleExport = () => {
    const combinedData = combineCells(data, columnsToCombine);
    setCombinedData(combinedData);
    exportToExcel(combinedData);
  };

  const combineCells = (data, columnsToCombine) => {
    const combinedData = [];
    let currentCell = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i][columnsToCombine] !== currentCell) {
        currentCell = data[i][columnsToCombine];
        combinedData.push({ [columnsToCombine]: currentCell });
      } else {
        combinedData[combinedData.length - 1][columnsToCombine] += ` ${data[i][columnsToCombine]}`;
      }
    }
    return combinedData;
  };

  const exportToExcel = (data) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
    XLSX.writeFile(wb, "example.xlsx");
  };

  return (
    <div>
      <button onClick={handleExport}>Exportar a Excel</button>
    </div>
  );
};

export default ExcelExporter;