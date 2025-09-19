import { RiRestartLine, RiAddCircleLine } from "react-icons/ri";

interface IGameOverProps {
  onRestart: () => void;
  onNewGame: () => void;
}

export default function GameOver({ onRestart, onNewGame }: IGameOverProps) {
  return (
    <div className="max-w-md w-[448px] h-fit p-8 flex flex-col items-center gap-4">
      <h2 className="w-full text-center text-3xl font-bold text-red-800 mb-4 pb-4 border-b-4 border-red-600">
        Game Over
      </h2>
      <p className="text-center text-lg mb-6">Aucun mouvement possible.</p>

      <div className="flex gap-4 w-full">
        <button
          onClick={onRestart}
          className="btn btn-dash btn-secondary flex-1"
        >
          <RiRestartLine />
          Recommencer
        </button>
        <button
          onClick={onNewGame}
          className="btn btn-dash btn-primary flex-1"
        >
          <RiAddCircleLine />
          Nouvelle Partie
        </button>
      </div>
    </div>
  );
}
