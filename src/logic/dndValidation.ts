import type { ICard } from "../types";

/**
 * Valide une pile de cartes pour s'assurer qu'elle peut être glissée.
 * Une pile valide a sa première carte face visible.
 * Si la pile est plus longue, les cartes suivantes doivent être dans un ordre décroissant de valeurs.
 * @param stack - La pile de cartes à valider.
 * @returns `true` si la pile est valide, sinon `false`.
 */
export function isDraggableStack(stack: ICard[]): boolean {
  if (stack.length === 0 || !stack[0].faceUp) {
    return false;
  }

  // On prend la couleur de la première carte comme référence
  const firstCardSuit = stack[0].id.split('-')[0];

  for (let i = 1; i < stack.length; i++) {
    const prevCard = stack[i - 1];
    const currentCard = stack[i];
    const currentCardSuit = currentCard.id.split('-')[0];

    // La pile doit être face visible, en ordre décroissant, ET de la même couleur.
    if (
      !currentCard.faceUp ||
      prevCard.value !== currentCard.value + 1 ||
      currentCardSuit !== firstCardSuit
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Valide si une pile de cartes peut être déposée sur une colonne de destination.
 * @param stackToDrop - La pile de cartes en cours de glissement.
 * @param destinationColumnCards - Les cartes de la colonne de destination.
 * @returns `true` si le dépôt est valide, sinon `false`.
 */
export function isValidDropTarget(
  stackToDrop: ICard[],
  destinationColumnCards: ICard[] | null | undefined
): boolean {
  if (stackToDrop.length === 0) {
    return false;
  }

  const firstCardInStack = stackToDrop[0];
  const lastCardInOverColumn = destinationColumnCards?.[destinationColumnCards.length - 1];

  // Dans Spider Solitaire, n'importe quelle carte peut être placée sur une colonne vide.
  if (!lastCardInOverColumn) {
    return true;
  }

  // Le dépôt est valide si la valeur de la carte est inférieure de 1.
  return firstCardInStack.value === lastCardInOverColumn.value - 1;
}
