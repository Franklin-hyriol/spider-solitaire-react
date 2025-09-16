import type { ICard } from "../types"

const colors = ["spade", "diamond"] // pour l'instant juste noir
const decksPerColor = 4

// Crée un jeu de cartes pour le Spider Solitaire (distribution initiale)
export const createDeck = (): ICard[] => {
    const cards: ICard[] = []

    for (const color of colors) {
        for (let deck = 1; deck <= decksPerColor; deck++) {
            for (let value = 1; value <= 13; value++) {
                cards.push({
                    id: `${color}-${value}-${deck}`,
                    value,
                    faceUp: false
                })
            }
        }
    }

    return cards
}





// Fonction pour obtenir la classe CSS d'une carte
export const getCardClass = (id: string, value: number) => {
    const suit = id.split('-')[0][0]; // s, c, d, h
    let displayValue: string;

    switch (value) {
        case 1:
            displayValue = 'a';
            break;
        case 11:
            displayValue = 'j';
            break;
        case 12:
            displayValue = 'q';
            break;
        case 13:
            displayValue = 'k';
            break;
        default:
            displayValue = value.toString();
    }

    return `pcard-${displayValue}${suit}`;
};

// Vérifie si une colonne contient une suite complète (du Roi à l'As)
export const checkForCompletedSet = (cards: ICard[]): ICard[] | null => {
  if (cards.length < 13) {
    return null;
  }

  const lastThirteen = cards.slice(-13);

  // Vérifier que toutes les cartes sont face visible
  if (lastThirteen.some(card => !card.faceUp)) {
    return null;
  }

  // La première carte de la pile doit être un Roi (13)
  if (lastThirteen[0].value !== 13) {
    return null;
  }

  // On prend la couleur du Roi comme référence
  const targetSuit = lastThirteen[0].id.split('-')[0];

  // On vérifie la séquence décroissante ET la couleur
  for (let i = 0; i < 13; i++) {
    const card = lastThirteen[i];
    const cardSuit = card.id.split('-')[0];

    if (card.value !== 13 - i || cardSuit !== targetSuit) {
      return null;
    }
  }

  return lastThirteen;
};
