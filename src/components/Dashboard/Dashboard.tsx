import { FaSlidersH } from "react-icons/fa";
// import TimerStat from "../TimerStat/TimerStat";
import MoneyStat from "../MoneyStat/MoneyStat";
import MovesStat from "../MovesStat/MovesStat";
import MoodStat from "../MoodStat/MoodStat";
import CompletedSetsStat from "../CompletedSetsStat/CompletedSetsStat";

export default function Dashboard() {
  return (
    <div className="w-96 h-fit bg-blue-200 flex flex-col gap-2 p-3 absolute bottom-5 left-[50%] transform-[translateX(-50%)] rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Tableau de bord</span>
        <div className="flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-xs shadow">
          <FaSlidersH className="h-3 w-3" />
          <span>Niveau : 2 couleurs</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        <MoneyStat />
        <MovesStat />
        {/* <TimerStat /> */}
        <CompletedSetsStat />
        <MoodStat />
      </div>
    </div>
  );
}