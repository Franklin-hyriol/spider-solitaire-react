import { useDroppable } from "@dnd-kit/core";
import { useColumnsStore } from "../../stores/ColumnStore";
import type { IColumn } from "../../types";
import Card from "../Card/Card";

/**
 * Représente une seule pile de fondation.
 * C'est une zone où une suite de cartes complétée peut être déposée.
 */
function FoundationPile({ id, cards }: IColumn) {
  const { setNodeRef } = useDroppable({ id });

  const topCard = cards?.[0];

  return (
    <div
      ref={setNodeRef}
      className="w-30 h-43 border-2 border-dashed border-gray-500 rounded-md bg-black/10"
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
    <div className="flex flex-row absolute bottom-5 left-8 gap-4">
      {foundationPiles.map((pile) => (
        <FoundationPile key={pile.id} id={pile.id} cards={pile.cards} />
      ))}
    </div>
  );
}

export default Foundation;