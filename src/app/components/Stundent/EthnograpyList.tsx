import { PortableText } from "next-sanity";
import { fetchEthnoStudents } from "../../../../sanity/utils/fetchEthnoStudents";

async function EthnographyList() {
  const students = await fetchEthnoStudents();
  if (students.length === 0) {
    return <div>Error al obtener los blogs</div>;
  }

  return (
    <div>
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
            <th className="border border-black">Ethnografía</th>
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
                  <PortableText value={sheet.opinion} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EthnographyList;
