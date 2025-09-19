import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { CardOverlay } from "../Card/CardOverlay";
import { Board } from "../Board/Board";
import Foundation from "../Foundation/Foundation";
import Dashboard from "../Dashboard/Dashboard";
import Stock from "../Stock/Stock";
import { useDragStore } from "../../stores/DragStore";

export function GameSurface() {
  // dnd setup
  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useDragAndDrop();

  const draggedStack = useDragStore((state) => state.draggedStack);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required to activate
      },
    }),
    useSensor(KeyboardSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
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
      <main className="bg-[var(--color-base-100)] bg-[linear-gradient(var(--color-square)_1px,transparent_1px),linear-gradient(90deg,var(--color-square)_1px,transparent_1px)] bg-[length:20px_20px] h-[calc(100vh-32px)] w-full relative">
        <div className="py-4 px-8 h-full">
          <Board />
        </div>
        <Foundation />
        <Dashboard />
        <Stock />
      </main>
      <DragOverlay>
        {activeId && draggedStack ? <CardOverlay stack={draggedStack} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
