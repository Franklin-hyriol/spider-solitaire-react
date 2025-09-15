import { useDroppable } from "@dnd-kit/core";
import { useColumnsStore } from "../../stores/ColumnStore";
import type { IColumn } from "../../types";
import Card from "../Card/Card";

/**
 * Représente une seule pile de fondation.
 * C'est une zone où une suite de cartes complétée peut être déposée.
 */
function FoundationPile({ id, cards, className = "" }: IColumn & { className?: string }) {
  const { setNodeRef } = useDroppable({ id });

  const topCard = cards?.[0];

  return (
    <div
      ref={setNodeRef}
      className={`w-30 h-43 ${className}`}
    >
      {/* Affiche la carte du dessus si la pile n'est pas vide */}
      {topCard && <Card {...topCard} />}
    </div>
  );
}

/**
 * Le composant principal qui affiche les 8 piles de fondation.
 */
function Foundation() {
  const foundationPiles = useColumnsStore((state) => state.foundation);

  return (
    <div className="flex flex-row absolute bottom-5 left-8">
      {foundationPiles.map((pile, index) => (
        <FoundationPile key={pile.id} id={pile.id} cards={pile.cards} className={index === 0 ? "" : "-ml-24"} />
      ))}
    </div>
  );
}

export default Foundation;