import React from "react";
import {
  Truck,
  Layers,
  Compass,
  Wrench,
  Zap,
  Building2,
  Disc,
  ArrowUpRight,
  Scissors,
  Flame,
  Cpu,
  Hammer,
  HardHat,
  LucideProps,
} from "lucide-react";

interface CategoryIconProps extends LucideProps {
  name: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, ...props }) => {
  switch (name) {
    case "Truck":
      return <Truck {...props} />;
    case "Layers":
      return <Layers {...props} />;
    case "Compass":
      return <Compass {...props} />;
    case "Wrench":
      return <Wrench {...props} />;
    case "Zap":
      return <Zap {...props} />;
    case "Building2":
      return <Building2 {...props} />;
    case "Disc":
      return <Disc {...props} />;
    case "ArrowUpRight":
      return <ArrowUpRight {...props} />;
    case "Scissors":
      return <Scissors {...props} />;
    case "Flame":
      return <Flame {...props} />;
    case "Cpu":
      return <Cpu {...props} />;
    case "Hammer":
      return <Hammer {...props} />;
    case "HardHat":
      return <HardHat {...props} />;
    default:
      return <Wrench {...props} />;
  }
};
