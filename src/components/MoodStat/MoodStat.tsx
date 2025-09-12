import Stat from "../Stat/Stat";
import { FaRegSmile } from "react-icons/fa";
import { useGameStatsStore } from "../../stores/GameStatsStore";

export default function MoodStat() {
  const mood = useGameStatsStore((state) => state.mood);

  return (
    <Stat icon={FaRegSmile} label="État d’esprit" value={mood} />
  );
}
