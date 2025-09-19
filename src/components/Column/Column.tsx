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
  const hint = useHintStore((state) => state.currentHint);

  const getMarginTop = (card: ICard, index: number) => {
    if (index === 0) {
      return "";
    }
    return card.faceUp ? "-mt-50.5" : "-mt-56";
  };

  let hintClass = "";
  if (hint?.type === "move" && hint.sourceColId === columnId) {
    hintClass = "shadow-[0_0_15px_5px] shadow-green-500 rounded-md";
  }
  if (hint?.type === "move" && hint.destColId === columnId) {
    hintClass = "shadow-[0_0_15px_5px] shadow-red-500 rounded-md";
  }
  if (hint?.type === "foundation" && hint.sourceColId === columnId) {
    hintClass = "shadow-[0_0_15px_5px] shadow-green-500 rounded-md";
  }

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[calc(100vh-4rem)] p-0.5 rounded transition-shadow duration-300 ${hintClass}`}
    >
        {cards?.map((card, index) => (
          <div key={card.id} className={getMarginTop(card, index)}>
            <Card
              id={card.id}
              value={card.value}
              faceUp={card.faceUp}
            />
          </div>
        ))}
    </div>
  );
}

export default React.memo(ColumnComponent);