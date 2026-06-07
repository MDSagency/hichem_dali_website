import {
  Anchor,
  Award,
  Banknote,
  Briefcase,
  Building2,
  Clock,
  FileText,
  Gavel,
  Gem,
  Home,
  Landmark,
  Lock,
  Receipt,
  Scale,
  Shield,
  Ship,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Anchor,
  Award,
  Banknote,
  Briefcase,
  Building2,
  Clock,
  FileText,
  Gavel,
  Gem,
  Home,
  Landmark,
  Lock,
  Receipt,
  Scale,
  Shield,
  Ship,
  Users,
  Zap,
};

export function getIcon(name?: string): LucideIcon {
  if (!name) return Scale;
  return iconMap[name] ?? Scale;
}

export const iconOptions = Object.keys(iconMap).sort();
