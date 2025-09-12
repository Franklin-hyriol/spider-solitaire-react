import { useColumnsStore } from "../../stores/ColumnStore";
import Column from "../Column/Column";

export function Board() {
  const columns = useColumnsStore((state) => state.columns);

  return (
    <div className="grid grid-cols-10 gap-4 w-full">
      {columns.map((column) => (
        <Column key={column.id} columnId={column.id} cards={column.cards} />
      ))}
    </div>
  );
}