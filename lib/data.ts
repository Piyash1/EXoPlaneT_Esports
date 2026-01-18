import { Trophy, Users, Gamepad2, Target, LucideIcon } from "lucide-react";

export interface Team {
  id: number;
  name: string;
  game: string;
  image: string;
  members: number;
  wins: number;
  rank: string;
}

export interface Achievement {
  id: string | number;
  title: string;
  date: string | Date;
  team: string | { name: string };
  description?: string | null;
}

export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const featuredTeams: Team[] = [
  {
    id: 1,
    name: "Exoplanet Main",
    game: "PUBG Mobile (Emulator)",
    image: "/team-pubg.png",
    members: 4,
    wins: 28,
    rank: "Tier 1",
  },
  {
    id: 2,
    name: "Exoplanet Elite",
    game: "PUBG Mobile (Emulator)",
    image: "/team-pubg.png", // Using same asset as they are all PUBG teams
    members: 4,
    wins: 15,
    rank: "Tier 2",
  },
  {
    id: 3,
    name: "Exoplanet Academy",
    game: "PUBG Mobile (Emulator)",
    image: "/team-pubg.png",
    members: 5,
    wins: 7,
    rank: "Rising Stars",
  },
];

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "PMCO Regional Champions",
    date: "2024",
    team: "Alpha Squad",
  },
  {
    id: 2,
    title: "Valorant Challengers Runner-up",
    date: "2024",
    team: "Nova Force",
  },
  {
    id: 3,
    title: "Apex Global Series Finalist",
    date: "2023",
    team: "Predators",
  },
];

export const statsData: StatItem[] = [
  { label: "Active Players", value: "24", icon: Users, color: "text-primary" },
  { label: "Medals Won", value: "35", icon: Trophy, color: "text-secondary" },
  { label: "Games Dominated", value: "5", icon: Gamepad2, color: "text-white" },
  { label: "Global Rank", value: "#14", icon: Target, color: "text-primary" },
];
