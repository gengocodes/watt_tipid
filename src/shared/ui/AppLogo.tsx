import Image from "next/image";
import logoImg from "../../../public/logo.jpg";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  className?: string;
  size?: number;
}

export function AppLogo({ className, size = 40 }: Readonly<AppLogoProps>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl overflow-hidden shrink-0 border border-emerald-500/20 bg-card shadow-2xs",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={logoImg}
        alt="WattTipid Logo"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
