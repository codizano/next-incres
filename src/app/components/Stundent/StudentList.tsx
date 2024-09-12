import { PortableText } from "next-sanity";
import { fetchStudents } from "../../../../sanity/utils/fetchStudents";
import Link from "next/link";

async function StudentList() {
  const students = await fetchStudents();
  if (students.length === 0) {
    return <div>Error al obtener los blogs</div>;
  }

  return (
    <div>
      <Link
        href={"http://localhost:3000/excel"}
        className="text-blue-600 underline"
      >
        StudentToExcel
      </Link>
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th className="border border-black">#</th>
            <th className="border border-black">Estudiante</th>
            <th className="border border-black">Pieza</th>
            <th className="border border-black">Objetivos</th>
            <th className="border border-black">Fragmento</th>
            <th className="border border-black">Observaciones</th>
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
                    className="border border-black px-4 py-2"
                  >
                    {studentIndex + 1}
                  </td>
                )}
                {sheetIndex === 0 && (
                  <td
                    rowSpan={student.sheets.length}
                    className="border border-black px-4 py-2"
                  >
                    {student.name}
                  </td>
                )}
                <td className="border border-black px-4 py-2">
                  {sheet.sheetName}
                </td>
                <td className="border border-black px-4 py-2">
                  {sheet.objective}
                </td>
                <td className="border border-black px-4 py-2">
                  {sheet.fragment}
                </td>
                <td className="border border-black px-4 py-2">
                  <PortableText value={sheet.observations} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
