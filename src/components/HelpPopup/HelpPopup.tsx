import React from "react";

type HelpPopupProps = {
  onClose: () => void;
};

const HelpPopup: React.FC<HelpPopupProps> = ({ onClose }) => {
  return (
    <div className="max-w-lg w-[500px] h-fit p-8 flex flex-col items-center gap-4 bg-white rounded-lg shadow-xl overflow-y-auto max-h-[80vh] scrollbar-hidden">
      <div className="w-full flex justify-center items-center pb-4 border-b-4 border-emerald-600">
        <h2 className="text-3xl font-bold text-emerald-800">Aide</h2>
      </div>
      <div className="w-full text-left">
        {/* Règles */}
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">
          Règles du jeu
        </h3>
        <p className="text-gray-700 mb-4">
          Le Spider Solitaire se joue avec 10 colonnes de cartes. Le but est de
          former des suites complètes de Roi à As dans la même couleur.
          Lorsqu’une suite complète est construite, elle est automatiquement
          retirée du tableau. Vous pouvez déplacer une carte ou une séquence de
          cartes ordonnées sur une autre carte immédiatement supérieure en
          valeur. Si aucune suite n’est possible, cliquez sur la pioche pour
          distribuer une nouvelle ligne de cartes. La partie est gagnée lorsque
          toutes les cartes ont été rangées en suites complètes.
        </p>

        {/* Raccourcis */}
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">
          Raccourcis clavier
        </h3>
        <ul className="list-none text-gray-700 space-y-1">
          <li>
            <kbd className="kbd">Échap</kbd> : Fermer la fenêtre
            d’aide
          </li>
          <li>
            <kbd className="kbd">N</kbd> : Nouvelle partie
          </li>
          <li>
            <kbd className="kbd">R</kbd> : Recommencer la partie
            actuelle
          </li>
          <li>
            <kbd className="kbd">H</kbd> : Afficher un indice (hint)
          </li>
          <li>
            <kbd className="kbd">Espace</kbd> : Distribuer une
            nouvelle ligne de cartes
          </li>
          <li>
            <kbd className="kbd">Ctrl + Z</kbd> : Annuler le dernier
            coup
          </li>
          <li>
            <kbd className="kbd">Ctrl + Y</kbd> : Rétablir un coup
            annulé
          </li>
          <li>
            <kbd className="kbd">P</kbd> : Mettre le jeu en pause /
            reprendre
          </li>
          <li>
            <kbd className="kbd">Flèches ← →</kbd> : Naviguer entre
            les colonnes
          </li>
          <li>
            <kbd className="kbd">Entrée</kbd> : Sélectionner ou
            poser une carte
          </li>
        </ul>
      </div>

      {/* Bouton fermer */}
      <div className="flex gap-4 w-full mt-4">
        <button onClick={onClose} className="btn btn-dash btn-secondary flex-1">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default HelpPopup;
