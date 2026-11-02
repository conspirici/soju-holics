import Image from "next/image";
import logo from "@/assets/logo.png";

export function Logo({ size = 40, className }: { size?: number; className?: string }) {
  return <Image src={logo} alt="" width={size} height={size} className={className} />;
}
