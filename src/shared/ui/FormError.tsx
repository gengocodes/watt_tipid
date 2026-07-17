import { FC } from "react";

interface FormErrorProps {
  message: string | null;
}

export const FormError: FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
      {message}
    </div>
  );
};
