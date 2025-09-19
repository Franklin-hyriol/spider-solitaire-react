import { useDroppable } from "@dnd-kit/core";
import Card from "../Card/Card";
import type { ICard } from "../../types";
import React from "react";
import { useHintStore } from "../../stores/HintStore";

interface ColumnProps {
  columnId: string;
  cards?: ICard[] | null;
}

/**
 * Représente une seule colonne sur le plateau de jeu.
 * C'est une zone "déposable" (droppable) qui contient une liste de cartes.
 */
function ColumnComponent({ columnId, cards }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: columnId });
  const hintToShow = useHintStore((state) => state.hintToShow);
  const hintPhase = useHintStore((state) => state.hintPhase);

  const getMarginTop = (card: ICard, index: number) => {
    if (index === 0) {
      return "";
    }
    return card.faceUp ? "-mt-50.5" : "-mt-56";
  };

  let hintClass = "";
  if (hintToShow && hintPhase !== "idle") {
    // Indice pour un mouvement entre colonnes
    if (hintToShow.type === "move") {
      if (hintToShow.sourceColId === columnId) {
        hintClass = "animate-pulse-green"; // La source est toujours verte
      }
      if (hintPhase === "dest" && hintToShow.destColId === columnId) {
        hintClass = "animate-pulse-blue"; // La destination devient bleue en phase 2
      }
    }
    // Indice pour une fondation (juste une source)
    if (
      hintToShow.type === "foundation" &&
      hintToShow.sourceColId === columnId
    ) {
      hintClass = "animate-pulse-green";
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[calc(100vh-4rem)] p-0.5 rounded ${hintClass}`}
    >
      {cards?.map((card, index) => (
        <div key={card.id} className={getMarginTop(card, index)}>
          <Card id={card.id} value={card.value} faceUp={card.faceUp} />
        </div>
      ))}
    </div>
  );
}

export default React.memo(ColumnComponent);
