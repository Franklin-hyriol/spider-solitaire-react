import type { ICard, IColumn } from "../types";
import { checkForCompletedSet } from "../helpers/cardHelpers";
import { isDraggableStack, isValidDropTarget } from "./dndValidation";

export type Hint = 
  | { type: "move"; sourceColId: string; destColId: string } 
  | { type: "foundation"; sourceColId: string } 
  | { type: "stock" };

/**
 * Scanne le plateau pour trouver le meilleur mouvement possible selon un ordre de priorité.
 * @param columns - L'ensemble des colonnes de jeu.
 * @param stock - Les cartes de la pioche.
 * @returns Un objet Hint représentant le meilleur mouvement, ou null si aucun mouvement n'est possible.
 */
export function findBestMove(columns: IColumn[], stock: ICard[]): Hint | null {
  // Passe 1: Chercher une suite complète à déplacer vers la fondation
  for (const column of columns) {
    if (column.cards && column.cards.length > 0) {
      const completedSet = checkForCompletedSet(column.cards);
      if (completedSet) {
        return { type: "foundation", sourceColId: column.id };
      }
    }
  }

  let firstValidMove: Hint | null = null;

  // Passes 2 & 3: Chercher les mouvements entre colonnes
  for (const sourceColumn of columns) {
    if (!sourceColumn.cards || sourceColumn.cards.length === 0) continue;

    for (let i = 0; i < sourceColumn.cards.length; i++) {
      const stackToDrag = sourceColumn.cards.slice(i);

      if (!isDraggableStack(stackToDrag)) continue;

      for (const destinationColumn of columns) {
        if (sourceColumn.id === destinationColumn.id) continue;

        if (isValidDropTarget(stackToDrag, destinationColumn.cards)) {
          const currentMove: Hint = {
            type: "move",
            sourceColId: sourceColumn.id,
            destColId: destinationColumn.id,
          };

          // Passe 2: Priorité à la continuation d'une suite de même couleur
          const topOfStack = stackToDrag[0];
          const destCard = destinationColumn.cards?.[destinationColumn.cards.length - 1];
          if (destCard && topOfStack.id.split('-')[0] === destCard.id.split('-')[0]) {
            return currentMove; // Mouvement de Prio 2 trouvé
          }

          // Passe 3: Mémoriser le premier mouvement valide trouvé
          if (!firstValidMove) {
            firstValidMove = currentMove;
          }
        }
      }
    }
  }

  if (firstValidMove) {
    return firstValidMove; // Retourne le mouvement de Prio 3
  }

  // Passe 4: Suggérer la pioche s'il n'y a aucun mouvement et que la pioche n'est pas vide
  if (stock.length > 0) {
    return { type: "stock" };
  }

  return null; // Aucun mouvement possible
}

/**
 * Scanne toutes les colonnes du jeu pour déterminer si au moins un mouvement est encore possible.
 * @param columns - L'ensemble des colonnes de jeu.
 * @param stock - Les cartes de la pioche.
 * @returns `true` si un mouvement est possible, sinon `false`.
 */
export function hasPossibleMoves(columns: IColumn[], stock: ICard[]): boolean {
  return findBestMove(columns, stock) !== null;
}
