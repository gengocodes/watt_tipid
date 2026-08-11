import { FC, ReactElement, SelectHTMLAttributes } from "react";
import { Label } from "@/components/ui/label";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: FormSelectOption[];
  placeholder?: string;
  isLoading?: boolean;
}

export const FormSelect: FC<FormSelectProps> = ({
  label,
  error,
  options,
  placeholder = "Select an option",
  isLoading = false,
  className,
  id,
  value,
  disabled,
  ...props
}): ReactElement => {
  const hasValue = value !== undefined && value !== "";

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {isLoading && (
          <Loader2 className="inline-block ml-1.5 h-3 w-3 animate-spin text-primary align-text-bottom" />
        )}
      </Label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled || isLoading}
          className={cn(
            "h-10 w-full rounded-md border border-primary/20 bg-muted px-3 py-2 text-sm outline-none transition-colors",
            "focus-visible:border-sidebar-primary focus-visible:ring-1 focus-visible:ring-sidebar-primary",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "appearance-none cursor-pointer pr-9",
            hasValue ? "text-foreground" : "text-muted-foreground",
            className
          )}
          {...props}
        >
          <option value="" disabled className="text-muted-foreground">
            {isLoading ? "Loading..." : placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
