import { useColumnsStore } from "../../stores/ColumnStore";
import { useHintStore } from "../../stores/HintStore";

/**
 * Affiche la pioche (stock) et gère le clic pour distribuer de nouvelles cartes.
 * Seule la carte de base (à gauche) est cliquable.
 */
function Stock() {
  const stock = useColumnsStore((state) => state.stock);
  const dealFromStock = useColumnsStore((state) => state.dealFromStock);
  const hint = useHintStore((state) => state.currentHint);

  const hintClass = hint?.type === "stock" ? "animate-pulse-green" : "";

  // Cas 1: La pioche est vide, on affiche un emplacement grisé
  if (stock.length === 0) {
    return (
      <div className="absolute bottom-5 right-8">
        <div className="w-30 h-40" />
      </div>
    );
  }

  // Cas 2: La pioche contient des cartes
  const visualDeals = Math.min(Math.ceil(stock.length / 10), 5);

  return (
    <div className={`flex flex-row absolute bottom-5 right-8 rounded-md shadow-md transition-shadow duration-300 ${hintClass}`}>
      {Array.from({ length: visualDeals }).map((_, i) => {
        const isClickable = i === 0; // Seule la première carte (à gauche) est cliquable
        const zIndex = visualDeals - i; // Le z-index le plus élevé pour la première carte

        // La carte de base est un bouton cliquable
        if (isClickable) {
          return (
            <button
              key={i}
              onClick={dealFromStock}
              style={{ zIndex: zIndex }}
              className={`w-30 h-fit hover:scale-105 active:scale-95 transition-all cursor-pointer hover:shadow-[0px_0px_10px_2px_var(--color-primary)]`}
              aria-label={`Pioche, ${stock.length} cartes restantes`}
            >
              <div className="pcard-back w-full h-full" />
            </button>
          );
        }

        // Les cartes suivantes (à droite) ne sont que des divs non cliquables avec une marge négative
        return (
          <div
            key={i}
            style={{ zIndex: zIndex }}
            className={`w-30 h-fit -ml-23`}
          >
            <div className="pcard-back w-full h-full" />
          </div>
        );
      })}
    </div>
  );
}

export default Stock;