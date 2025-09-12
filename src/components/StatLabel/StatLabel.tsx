import { memo } from "react";

export const StatLabel = memo(({ label }: { label: string }) => (
  <span className="text-xs text-neutral-600">{label}</span>
));