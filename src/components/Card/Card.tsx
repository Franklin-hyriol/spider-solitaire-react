import { useSortable } from "@dnd-kit/sortable";
import type { ICard } from "../../types";
import { CSS } from "@dnd-kit/utilities";
import { getCardClass } from "../../helpers/cardHelpers";
import React from "react";

/**
 * Ce composant est utilisé pour afficher la pile de cartes glissée dans l'overlay.
 * Il affiche une liste de cartes avec un effet de superposition.
 */
export function CardOverlay({ stack }: { stack: ICard[] }) {
  return (
    <div>
      {stack.map((card, index) => (
        <div
          key={card.id}
          className={`${getCardClass(card.id, card.value)} w-full cursor-grabbing ${
            index !== 0 ? (card.faceUp ? "-mt-51" : "-mt-56") : ""
          }`}
        />
      ))}
    </div>
  );
}

// Représente une seule carte dans une colonne.
interface ICardComponentProps extends ICard {
  draggedStack?: ICard[] | null;
  isValidDrag: boolean;
}

function CardComponent({
  id,
  value,
  faceUp,
  draggedStack,
  isValidDrag,
}: ICardComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id }); // La variable 'isDragging' a été supprimée car non utilisée

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Vérifie si la carte fait partie de la pile en cours de glissement
  const isCardInStack = draggedStack?.some((c) => c.id === id);

  // La carte doit être invisible si elle fait partie d'une opération de glissement valide
  const showAsDragged = isCardInStack && isValidDrag;

  if (!faceUp) {
    // Affiche le dos de la carte si elle est face cachée
    return <div className="pcard-back w-full" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
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