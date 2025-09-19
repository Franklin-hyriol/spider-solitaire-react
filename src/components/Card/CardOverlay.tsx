import type { ICard } from "../../types";
import { getCardClass } from "../../helpers/cardHelpers";

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
            index !== 0 ? (card.faceUp ? "-mt-50.5" : "-mt-57") : ""
          }`}
        />
      ))}
    </div>
  );
}
