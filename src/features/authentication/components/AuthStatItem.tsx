import { FC, ReactElement } from "react";

interface AuthStatItemProps {
  value: string;
  label: string;
}

export const AuthStatItem: FC<AuthStatItemProps> = ({
  value,
  label,
}): ReactElement => {
  return (
    <div>
      <p className="text-2xl font-bold text-muted">{value}</p>
      <p className="text-xs text-chart-1">{label}</p>
    </div>
  );
};
