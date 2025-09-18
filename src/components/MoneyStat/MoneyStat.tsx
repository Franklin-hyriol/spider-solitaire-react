import Stat from "../Stat/Stat";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useGameStatsStore } from "../../stores/GameStatsStore";

export default function MoneyStat() {
  const money = useGameStatsStore((state) => state.money);

  const formattedMoney = `${money.toString().padStart(6, "0")}$`;

  return (
    <Stat icon={FaRegMoneyBillAlt} label="Argent actuel" value={formattedMoney} />
  );
}