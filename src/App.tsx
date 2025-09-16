import Header from "./components/Header/Header";
import { useEffect } from "react";
import { useColumnsStore } from "./stores/ColumnStore";
import { useGameStatsStore } from "./stores/GameStatsStore";
import { GameSurface } from "./components/GameSurface/GameSurface";
import NewGame from "./components/NewGame/NewGame";
import Popup from "./components/Popup/Popup";
import { usePopupStore } from "./stores/PopupStore";
import PauseGame from "./components/PauseGame/PauseGame";
import { Level } from "./types";

function App() {
  const { initGame, columns } = useColumnsStore();
  const { start: startChrono, pause: pauseChrono, resume: resumeChrono } = useGameStatsStore();
  const { type: popupType, open: openPopup, close: closePopup } = usePopupStore();

  // Logique de démarrage de l'application
  useEffect(() => {
    // Si des colonnes existent, une partie est en cours (chargée depuis le localStorage)
    if (columns.length > 0) {
      openPopup("pause");
    } else {
      // Aucune partie en cours, on lance une nouvelle partie
      openPopup("new");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Le tableau vide assure que cela ne s'exécute qu'une seule fois au montage

  // Gère la pause du chronomètre en fonction de l'état des popups
  useEffect(() => {
    if (popupType) {
      pauseChrono();
    } else {
      resumeChrono();
    }
  }, [popupType, pauseChrono, resumeChrono]);

  const handlePlay = (level: Level) => {
    // initGame(level); // Bientôt...
    startChrono();
    closePopup();
  };

  const handleContinue = () => {
    closePopup();
  };

  return (
    <>
      <Header />
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
        <PauseGame onContinue={handleContinue} />
      </Popup>
    </>
  );
}

export default App;