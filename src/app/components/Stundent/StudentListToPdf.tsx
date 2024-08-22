"use client";
import { PortableText } from "next-sanity";
import { fetchStudents } from "../../../../sanity/utils/fetchStudents";
//Libraries
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function StudentList() {
  const contentRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    if (!element) {
      console.error("El elemento no está disponible");
      return;
    }
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("documento.pdf");
  };

  const students = await fetchStudents();
  if (students.length === 0) {
    return <div>Error al obtener los blogs</div>;
  }

  return (
    <div>
      <table
        ref={contentRef}
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th className="border border-gray-400">#</th>
            <th className="border border-gray-400">Estudiante</th>
            <th className="border border-gray-400">Pieza</th>
            <th className="border border-gray-400">Objetivos</th>
            <th className="border border-gray-400">Fragmento</th>
            <th className="border border-gray-400">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, studentIndex) =>
            student.sheets.map((sheet, sheetIndex) => (
              <tr
                key={`${studentIndex}-${sheetIndex}`}
                className="border border-black-200"
              >
                {sheetIndex === 0 && (
                  <td
                    rowSpan={student.sheets.length}
                    className="border border-gray-200 px-4 py-2"
                  >
                    {studentIndex + 1}
                  </td>
                )}
                {sheetIndex === 0 && (
                  <td
                    rowSpan={student.sheets.length}
                    className="border border-gray-200 px-4 py-2"
                  >
                    {student.name}
                  </td>
                )}
                <td className="border border-gray-200 px-4 py-2">
                  {sheet.sheetName}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {sheet.objective}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {sheet.fragment}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <PortableText value={sheet.observations} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button onClick={handleDownloadPDF}>Descargar PDF</button>
    </div>
  );
}

export default StudentList;
