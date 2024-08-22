"use client";

import React, { useState } from "react";
import { fetchStudents } from "../../../../sanity/utils/fetchStudents";
import { Parser } from "json2csv";
import { Student } from "../../../../types/Student";
import { saveAs } from "file-saver";

// Definición del tipo intermedio para los datos CSV
type StudentCSVData = {
  studentName: string;
  sheetName: string;
  objective: string;
  fragment: string;
  observations: string;
};

const StudentoCsv = () => {
  const [studentData, setStudentData] = useState<StudentCSVData[]>([]);

  const handleDownloadCSV = async () => {
    try {
      const students: Student[] = await fetchStudents();
      console.log(students);
      if (students.length === 0) {
        alert("Error al obtener los blogs");
        return;
      }

      // Crear una matriz para almacenar los datos
      const studentData: StudentCSVData[] = [];

      // Iterar sobre los estudiantes y sus hojas
      students.forEach((student) => {
        student.sheets.forEach((sheet) => {
          // Extraer el texto de las observaciones
          const observationTexts = sheet.observations
            .map((observation) =>
              observation.children.map((child) => child.text).join(" ")
            )
            .join(" ");

          // Agregar los datos al array
          studentData.push({
            studentName: student.name,
            sheetName: sheet.sheetName,
            objective: sheet.objective,
            fragment: sheet.fragment,
            observations: observationTexts,
          });
        });
      });

      setStudentData(studentData);
      console.log(studentData);
      // Configurar el parser de json2csv
      const fields = [
        "studentName",
        "sheetName",
        "objective",
        "fragment",
        "observations",
      ];
      const opts = { fields };

      const parser = new Parser(opts);
      const csv = parser.parse(studentData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

      // Guardar el archivo CSV
      saveAs(blob, "students.csv");
      console.log("Archivo CSV descargado exitosamente.");
    } catch (err) {
      console.error("Error al generar o descargar el archivo CSV:", err);
    }
  };

  return (
    <div>
      <button onClick={handleDownloadCSV}>Download CSV</button>
      <pre>{JSON.stringify(studentData, null, 2)}</pre>
    </div>
  );
};

export default StudentoCsv;
