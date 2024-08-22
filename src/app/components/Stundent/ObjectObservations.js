async function StudentList() {
    const students = await fetchStudents();
    if (students.length === 0) {
        return <div>Error al obtener los blogs</div>;
    }

    students.map((student) => {
        student.sheets.map((sheet) => {
            console.log(`Student Name: ${student.name}`);
            console.log(`Sheet Name: ${sheet.sheetName}`);
            console.log(`Objective: ${sheet.objective}`);
            console.log(`Fragment: ${sheet.fragment}`);
            // Extraer el texto de las observaciones
            const observationTexts = sheet.observations
                .map((observation) =>
                    observation.children.map((child) => child.text).join(" ")
                )
                .join(" ");

            console.log(`Observations: ${observationTexts}`);
        });
    });
}

/* 

Observations: [
  {
    "style": "normal",
    "_key": "050feed70271",
    "markDefs": [],
    "children": [
      {
        "_key": "b125a16dd0ea",
        "_type": "span",
        "marks": [],
        "text": "Esta estudiando, y esta tocando bastante bien, los saltos de la izquierda los hace de manera fluida."
      }
    ],
    "_type": "block"
  }
]


*/