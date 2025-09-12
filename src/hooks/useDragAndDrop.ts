import {
  type UniqueIdentifier,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState, useCallback } from "react";
import { useGameStatsStore } from "../stores/GameStatsStore";
import { useColumnsStore } from "../stores/ColumnStore";
import type { ICard } from "../types";
import { isDraggableStack, isValidDropTarget } from "../logic/dndValidation";
import { moveCardStack } from "../logic/dndState";
import { checkForCompletedSet } from "../helpers/cardHelpers";

/**
 * Hook personnalisé pour gérer toute la logique du glisser-déposer (drag and drop).
 * Il utilise le store Zustand (`useColumnsStore`) pour interagir avec l'état global des colonnes et des cartes.
 */
export function useDragAndDrop() {
  const columns = useColumnsStore((state) => state.columns);
  const setColumns = useColumnsStore((state) => state.setColumns);

  // --- États locaux pour le suivi de l'opération de glisser-déposer ---
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [draggedStack, setDraggedStack] = useState<ICard[] | null>(null);

  /**
   * Réinitialise l'état du glisser-déposer.
   */
  const cleanupDragState = useCallback(() => {
    setTimeout(() => {
      setActiveId(null);
      setDraggedStack(null);
    }, 250); // Un délai pour permettre aux animations de se terminer
  }, []);

  /**
   * Trouve l'ID de la colonne à laquelle appartient un élément (carte ou colonne).
   */
  const findColumnId = useCallback(
    (itemId: UniqueIdentifier) => {
      if (columns.some((c) => c.id === itemId)) {
        return itemId;
      }
      return columns.find((c) => c.cards?.some((card) => card.id === itemId))?.id;
    },
    [columns]
  );

  // --- Fonctions d'accès pour les composants externes ---
  const getActiveCard = (): ICard | undefined => draggedStack?.[0];
  const getDraggedStack = () => draggedStack;

  // --- Gestionnaires d'événements Dnd-Kit ---

  /**
   * Déclenché au début d'un glissement.
   */
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
    }
  };

  /**
   * Déclenché lorsqu'un élément est glissé au-dessus d'une zone de dépôt.
   */
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over || !draggedStack) return;
    // La logique de prévisualisation est gérée par dnd-kit
  };

  /**
   * Déclenché à la fin d'un glissement (lorsque l'élément est déposé).
   */
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

    // Gérer le dépôt sur une pile de fondation (logique manuelle, peut être conservée ou supprimée)
    if (String(overColId).startsWith("f")) {
      // Pour l'instant, on ne gère pas le dépôt manuel sur la fondation
      // car le jeu Spider déplace automatiquement les piles complètes.
      console.log("Le dépôt manuel sur la fondation n'est pas implémenté.");
      cleanupDragState();
      return;
    }

    // Logique pour le dépôt sur une colonne de jeu
    const overColumn = columns.find((c) => c.id === overColId);
    if (isValidDropTarget(draggedStack, overColumn?.cards)) {
      const { addMove, addMoney, addCompletedSet } = useGameStatsStore.getState();
      addMove();
      addMoney(-10);

      const newColumnsState = moveCardStack(
        columns,
        draggedStack,
        activeColId,
        overColId
      );
      setColumns(newColumnsState);

      const { revealLastCard, moveToFoundation, foundation } =
        useColumnsStore.getState();
      revealLastCard(String(activeColId));

      // --- Vérification de la suite complète ---
      const updatedOverColumn = newColumnsState.find(
        (c) => c.id === overColId
      );
      if (updatedOverColumn && updatedOverColumn.cards) {
        const completedSet = checkForCompletedSet(updatedOverColumn.cards);
        if (completedSet) {
          const emptyFoundation = foundation.find((f) => !f.cards || f.cards.length === 0);
          if (emptyFoundation) {
            console.log("Suite complète détectée ! Déplacement vers la fondation.");
            moveToFoundation(completedSet, String(overColId), emptyFoundation.id);
            addCompletedSet();
            addMoney(1000); // Bonus pour avoir complété une suite
            revealLastCard(String(overColId)); // Révéler la carte sous la suite
          }
        }
      }
    }

    cleanupDragState();
  };

  /**
   * Déclenché si le glissement est annulé.
   */
  const handleDragCancel = () => {
    cleanupDragState();
  };

  return {
    activeId,
    getActiveCard,
    getDraggedStack,
    isValidDrag: !!draggedStack, // Dérivé de l'état de draggedStack
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}
