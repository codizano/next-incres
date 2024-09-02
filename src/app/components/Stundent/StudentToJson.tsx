import React from "react";
import { fetchStudents } from "../../../../sanity/utils/fetchStudents";

async function StudentToJson() {
  const students = await fetchStudents();

  let content;

  if (students.length === 0) {
    console.log("No se encontraron estudiantes");
    content = <div>No se encontraron estudiantes</div>;
  } else {
    // JSON SECTION
    const studentsData = students.map((student) => ({
      name: student.name,
      sheets: student.sheets.map((sheet) => ({
        sheetName: sheet.sheetName,
        observations: (sheet.observations || [])
          .map((observation) =>
            observation.children
              ? observation.children.map((child) => child.text).join(" ")
              : "Observación sin contenido"
          )
          .join(", "),
      })),
    }));

    // CONSOLE SECTION
    console.log(JSON.stringify(studentsData, null, 2));
    content = (
      <div>
        Datos de estudiantes agrupados por nombre y impresos en la consola
      </div>
    );
  }

  return content;
}

export default StudentToJson;
