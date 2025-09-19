import type { IColumn } from "../types";
import { isDraggableStack, isValidDropTarget } from "./dndValidation";

/**
 * Scanne toutes les colonnes du jeu pour déterminer si au moins un mouvement est encore possible.
 * @param columns - L'ensemble des colonnes de jeu.
 * @returns `true` si un mouvement est possible, sinon `false`.
 */
export function hasPossibleMoves(columns: IColumn[]): boolean {
  // Itérer sur chaque colonne comme source potentielle du déplacement
  for (const sourceColumn of columns) {
    if (!sourceColumn.cards || sourceColumn.cards.length === 0) {
      continue;
    }

    // Itérer sur chaque carte de la colonne source pour trouver des piles déplaçables
    for (let i = 0; i < sourceColumn.cards.length; i++) {
      const stackToDrag = sourceColumn.cards.slice(i);

      // Si la pile n'est pas déplaçable, inutile de tester les cartes suivantes dans cette colonne
      if (!isDraggableStack(stackToDrag)) {
        continue;
      }

      // Maintenant, tester cette pile déplaçable contre toutes les autres colonnes de destination
      for (const destinationColumn of columns) {
        // On ne peut pas déposer une pile sur sa propre colonne
        if (sourceColumn.id === destinationColumn.id) {
          continue;
        }

        // Vérifier si le déplacement est valide
        if (isValidDropTarget(stackToDrag, destinationColumn.cards)) {
          // Dès qu'on trouve un seul mouvement possible, on peut s'arrêter.
          return true;
        }
      }
    }
  }

  // Si on a tout vérifié sans trouver de mouvement, la partie est potentiellement bloquée.
  return false;
}
