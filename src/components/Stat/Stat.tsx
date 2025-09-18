import type { StatProps } from "../../types";
import { StatIcon } from "../StatIcon/StatIcon";
import { StatLabel } from "../StatLabel/StatLabel";
import { StatValue } from "../StatValue/StatValue";

export default function Stat({ icon, label, value }: StatProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-base-200 p-2 shadow-sm">
      <StatIcon icon={icon} />
      <div className="flex flex-col">
        <StatLabel label={label} />
        <StatValue value={value} />
      </div>
    </div>
  );
}
