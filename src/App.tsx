import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useColumnsStore } from "./stores/ColumnStore";
import { Board } from "./components/Board/Board";
import { useGameStatsStore } from "./stores/GameStatsStore";
import Dashboard from "./components/Dashboard/Dashboard";
import Stock from "./components/Stock/Stock";
import Foundation from "./components/Foundation/Foundation";

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
      <main className="bg-green-300 h-[calc(100vh-32px)] w-full relative">
        <div className="py-4 px-8 h-full">
          <Board />
        </div>
        <Foundation />
        <Dashboard />
        <Stock />
      </main>
    </>
  );
}

export default App;