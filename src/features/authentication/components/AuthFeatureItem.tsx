import { FC, ReactElement, ComponentType } from "react";

interface AuthFeatureItemProps {
  icon: ComponentType<{ className?: string }>;
  text: string;
}

export const AuthFeatureItem: FC<AuthFeatureItemProps> = ({
  icon: Icon,
  text,
}): ReactElement => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/20">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm text-muted">{text}</span>
    </div>
  );
};
