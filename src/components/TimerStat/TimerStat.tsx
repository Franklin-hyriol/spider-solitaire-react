import { useEffect } from "react";
import Stat from "../Stat/Stat";
import { MdTimer } from "react-icons/md";
import { useGameStatsStore } from "../../stores/GameStatsStore";

export default function TimerStat() {
  // Récupération des états et actions depuis le store
  const elapsedTime = useGameStatsStore((state) => state.elapsedTime);
  const isRunning = useGameStatsStore((state) => state.isRunning);
  const incrementTime = useGameStatsStore((state) => state.incrementTime);

  // Lance un intervalle qui incrémente le temps chaque seconde si le jeu est en cours
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isRunning) {
      interval = setInterval(() => {
        incrementTime(); // Incrémente le temps dans le store
      }, 1000);
    }

    // Arrête l'intervalle lorsque le composant est démonté ou que le jeu est en pause
    return () => clearInterval(interval);
  }, [isRunning, incrementTime]);

  // Formate le temps total en secondes au format HH:MM:SS
  const hrs = Math.floor(elapsedTime / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((elapsedTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (elapsedTime % 60).toString().padStart(2, "0");

  return (
    <Stat
      icon={MdTimer}
      label="Temps écoulé"
      value={`${hrs}:${mins}:${secs}`}
    />
  );
}