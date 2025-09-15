import { useState } from "react";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";
import { Level } from "../../types";

type NewGameProps = {
  onCancel: () => void;
  onPlay: (level: Level) => void;
};



export default function NewGame({ onCancel, onPlay }: NewGameProps) {
  const [level, setLevel] = useState<Level>("easy");

  return (
    <div className="max-w-md w-[448px] h-fit p-8 flex flex-col items-center gap-4">
      <h2 className="w-full text-center text-3xl font-bold text-emerald-800 mb-4 pb-4 border-b-4 border-emerald-600">
        Nouvelle Partie
      </h2>

      <div className="flex flex-col gap-4 w-full mb-4">
        <h3 className="text-lg font-semibold text-center">
          Choisissez votre niveau
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setLevel("easy")}
            className={`btn w-full flex justify-center items-center gap-2 ${
              level === "easy"
                ? "btn-primary"
                : "btn-outline btn-primary"
            }`}
          >
            <BsFillSuitSpadeFill
              size={20}
              className={level === "easy" ? "text-white" : "text-black"}
            />
          </button>

          <button
            onClick={() => setLevel("medium")}
            className={`btn w-full flex justify-center items-center gap-2 ${
              level === "medium" ? "btn-success" : "btn-outline btn-success"
            }`}
          >
            <BsFillSuitSpadeFill
              size={20}
              className={level === "medium" ? "text-white" : "text-black"}
            />
            <BsFillSuitDiamondFill
              size={20}
              className={level === "medium" ? "text-white" : "text-red-600"}
            />
          </button>

          <button
            onClick={() => setLevel("hard")}
            className={`btn w-full flex justify-center items-center gap-2 ${
              level === "hard" ? "btn-error" : "btn-outline btn-error"
            }`}
          >
            <BsFillSuitSpadeFill
              size={16}
              className={level === "hard" ? "text-white" : "text-black"}
            />
            <BsFillSuitDiamondFill
              size={16}
              className={level === "hard" ? "text-white" : "text-red-600"}
            />
            <BsFillSuitClubFill
              size={16}
              className={level === "hard" ? "text-white" : "text-black"}
            />
            <BsFillSuitHeartFill
              size={16}
              className={level === "hard" ? "text-white" : "text-red-600"}
            />
          </button>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button
          onClick={onCancel}
          className="btn btn-dash btn-secondary flex-1"
        >
          Annuler
        </button>
        <button
          onClick={() => onPlay(level)}
          className="btn btn-dash btn-primary flex-1"
        >
          Jouer
        </button>
      </div>
    </div>
  );
}