import { useState } from "react";
import Popup from "../Popup/Popup";

export default function PauseGame() {
  const [open, setOpen] = useState(true);

  const onConfirm = () => {
    console.log("Action confirmée !");
    setOpen(false); // ferme le popup
  };

  const onCancel = () => {
    setOpen(false); // ferme le popup
  };

  return (
    <Popup open={open} setOpen={setOpen} closeOnOverlayClick={true}>
      <div className="bg-white p-6 rounded-xl flex flex-col gap-4">
        <p>Es-tu sûr de vouloir continuer ?</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onConfirm}
          >
            Confirmer
          </button>
        </div>
      </div>
    </Popup>
  );
}
