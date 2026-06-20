import { Link } from "react-router-dom";

/* ============================================================
   Footer — site-wide footer. Yellow hairline on top, brand
   block, three link columns (System / Roles / Project) and a
   provenance bar noting the research basis of the prototype.
   ============================================================ */

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "System",
    links: [
      { label: "Overview", href: "#overview" },
      { label: "Detection pipeline", href: "#pipeline" },
      { label: "Performance metrics", href: "#metrics" },
    ],
  },
  {
    title: "Roles",
    links: [
      { label: "Tier 1 Analyst", href: "/analyst" },
      { label: "Tier 2 Investigator", href: "/investigator" },
      { label: "System Operator", href: "/operator" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Research questions", href: "#overview" },
      { label: "PaySim dataset", href: "#pipeline" },
      { label: "Success criteria", href: "#metrics" },
    ],
  },
];

function isRoute(href: string) {
  return href.startsWith("/");
}

export default function Footer() {
  return (
    <footer className="border-t border-[#FFD400]/30 bg-[#0B0B0B] text-[#A3A3A3]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-[#FFD400] text-[#0B0B0B]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path d="M12 2 4 5v6c0 5 3.4 8.4 8 11 4.6-2.6 8-6 8-11V5l-8-3Z" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-bold tracking-[0.18em] text-white">MINI-SOC</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Graph-augmented anomaly detection for banking fraud — pairing
              Isolation Forest scoring with transaction-network analysis, surfaced
              to analysts as one explainable risk score.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs tracking-[0.2em] text-[#FFD400]">
                {col.title.toUpperCase()}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {isRoute(link.href) ? (
                      <Link to={link.href} className="text-sm transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm transition-colors hover:text-white">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Provenance bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#262626] pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono tracking-wide text-[#6B6B6B]">
            DESIGN SCIENCE RESEARCH PROTOTYPE · EVALUATED ON THE PAYSIM BENCHMARK
          </p>
          <p>© {new Date().getFullYear()} Mini-SOC Banking Fraud Monitoring. Research prototype.</p>
        </div>
      </div>
    </footer>
  );
}