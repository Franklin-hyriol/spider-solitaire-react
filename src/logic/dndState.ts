import type { ICard, IColumn } from "../types";
import type { UniqueIdentifier } from "@dnd-kit/core";

/**
 * Déplace une pile de cartes d'une colonne à une autre.
 *
 * @param columns - L'état actuel des colonnes.
 * @param stackToMove - La pile de cartes à déplacer.
 * @param sourceColumnId - L'ID de la colonne d'origine.
 * @param destinationColumnId - L'ID de la colonne de destination.
 * @returns Le nouvel état des colonnes après le déplacement.
 */
export function moveCardStack(
  columns: IColumn[],
  stackToMove: ICard[],
  sourceColumnId: UniqueIdentifier,
  destinationColumnId: UniqueIdentifier
): IColumn[] {
  return columns.map((col) => {
    // Retire la pile de la colonne source
    if (col.id === sourceColumnId) {
      const newCards = (col.cards ?? []).filter(
        (c) => !stackToMove.some((movedCard) => movedCard.id === c.id)
      );
      return { ...col, cards: newCards };
    }
    // Ajoute la pile à la colonne de destination
    if (col.id === destinationColumnId) {
      const newCards = [...(col.cards ?? []), ...stackToMove];
      return { ...col, cards: newCards };
    }
    // Retourne les autres colonnes sans modification
    return col;
  });
}
