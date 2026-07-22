import { FC, ReactElement, ReactNode } from "react";

interface ContactInfoItemProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

export const ContactInfoItem: FC<ContactInfoItemProps> = ({
  icon,
  label,
  value,
}): ReactElement => {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
};
