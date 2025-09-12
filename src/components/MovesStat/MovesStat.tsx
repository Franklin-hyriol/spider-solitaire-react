import Stat from "../Stat/Stat";
import { HiOutlineHashtag } from "react-icons/hi";
import { useGameStatsStore } from "../../stores/GameStatsStore";

export default function MovesStat() {
  const moves = useGameStatsStore((state) => state.moves);

  const formattedMoves = moves.toString().padStart(4, "0");

  return (
    <Stat icon={HiOutlineHashtag} label="Coups joués" value={formattedMoves} />
  );
}
