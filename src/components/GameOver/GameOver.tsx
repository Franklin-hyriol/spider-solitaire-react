import { RiRestartLine, RiAddCircleLine } from "react-icons/ri";

interface IGameOverProps {
  onRestart: () => void;
  onNewGame: () => void;
}

export default function GameOver({ onRestart, onNewGame }: IGameOverProps) {
  return (
    <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-4xl font-bold text-red-500 mb-4">Game Over</h2>
      <p className="text-gray-300 mb-8">Aucun mouvement possible.</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="btn btn-warning btn-lg flex items-center gap-2"
        >
          <RiRestartLine />
          Recommencer
        </button>
        <button
          onClick={onNewGame}
          className="btn btn-primary btn-lg flex items-center gap-2"
        >
          <RiAddCircleLine />
          Nouvelle Partie
        </button>
      </div>
    </div>
  );
}
