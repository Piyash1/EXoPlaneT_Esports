import Link from "next/link";
import { Rocket, Twitter, Instagram, Youtube, Twitch } from "lucide-react";
import FooterBackground from "@/components/teams/FooterBackground";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-16 pb-8 overflow-hidden">
      <FooterBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-xl tracking-wider text-white">
                EXO<span className="text-primary">PLANET</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premier esports organization dominating the competitive scene
              across multiple titles.
              <br />
              <span className="text-primary font-medium mt-2 block">
                Unleash the Champion.
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/teams"
                  className="hover:text-primary transition-colors"
                >
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="hover:text-primary transition-colors"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  href="/stats"
                  className="hover:text-primary transition-colors"
                >
                  Stats
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/tryouts"
                  className="hover:text-primary transition-colors"
                >
                  Join Tryouts
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-[#E1306C] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-[#6441a5] hover:text-white transition-all duration-300"
              >
                <Twitch className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-[#FF0000] hover:text-white transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground">
                Email: <span className="text-white">contact@exoplanet.gg</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Exoplanet Esports. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            Designed for Champions.
          </p>
        </div>
      </div>
    </footer>
  );
}
