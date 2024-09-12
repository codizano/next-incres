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
    XLSX.utils.mergeCells(
      hojaTrabajo,
      `${columna}${filaInicio}:${columna}${filaFin}`,
      "h"
    );
    XLSX.writeFile(archivoExcel, archivo);
  };

  return (
    <div>
      <button onClick={combinaCeldas}>Combina celdas</button>
    </div>
  );
};

export default CombinaCeldas;
