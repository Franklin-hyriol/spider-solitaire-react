import Stat from "../Stat/Stat";
import { BsListCheck } from "react-icons/bs";
import { useGameStatsStore } from "../../stores/GameStatsStore";

export default function CompletedSetsStat() {
  const completedSets = useGameStatsStore((state) => state.completedSets);

  return (
    <Stat
      icon={BsListCheck}
      label="Suites complétées"
      value={`${completedSets} / 8`}
    />
  );
}
