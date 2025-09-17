import Stat from "../Stat/Stat";
import { HiArrowUturnLeft, HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { useGameStatsStore } from "../../stores/GameStatsStore";
import { useUndoStore } from "../../stores/UndoStore";

export default function UndoStat() {
  const undos = useGameStatsStore((state) => state.undos);
  const undo = useUndoStore((state) => state.undo);

  const formattedUndos = undos.toString().padStart(4, "0");

  return (
    <div className="relative">
      <Stat icon={HiArrowUturnLeft} label="Annulations" value={formattedUndos} />
      <button
        className="btn btn-primary btn-sm btn-circle absolute top-2.5 right-2"
        aria-label="Annuler le dernier coup"
        title="Annuler le dernier coup"
        onClick={undo}
      >
        <HiOutlineArrowUturnLeft />
      </button>
    </div>
  );
}
