import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useColumnsStore } from "../../stores/ColumnStore";
import { CardOverlay } from "../Card/Card";
import Column from "../Column/Column";

export function Board() {
  const columns = useColumnsStore((state) => state.columns);
  const {
    activeId,
    getDraggedStack,
    isValidDrag,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useDragAndDrop();

  const draggedStack = getDraggedStack();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required to activate
      },
    }),
    useSensor(KeyboardSensor)
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-10 gap-4 w-full">
        {columns.map((column) => (
          <Column
            key={column.id}
            columnId={column.id}
            cards={column.cards}
            draggedStack={draggedStack}
            isValidDrag={isValidDrag}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId && draggedStack ? (
          <CardOverlay stack={draggedStack} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}