import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { useColumnsStore } from "./stores/ColumnStore";
import { useGameStatsStore } from "./stores/GameStatsStore";
import { GameSurface } from "./components/GameSurface/GameSurface";
import NewGame from "./components/NewGame/NewGame";
import Popup from "./components/Popup/Popup";
import { PopupType } from "./types";

function App() {
  const initGame = useColumnsStore((state) => state.initGame);
  const columns = useColumnsStore((state) => state.columns);
  const startChrono = useGameStatsStore((state) => state.start);

  const [open, setOpen] = useState<PopupType>(false);

  // Initialise une nouvelle partie si aucune n'est déjà en cours.
  useEffect(() => {
    if (columns.length === 0) {
      initGame();
      startChrono();
    }
  }, [initGame, columns.length, startChrono]);

  return (
    <>
      <Header setOpen={setOpen} />
      <GameSurface />

      <Popup
        open={open === "new"}
        setOpen={setOpen}
        closeOnOverlayClick={true}
      >
        <NewGame onCancel={() => setOpen(false)} onPlay={() => {}} />
      </Popup>
    </>
  );
}

export default App;
