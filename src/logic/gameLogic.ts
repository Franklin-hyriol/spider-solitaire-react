import type { ICard, IColumn } from "../types";
import { checkForCompletedSet } from "../helpers/cardHelpers";
import { isDraggableStack, isValidDropTarget } from "./dndValidation";

export type Hint = 
  | { type: "move"; sourceColId: string; destColId: string } 
  | { type: "foundation"; sourceColId: string } 
  | { type: "stock" };

/**
 * Trouve tous les mouvements possibles et les trie par priorité.
 * @param columns - L'ensemble des colonnes de jeu.
 * @param stock - Les cartes de la pioche.
 * @returns Une liste d'objets Hint triée par priorité.
 */
export function findAllMoves(columns: IColumn[], stock: ICard[]): Hint[] {
  const foundationMoves: Hint[] = [];
  const sameSuitMoves: Hint[] = [];
  const otherMoves: Hint[] = [];

  // Priorité 1: Chercher les suites complètes
  for (const column of columns) {
    if (column.cards && column.cards.length > 0) {
      if (checkForCompletedSet(column.cards)) {
        foundationMoves.push({ type: "foundation", sourceColId: column.id });
      }
    }
  }

  // Priorités 2 & 3: Chercher les mouvements entre colonnes
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

          // Priorité 2: Continuation d'une suite de même couleur
          const topOfStack = stackToDrag[0];
          const destCard = destinationColumn.cards?.[destinationColumn.cards.length - 1];
          // La couleur est le premier caractère de l'ID (ex: 'h' pour 'h10-1')
          if (destCard && topOfStack.id[0] === destCard.id[0]) {
            sameSuitMoves.push(currentMove);
          } else {
            // Priorité 3: Autre mouvement valide
            otherMoves.push(currentMove);
          }
        }
      }
    }
  }

  const allMoves = [...foundationMoves, ...sameSuitMoves, ...otherMoves];

  // Priorité 4: Suggérer la pioche si aucun autre mouvement n'est possible
  if (allMoves.length === 0 && stock.length > 0) {
    return [{ type: "stock" }];
  }

  return allMoves;
}

/**
 * Scanne le jeu pour déterminer si au moins un mouvement est possible.
 * @param columns - L'ensemble des colonnes de jeu.
 * @param stock - Les cartes de la pioche.
 * @returns `true` si un mouvement est possible, sinon `false`.
 */
export function hasPossibleMoves(columns: IColumn[], stock: ICard[]): boolean {
  // On vérifie simplement s'il existe au moins un mouvement
  return findAllMoves(columns, stock).length > 0;
}
