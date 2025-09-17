type PauseGameProps = {
  onContinue: () => void;
  onRestart: () => void;
  onNewGame: () => void;
};

export default function PauseGame({ onContinue, onRestart, onNewGame }: PauseGameProps) {
  return (
    <div className="max-w-md w-[448px] h-fit p-8 flex flex-col items-center gap-4">
      <h2 className="w-full text-center text-3xl font-bold text-emerald-800 mb-4 pb-4 border-b-4 border-emerald-600">Jeu en Pause</h2>

      <div className="flex gap-1 mb-6">
        <div className="w-8 h-12 bg-red-500 rounded border-2 border-gray-800 shadow-lg transform -rotate-12"></div>
        <div className="w-8 h-12 bg-gray-800 rounded border-2 border-white shadow-lg transform rotate-6"></div>
        <div className="w-8 h-12 bg-red-500 rounded border-2 border-gray-800 shadow-lg transform -rotate-3"></div>
      </div>

      <button onClick={onContinue} className="btn btn-dash btn-primary w-full">Reprendre</button>
      <button onClick={onRestart} className="btn btn-dash btn-secondary w-full">Recommencer</button>
      <button onClick={onNewGame} className="btn btn-dash btn-tertiary w-full">Nouvelle Partie</button>
    </div>
  );
}
