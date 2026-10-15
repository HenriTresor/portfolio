import { ReactNode } from "react";

export default function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="portfolio-page-section">
      <div className="portfolio-page-inner">{children}</div>
    </section>
  );
}

