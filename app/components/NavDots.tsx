"use client";

import Link from "next/link";

const sections = ["hero", "about", "skills", "projects", "experience", "contact"] as const;

export default function NavDots() {
  return (
    <nav aria-label="Section navigation" className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden sm:block">
      <ul className="flex flex-col gap-2">
        {sections.map((id) => (
          <li key={id}>
            <Link href={`#${id}`} className="block h-2.5 w-2.5 rounded-full bg-white/30 hover:bg-white/80 transition" data-cursor="hover" aria-label={id} />
          </li>
        ))}
      </ul>
    </nav>
  );
}


