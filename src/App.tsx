import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useColumnsStore } from "./stores/ColumnStore";
import { useGameStatsStore } from "./stores/GameStatsStore";
import { GameSurface } from "./components/GameSurface/GameSurface";

function App() {
  const initGame = useColumnsStore((state) => state.initGame);
  const columns = useColumnsStore((state) => state.columns);
  const startChrono = useGameStatsStore((state) => state.start);

  // Initialise une nouvelle partie si aucune n'est déjà en cours.
  useEffect(() => {
    if (columns.length === 0) {
      initGame();
      startChrono();
    }
  }, [initGame, columns.length, startChrono]);

  return (
    <>
      <Header />
      <GameSurface />
    </>
  );
}

export default App;