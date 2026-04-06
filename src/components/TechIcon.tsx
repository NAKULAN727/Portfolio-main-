"use client";
import { Icon } from "@iconify/react";

interface TechIconProps {
  icon: string;   // Iconify icon ID e.g. "devicon:react"
  size?: number;  // px, default 32
  color?: string; // override fill colour
  className?: string;
}

export default function TechIcon({ icon, size = 32, color, className = "" }: TechIconProps) {
  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      style={color ? { color } : undefined}
      className={className}
    />
  );
}
