import { useGameStatsStore } from "../../stores/GameStatsStore";
import { useColumnsStore } from "../../stores/ColumnStore";
import { Level } from "../../types";

const levelDisplay: Record<Level, string> = {
  easy: "1 couleur",
  medium: "2 couleurs",
  hard: "4 couleurs",
};

type GameWonProps = {
  onNewGame: () => void;
  onRestart: () => void;
};

export default function GameWon({ onNewGame, onRestart }: GameWonProps) {
  const elapsedTime = useGameStatsStore((state) => state.elapsedTime);
  const moves = useGameStatsStore((state) => state.moves);
  const money = useGameStatsStore((state) => state.money);
  const level = useColumnsStore((state) => state.level);

  // Formate le temps pour l'affichage
  const hrs = Math.floor(elapsedTime / 3600).toString().padStart(2, "0");
  const mins = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, "0");
  const secs = (elapsedTime % 60).toString().padStart(2, "0");

  return (
    <div className="max-w-md w-[var(--apx-448)] h-fit p-8 flex flex-col items-center gap-4">
      <h2 className="w-full text-center text-3xl font-bold text-success mb-4 pb-4 border-b-4 border-success">
        🎉 Félicitations ! 🎉
      </h2>

      <p className="text-center text-lg mb-6">Vous avez gagné la partie ! Voici vos statistiques :</p>

      <div className="stats stats-vertical shadow-lg w-full bg-base-200 mb-6">
        <div className="stat">
          <div className="stat-title">Temps</div>
          <div className="stat-value">{`${hrs}:${mins}:${secs}`}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Coups</div>
          <div className="stat-value">{moves}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Argent</div>
          <div className="stat-value">{money}$</div>
        </div>
        <div className="stat">
          <div className="stat-title">Niveau</div>
          <div className="stat-value">{levelDisplay[level]}</div>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button onClick={onRestart} className="btn btn-dash btn-secondary flex-1">
          Recommencer
        </button>
        <button onClick={onNewGame} className="btn btn-dash btn-primary flex-1">
          Nouvelle Partie
        </button>
      </div>
    </div>
  );
}
