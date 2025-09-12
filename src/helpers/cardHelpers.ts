import type { ICard } from "../types"

const colors = ["spade"] // pour l'instant juste noir
const decksPerColor = 8   // 4 jeux pour un total de 52 cartes

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

    // Ajoute 2 cartes supplémentaires pour atteindre 54 cartes pour la distribution
    cards.push({ id: "spade-1-5", value: 1, faceUp: false });
    cards.push({ id: "spade-1-6", value: 1, faceUp: false });

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

  // Vérifier la séquence décroissante du Roi (13) à l'As (1)
  for (let i = 0; i < 13; i++) {
    if (lastThirteen[i].value !== 13 - i) {
      return null;
    }
  }

  return lastThirteen;
};
