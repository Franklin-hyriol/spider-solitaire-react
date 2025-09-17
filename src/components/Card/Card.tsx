import { useDraggable } from "@dnd-kit/core";
import type { ICard } from "../../types";
import { getCardClass } from "../../helpers/cardHelpers";
import React from "react";
import { useDragStore } from "../../stores/DragStore";

function CardComponent({ id, value, faceUp }: ICard) {
  // Souscription optimisée au store de Drag
  const isBeingDragged = useDragStore((state) => state.draggedCardIds.has(id));
  const isValidDrag = useDragStore((state) => state.isValidDrag);

  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  // La carte doit être invisible si elle fait partie d'une opération de glissement valide
  const showAsDragged = isBeingDragged && isValidDrag;

  if (!faceUp) {
    // Affiche le dos de la carte si elle est face cachée
    return <div className="pcard-back w-full" />;
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      // N'attache les écouteurs de glissement que si la carte est face visible
      {...(faceUp ? listeners : {})}
      className={`${getCardClass(id, value)} w-full cursor-grab ${
        showAsDragged ? "opacity-0" : ""
      }`}
    />
  );
}

export default React.memo(CardComponent);