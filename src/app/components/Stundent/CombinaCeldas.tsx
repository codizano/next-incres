import * as XLSX from "xlsx";

interface Props {
  archivo: string;
  columna: string;
  filaInicio: number;
  filaFin: number;
}

const CombinaCeldas: React.FC<Props> = ({
  archivo,
  columna,
  filaInicio,
  filaFin,
}) => {
  const combinaCeldas = () => {
    const archivoExcel = XLSX.readFile(archivo);
    const hojaTrabajo = archivoExcel.Sheets["Hoja1"];
    if (!hojaTrabajo["!merges"]) hojaTrabajo["!merges"] = [];
    hojaTrabajo["!merges"].push({
      s: { r: filaInicio - 1, c: columna.charCodeAt(0) - 65 },
      e: { r: filaFin - 1, c: columna.charCodeAt(0) - 65 },
    });
    XLSX.writeFile(archivoExcel, archivo);
  };

  return (
    <div>
      <button onClick={combinaCeldas}>Combina celdas</button>
    </div>
  );
};

export default CombinaCeldas;
