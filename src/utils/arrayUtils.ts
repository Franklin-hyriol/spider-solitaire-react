/**
 * Mélange un tableau en utilisant l'algorithme Fisher-Yates.
 * Crée une copie du tableau pour éviter de modifier l'original.
 * @param array Le tableau à mélanger.
 * @returns Un nouveau tableau contenant les éléments mélangés.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
