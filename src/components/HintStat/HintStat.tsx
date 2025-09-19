import Stat from "../Stat/Stat";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { FaRegLightbulb } from "react-icons/fa6";
import { useGameStatsStore } from "../../stores/GameStatsStore";

export default function HintStat() {
  const hints = useGameStatsStore((state) => state.hints);
  const showHint = useGameStatsStore((state) => state.showHint);

  const formattedHints = hints.toString().padStart(4, "0");

  return (
    <div className="relative">
      <Stat icon={HiOutlineQuestionMarkCircle} label="Indices" value={formattedHints} />
      <button
        className="btn btn-primary btn-sm btn-circle absolute top-2.5 right-2"
        aria-label="Demander un indice"
        title="Demander un indice"
        onClick={showHint}
      >
        <FaRegLightbulb />
      </button>
    </div>
  );
}
