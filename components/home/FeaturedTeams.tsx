"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { featuredTeams } from "@/lib/data";

export default function FeaturedTeams() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              OUR{" "}
              <span className="text-gradient-primary drop-shadow-[0_0_15px_rgba(0,255,200,0.4)]">
                ARSENAL
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Elite squads deployed across the most competitive battlegrounds in
              the world.
            </p>
          </motion.div>

          <Link href="/teams" className="inline-block">
            <Button variant="link" className="text-primary text-lg group">
              View All Rosters{" "}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTeams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="h-full border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col group relative transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,255,200,0.1)]">
                {/* Tech Corners (HUD Effect) */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors z-20" />

                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                  {/* Floating Rank Badge */}
                  <div className="absolute top-4 right-4 backdrop-blur-md bg-black/50 border border-white/10 px-3 py-1 rounded-sm flex items-center gap-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,200,0.8)]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {team.rank}
                    </span>
                  </div>
                </div>

                <CardContent className="flex-1 pt-6 relative">
                  {/* Scanning Line Effect */}
                  <div className="absolute top-0 left-0 w-full h-px bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(0,255,200,0.5)]" />

                  <div className="mb-6 relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors drop-shadow-md">
                      {team.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{team.game}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-sm p-3 border border-white/5 flex items-center gap-3 transition-colors group-hover:bg-white/10 group-hover:border-primary/20">
                      <div className="p-2 rounded-sm bg-primary/10 text-primary">
                        <Crosshair className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white leading-none">
                          {team.wins}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase mt-1">
                          Victories
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-sm p-3 border border-white/5 flex items-center gap-3 transition-colors group-hover:bg-white/10 group-hover:border-primary/20">
                      <div className="p-2 rounded-sm bg-secondary/10 text-secondary">
                        {/* Generic User Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-users"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white leading-none">
                          {team.members}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase mt-1">
                          Roster
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className="p-6 pt-0 relative z-10">
                  <Button className="w-full bg-primary text-black hover:bg-primary/90 hover:scale-[1.02] border-none transition-all duration-300 group/btn font-bold tracking-wide">
                    <span className="mr-2">View Team Profile</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
