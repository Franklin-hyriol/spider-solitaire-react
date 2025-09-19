import { useColumnsStore } from "../../stores/ColumnStore";
import { usePopupStore } from "../../stores/PopupStore";
import ConfirmAction from "../ConfirmAction/ConfirmAction";
import GameOver from "../GameOver/GameOver";
import GameWon from "../GameWon/GameWon";
import HelpPopup from "../HelpPopup/HelpPopup";
import NewGame from "../NewGame/NewGame";
import PauseGame from "../PauseGame/PauseGame";
import Popup from "../Popup/Popup";
import { useGameStatsStore } from "../../stores/GameStatsStore";
import { Level } from "../../types";

function PopupManager() {
  const initGame = useColumnsStore((state) => state.initGame);
  const restartGame = useColumnsStore((state) => state.restartGame);

  const startChrono = useGameStatsStore((state) => state.start);
  const resetStats = useGameStatsStore((state) => state.reset);

  const popupType = usePopupStore((state) => state.type);
  const openPopup = usePopupStore((state) => state.open);
  const closePopup = usePopupStore((state) => state.close);

  const handlePlay = (level: Level) => {
    resetStats();
    initGame(level);
    startChrono();
    closePopup();
  };

  const executeRestart = () => {
    resetStats();
    restartGame();
    startChrono();
    closePopup();
  };

  return (
    <>
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
          onRestart={() => executeRestart()}
        />
      </Popup>

      {/* Popup de Game Over */}
      <Popup
        open={popupType === "gameOver"}
        setOpen={closePopup}
        closeOnOverlayClick={false}
      >
        <GameOver
          onNewGame={() => openPopup("new")}
          onRestart={() => executeRestart()}
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

export default PopupManager;
