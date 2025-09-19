import {
  type UniqueIdentifier,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState, useCallback } from "react";
import { useGameStatsStore } from "../stores/GameStatsStore";
import { useColumnsStore } from "../stores/ColumnStore";
import { isDraggableStack, isValidDropTarget } from "../logic/dndValidation";
import { moveCardStack } from "../logic/dndState";
import { checkForCompletedSet } from "../helpers/cardHelpers";
import { useHintStore } from "../stores/HintStore";


import { useDragStore } from "../stores/DragStore"; // Import the new store
import { useUndoStore } from "../stores/UndoStore";

/**
 * Hook personnalisé pour gérer toute la logique du glisser-déposer (drag and drop).
 */
export function useDragAndDrop() {
  const columns = useColumnsStore((state) => state.columns);
  const setColumns = useColumnsStore((state) => state.setColumns);
  const revealLastCard = useColumnsStore((state) => state.revealLastCard);
  const moveToFoundation = useColumnsStore((state) => state.moveToFoundation);
  const foundation = useColumnsStore((state) => state.foundation);

  const addMove = useGameStatsStore((state) => state.addMove);
  const addMoney = useGameStatsStore((state) => state.addMoney);
  const addCompletedSet = useGameStatsStore((state) => state.addCompletedSet);

  const setDraggedStack = useDragStore((state) => state.setDraggedStack);
  const setIsValidDrag = useDragStore((state) => state.setIsValidDrag);
  const draggedStack = useDragStore((state) => state.draggedStack);

  const setPreviousState = useUndoStore((state) => state.setPreviousState);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const cleanupDragState = useCallback(() => {
    setTimeout(() => {
      setActiveId(null);
      setDraggedStack(null);
      setIsValidDrag(false);
    }, 250);
  }, [setDraggedStack, setIsValidDrag]);

  const findColumnId = useCallback(
    (itemId: UniqueIdentifier) => {
      if (columns.some((c) => c.id === itemId)) {
        return itemId;
      }
      return columns.find((c) => c.cards?.some((card) => card.id === itemId))?.id;
    },
    [columns]
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeColId = findColumnId(active.id);
    if (!activeColId) return;

    const activeColumn = columns.find((c) => c.id === activeColId);
    if (!activeColumn?.cards) return;

    const activeIndex = activeColumn.cards.findIndex((c) => c.id === active.id);
    if (activeIndex === -1) return;

    const potentialStack = activeColumn.cards.slice(activeIndex);

    if (isDraggableStack(potentialStack)) {
      setActiveId(active.id);
      setDraggedStack(potentialStack);
      setIsValidDrag(true); // A drag is starting
    } else {
      setDraggedStack(null);
      setIsValidDrag(false);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over || !draggedStack) return;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !draggedStack) {
      cleanupDragState();
      return;
    }

    const activeColId = findColumnId(active.id);
    const overColId = findColumnId(over.id);

    if (!activeColId || !overColId || activeColId === overColId) {
      cleanupDragState();
      return;
    }

    if (String(overColId).startsWith("f")) {
      cleanupDragState();
      return;
    }

    const overColumn = columns.find((c) => c.id === overColId);
    if (isValidDropTarget(draggedStack, overColumn?.cards)) {
      setPreviousState(); // Save state only on a valid move
      addMove();
      addMoney(-10);

      const newColumnsState = moveCardStack(
        columns,
        draggedStack,
        activeColId,
        overColId
      );
      setColumns(newColumnsState);
      useHintStore.getState().clearAllHints(); // Invalider le cache d'indices

      revealLastCard(String(activeColId));

      const updatedOverColumn = newColumnsState.find(
        (c) => c.id === overColId
      );
      if (updatedOverColumn && updatedOverColumn.cards) {
        const completedSet = checkForCompletedSet(updatedOverColumn.cards);
        if (completedSet) {
          const emptyFoundation = foundation.find((f) => !f.cards || f.cards.length === 0);
          if (emptyFoundation) {
            moveToFoundation(completedSet, String(overColId), emptyFoundation.id);
            addCompletedSet();
            addMoney(1000);
            revealLastCard(String(overColId));
          }
        }
      }
    }

    cleanupDragState();
  };

  const handleDragCancel = () => {
    cleanupDragState();
  };

  // The hook no longer needs to return drag state, only the handlers and activeId
  return {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}
