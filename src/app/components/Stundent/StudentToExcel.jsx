import React from 'react';
import { fetchStudents } from "../../../../sanity/utils/fetchStudents";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import fs from 'fs';

async function StudentToExcel() {
  const students = await fetchStudents();

  let content;

  if (students.length === 0) {
    console.log("No se encontraron estudiantes");
    content = <div>No se encontraron estudiantes</div>;
  } else {
    // JSON SECTION
    const studentsData = students.map((student) => {
      const sheetData = student.sheets.map((sheet) => ({
        name: student.name,
        sheetName: sheet.sheetName,
        observations: (sheet.observations || []).map((observation) =>
          observation.children ? observation.children.map(child => child.text).join(' ') : 'Observación sin contenido'
        ).join(', ')
      }));
      return sheetData;
    }).flat();

    // EXCEL FUNCTION SECTION
    const convertToExcel = (studentsData) => {
      const ws = XLSX.utils.json_to_sheet(studentsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes');
      return wb;
    };

    // EXCEL SAVE SECTION
    const wb = convertToExcel(studentsData);
    const buffer = XLSX.write(wb, { type: 'buffer' });
    const filePath = 'estudiantes.xlsx';
    fs.writeFileSync(filePath, buffer);
    console.log(`Archivo guardado en ${filePath}`);
    content = <div>Archivo guardado en ${filePath}</div>;

    // CONSOLE SECTION
    console.log(JSON.stringify(studentsData, null, 2));
    content = <div>Datos de estudiantes convertidos a array y impresos en la consola</div>;
  }

  return content;
}

export default StudentToExcel;