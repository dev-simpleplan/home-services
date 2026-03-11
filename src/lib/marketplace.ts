import {
  AirVent,
  Bug,
  Droplets,
  Hammer,
  LucideIcon,
  Paintbrush,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

export const BOOKING_DRAFT_STORAGE_KEY = "home-services.booking-draft";

export const serviceIconMap: Record<string, LucideIcon> = {
  "air-vent": AirVent,
  bug: Bug,
  droplets: Droplets,
  hammer: Hammer,
  paintbrush: Paintbrush,
  sparkles: Sparkles,
  wrench: Wrench,
  zap: Zap,
};

export const serviceIconOptions = [
  { value: "zap", label: "Electric" },
  { value: "droplets", label: "Plumbing" },
  { value: "sparkles", label: "Cleaning" },
  { value: "air-vent", label: "Cooling" },
  { value: "paintbrush", label: "Painting" },
  { value: "bug", label: "Pest Control" },
  { value: "wrench", label: "Repair" },
  { value: "hammer", label: "Carpentry" },
];

export const getServiceIcon = (iconKey: string) => serviceIconMap[iconKey] ?? Wrench;

export const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
