import Stat from "../Stat/Stat";
import { HiOutlineQuestionMarkCircle, HiOutlineLightBulb } from "react-icons/hi2";
import { useGameStatsStore } from "../../stores/GameStatsStore";

export default function HintStat() {
  const hints = useGameStatsStore((state) => state.hints);

  const formattedHints = hints.toString().padStart(4, "0");

  return (
    <div className="relative">
      <Stat icon={HiOutlineQuestionMarkCircle} label="Indices" value={formattedHints} />
      <button
        className="btn btn-primary btn-sm btn-circle absolute top-2.5 right-2"
        aria-label="Demander un indice"
        title="Demander un indice"
        onClick={() => {}}
      >
        <HiOutlineLightBulb />
      </button>
    </div>
  );
}
