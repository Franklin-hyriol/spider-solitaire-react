import Header from "./components/Header/Header";
import { useEffect, useRef } from "react";
import { useColumnsStore } from "./stores/ColumnStore";
import { useGameStatsStore } from "./stores/GameStatsStore";
import { GameSurface } from "./components/GameSurface/GameSurface";
import NewGame from "./components/NewGame/NewGame";
import Popup from "./components/Popup/Popup";
import { usePopupStore } from "./stores/PopupStore";
import PauseGame from "./components/PauseGame/PauseGame";
import { Level } from "./types";

import ConfirmAction from "./components/ConfirmAction/ConfirmAction";

import GameWon from "./components/GameWon/GameWon";
import HelpPopup from "./components/HelpPopup/HelpPopup";

function App() {
  const { initGame, columns, restartGame, isGameWon } = useColumnsStore();
  const initialColumnsLength = useRef(columns.length);
  const { start: startChrono, pause: pauseChrono, resume: resumeChrono, reset: resetStats } = useGameStatsStore();
  const { type: popupType, open: openPopup, close: closePopup } = usePopupStore();

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

  const handlePlay = (level: Level) => {
    resetStats();
    initGame(level);
    startChrono();
    closePopup();
  };

  // Exécute le redémarrage
  const executeRestart = () => {
    resetStats();
    restartGame();
    startChrono();
    closePopup(); // Ferme le popup de confirmation
  };

  return (
    <>
      <Header onRestart={() => openPopup("confirmRestart")} onHelp={() => openPopup("help")} />
      <GameSurface />

      {/* Popup pour une nouvelle partie */}
      <Popup
        open={popupType === "new"}
        setOpen={closePopup}
        closeOnOverlayClick={false} // On ne peut pas fermer en cliquant à côté
      >
        <NewGame onCancel={closePopup} onPlay={handlePlay} />
      </Popup>

      {/* Popup pour le jeu en pause */}
      <Popup
        open={popupType === "pause"}
        setOpen={closePopup}
        closeOnOverlayClick={true}
      >
        <PauseGame
          onContinue={closePopup}
          onRestart={() => openPopup("confirmRestart")}
          onNewGame={() => openPopup("new")}
        />
      </Popup>

      {/* Popup de confirmation pour recommencer */}
      <Popup
        open={popupType === "confirmRestart"}
        setOpen={closePopup}
        closeOnOverlayClick={true}
      >
        <ConfirmAction
          title="Recommencer la partie ?"
          message="Êtes-vous sûr ? Votre progression sur cette partie sera perdue."
          onConfirm={executeRestart}
          onCancel={closePopup}
        />
      </Popup>

      {/* Popup de victoire */}
      <Popup
        open={popupType === "gameWon"}
        setOpen={closePopup}
        closeOnOverlayClick={false}
      >
        <GameWon
          onNewGame={() => openPopup("new")}
          onRestart={() => openPopup("confirmRestart")}
        />
      </Popup>

      {/* Popup d'aide */}
      <Popup
        open={popupType === "help"}
        setOpen={closePopup}
        closeOnOverlayClick={true}
      >
        <HelpPopup onClose={closePopup} />
      </Popup>
    </>
  );
}

export default App;