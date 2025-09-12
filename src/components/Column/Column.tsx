import { useDroppable } from "@dnd-kit/core";
import Card from "../Card/Card";
import type { ICard } from "../../types";
import React from "react";

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

  const getMarginTop = (card: ICard, index: number) => {
    if (index === 0) {
      return "";
    }
    return card.faceUp ? "-mt-50.5" : "-mt-56";
  };

  return (
    <div
      ref={setNodeRef}
      className="min-h-[calc(100vh-4rem)] p-0.5 rounded bg-gray-100"
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