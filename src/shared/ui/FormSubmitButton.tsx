import { FC, ReactElement, ReactNode, ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FormSubmitButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

export const FormSubmitButton: FC<FormSubmitButtonProps> = ({
  isLoading = false,
  loadingText,
  children,
  className,
  disabled,
  ...props
}): ReactElement => {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={cn("w-full py-7 rounded-xl shadow-lg text-md", className)}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
};
