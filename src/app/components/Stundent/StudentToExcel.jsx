import React from 'react';
import { fetchStudents } from "../../../../sanity/utils/fetchStudents";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import fs from 'fs';
import Link from 'next/link';

async function StudentToExcel() {
  const students = await fetchStudents();

  let content;

  if (students.length === 0) {
    console.log("No se encontraron estudiantes");
    content = <div>No se encontraron estudiantes</div>;
  } else {
    // JSON SECTION
    let lastStudentName = null;
    const studentsData = students.flatMap((student) =>
      student.sheets.map((sheet) => {
        const name = student.name === lastStudentName ? '' : student.name;
        lastStudentName = student.name;
        return {
          name: name,
          sheetName: sheet.sheetName,
          observations: (sheet.observations || []).map((observation) =>
            observation.children ? observation.children.map(child => child.text).join(' ') : 'Observación sin contenido'
          ).join(', ')
        };
      })
    );

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
    content = <div>
      Datos de estudiantes convertidos a array, impresos en la consola<br />
      y guardados como estudiantes.xlsx dentro del proyecto
      <Link href={'excel-merge'} className='underline text-blue-500'>Excel Merge</Link>
    </div>;
  }

  return content;
}

export default StudentToExcel;