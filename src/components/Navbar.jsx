
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "WORK", href: "#events" },
  { label: "APPROACH", href: "#story" },
  { label: "ABOUT", href: "#gallery" },
  { label: "INQUIRE", href: "#rsvp" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="luxury-header" aria-label="Main navigation">
      <Link href="#home" className="luxury-brand" onClick={closeMenu}>
        <span className="luxury-brand-name">AFTERFORM</span>
        <span className="luxury-brand-studio">studio</span>
      </Link>

      <div className="luxury-links">
        {links.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <Link href="#rsvp" className="luxury-talk" onClick={closeMenu}>
        LET’S TALK
        <ArrowUpRight size={16} strokeWidth={1.7} />
      </Link>

      <button
        className="luxury-menu"
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={21} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="luxury-mobile">
          {links.map((link) => (
            <Link key={link.label} href={link.href} onClick={closeMenu}>
              <span>{link.label}</span>
              <ArrowUpRight size={15} />
            </Link>
          ))}

          <Link href="#rsvp" onClick={closeMenu}>
            <span>LET’S TALK</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      )}
    </nav>
  );
}
