import Header from "./components/Header/Header";
import { useEffect, useRef } from "react";
import { useColumnsStore } from "./stores/ColumnStore";
import { useGameStatsStore } from "./stores/GameStatsStore";
import { GameSurface } from "./components/GameSurface/GameSurface";
import { usePopupStore } from "./stores/PopupStore";
import PopupManager from "./components/PopupManager/PopupManager";
import "./app.css";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

function App() {
  useKeyboardShortcuts();
  const columns = useColumnsStore((state) => state.columns);
  const isGameWon = useColumnsStore((state) => state.isGameWon);
  const isGameOver = useColumnsStore((state) => state.isGameOver);

  const initialColumnsLength = useRef(columns.length);
  const pauseChrono = useGameStatsStore((state) => state.pause);
  const resumeChrono = useGameStatsStore((state) => state.resume);

  const popupType = usePopupStore((state) => state.type);
  const openPopup = usePopupStore((state) => state.open);

  // Logique de démarrage de l'application
  useEffect(() => {
    // Si des colonnes existent, une partie est en cours (chargée depuis le localStorage)
    if (initialColumnsLength.current > 0) {
      openPopup("pause");
    } else {
      // Aucune partie en cours, on lance une nouvelle partie
      openPopup("new");
    }
  }, [openPopup]);

  // Gère la pause du chronomètre en fonction de l'état des popups
  useEffect(() => {
    if (popupType) {
      pauseChrono();
    } else {
      resumeChrono();
    }
  }, [popupType, pauseChrono, resumeChrono]);

  // Ouvre le popup de victoire quand la partie est gagnée
  useEffect(() => {
    if (isGameWon) {
      openPopup("gameWon");
    }
  }, [isGameWon, openPopup]);

  // Ouvre le popup de game over quand la partie est perdue
  useEffect(() => {
    if (isGameOver) {
      openPopup("gameOver");
    }
  }, [isGameOver, openPopup]);

  return (
    <>
      <Header
        onRestart={() => openPopup("confirmRestart")}
        onHelp={() => openPopup("help")}
      />
      <GameSurface />
      <PopupManager />
    </>
  );
}

export default App;
