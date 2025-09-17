import React from "react";

type HelpPopupProps = {
  onClose: () => void;
};

const HelpPopup: React.FC<HelpPopupProps> = ({ onClose }) => {
  return (
    <div className="max-w-lg w-[500px] h-fit p-8 flex flex-col items-center gap-4 bg-white rounded-lg shadow-xl">
      <div className="w-full flex justify-center items-center pb-4 border-b-4 border-emerald-600">
        <h2 className="text-3xl font-bold text-emerald-800">Aide</h2>
      </div>
      <div className="w-full text-left">
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">Règles du jeu</h3>
        <p className="text-gray-700 mb-4">
          Le but du jeu est de déplacer toutes les cartes sur les quatre piles de fondation, triées par couleur et par ordre croissant (de l'As au Roi).
        </p>
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">Raccourcis clavier</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li><span className="font-semibold">Echap</span>: Fermer le popup</li>
          <li><span className="font-semibold">N</span>: Nouvelle partie</li>
          <li><span className="font-semibold">R</span>: Recommencer la partie</li>
          <li><span className="font-semibold">H</span>: Afficher l'aide</li>
        </ul>
      </div>
      <div className="flex gap-4 w-full mt-4">
        <button
          onClick={onClose}
          className="btn btn-dash btn-secondary flex-1"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default HelpPopup;