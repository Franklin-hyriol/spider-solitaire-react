import { memo } from "react";
import type { IconType } from "react-icons";

export const StatIcon = memo(({ icon: Icon }: { icon: IconType }) => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
    <Icon className="h-4 w-4" />
  </div>
));
