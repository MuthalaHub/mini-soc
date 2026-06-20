import { Link } from "react-router-dom";

/* ============================================================
   LandingPage — entry point for the Mini-SOC console.

   Sections:
     #overview  Hero + live alert-feed signature panel
                Stats strip (grounded in the proposal)
     #roles     Three clearance-tier access cards, each routing
                to that user's workspace
     #pipeline  Detection pipeline (feed -> IF + graph -> fusion)
     #metrics   Success criteria the prototype is held to
   ============================================================ */

/* ---- data -------------------------------------------------- */

interface RoleCard {
  tier: string;
  title: string;
  blurb: string;
  scope: string[];
  to: string;
  cta: string;
}

const ROLES: RoleCard[] = [
  {
    tier: "TIER 01",
    title: "Banking Security Analyst",
    blurb:
      "Front-line triage. Work the live alert queue, read each composite score and decide: false positive, needs investigation, or confirmed fraud.",
    scope: ["Live alert queue", "Score & feature breakdown", "Annotate · resolve · escalate"],
    to: "/analyst",
    cta: "Open analyst console",
  },
  {
    tier: "TIER 02",
    title: "Fraud Investigator",
    blurb:
      "Senior escalation handler. Use the interactive transaction-network view to expose fraud rings, mule chains and synthetic-identity clusters.",
    scope: ["Account-network explorer", "Ring & mule-chain detection", "Export investigation reports"],
    to: "/investigator",
    cta: "Open investigator console",
  },
  {
    tier: "OPS",
    title: "System Operator",
    blurb:
      "Keeps detection sharp. Retrain the hybrid model, tune Isolation Forest contamination and re-optimise the score-fusion weight when performance drifts.",
    scope: ["Trigger retraining", "Tune contamination & fusion α", "Promote / roll back versions"],
    to: "/operator",
    cta: "Open operator console",
  },
];

const STATS: { value: string; label: string }[] = [
  { value: "$38B+", label: "Global payment fraud losses, 2023" },
  { value: "<1%", label: "Fraud rate — imbalance above 1:500" },
  { value: "6.3M", label: "PaySim transactions, single workstation" },
  { value: "≤3s", label: "Dashboard alert-queue refresh" },
];

const PIPELINE: { step: string; detail: string }[] = [
  { step: "Transaction feed", detail: "PaySim windows" },
  { step: "Feature engineering", detail: "amount · balance · velocity" },
  { step: "Isolation Forest", detail: "anomaly score s_IF" },
  { step: "Graph analysis", detail: "centrality · PageRank · Louvain" },
  { step: "Score fusion", detail: "composite risk" },
  { step: "Mini-SOC", detail: "alert queue + network view" },
];

const CRITERIA: { metric: string; target: string }[] = [
  { metric: "AUPRC uplift", target: "≥ 5pp over IF-only" },
  { metric: "Fraud-class recall", target: "≥ 80%" },
  { metric: "False positive rate", target: "≤ 10%" },
  { metric: "Fraud-class F1", target: "≥ 0.70" },
  { metric: "Graph feature latency", target: "≤ 5s / 10k window" },
  { metric: "Alert refresh", target: "≤ 3s" },
];

/* ---- small pieces ------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.22em] text-[#FFD400]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
      {children}
    </span>
  );
}

function AlertRow({
  acc,
  kind,
  score,
  band,
}: {
  acc: string;
  kind: string;
  score: string;
  band: "HIGH" | "MEDIUM" | "LOW";
}) {
  const color =
    band === "HIGH" ? "#FF4D4D" : band === "MEDIUM" ? "#FFD400" : "#46C26B";
  return (
    <div className="flex items-center gap-3 border-b border-[#262626] px-4 py-3 last:border-b-0">
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm text-white">{acc}</p>
        <p className="truncate text-xs text-[#8A8A8A]">{kind}</p>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm font-semibold" style={{ color }}>
          {score}
        </p>
        <p className="font-mono text-[10px] tracking-widest text-[#8A8A8A]">{band}</p>
      </div>
    </div>
  );
}

/* ---- page -------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="bg-[#0B0B0B] text-[#F4F4F4]">
      {/* ===== HERO ===== */}
      <section
        id="overview"
        className="relative overflow-hidden border-b border-[#262626]"
      >
        {/* faint monitoring grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#FFD400 1px, transparent 1px), linear-gradient(90deg, #FFD400 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-[#FFD400] opacity-[0.07] blur-[100px]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          {/* copy */}
          <div>
            <Eyebrow>GRAPH-AUGMENTED ANOMALY DETECTION</Eyebrow>
            
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#A3A3A3]">
              A Mini Security Operations Centre that fuses Isolation Forest anomaly
              scoring with transaction-network analysis — so analysts catch both the
              lone suspicious payment and the coordinated fraud ring behind it, in one
              explainable risk score.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#roles"
                className="rounded-md bg-[#FFD400] px-6 py-3 text-sm font-semibold text-[#0B0B0B] transition-colors hover:bg-[#C9A700]"
              >
                Choose your console →
              </a>
              <a
                href="#pipeline"
                className="rounded-md border border-[#262626] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#FFD400] hover:text-[#FFD400]"
              >
                How it works
              </a>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="relative border-t border-[#262626]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#262626] px-5 sm:px-8 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-2 py-7 sm:px-6">
                <p className="font-mono text-2xl font-bold text-[#FFD400] sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-[#8A8A8A]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROLES ===== */}
      <section id="roles" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow>CLEARANCE TIERS</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sign in by role
          </h2>
          <p className="mt-4 text-[#A3A3A3]">
            The Mini-SOC follows a realistic staffing model. Each tier opens a
            workspace scoped to what that operator actually does — no more, no less.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {ROLES.map((role) => (
            <div
              key={role.tier}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[#262626] bg-[#141414] p-7 transition-colors hover:border-[#FFD400]/60"
            >
              {/* top accent */}
              <span className="absolute inset-x-0 top-0 h-1 bg-[#FFD400] opacity-60 transition-opacity group-hover:opacity-100" />

              <span className="font-mono text-xs tracking-[0.25em] text-[#FFD400]">
                {role.tier}
              </span>
              <h3 className="mt-3 text-xl font-bold text-white">{role.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">{role.blurb}</p>

              <ul className="mt-6 space-y-2.5">
                {role.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#C9C9C9]">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#FFD400]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="m5 12 5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to={role.to}
                className="mt-7 inline-flex items-center justify-center rounded-md border border-[#FFD400] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-[#0B0B0B]"
              >
                {role.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PIPELINE ===== */}
      <section id="pipeline" className="border-y border-[#262626] bg-[#0F0F0F]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>DETECTION PIPELINE</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Two detectors, one score
            </h2>
            <p className="mt-4 text-[#A3A3A3]">
              Each transaction window runs through anomaly scoring and graph analysis
              in parallel. Their signals are fused — weighted by α — into a single
              composite score that drives the alert queue.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-stretch">
            {PIPELINE.map((node, i) => (
              <div key={node.step} className="flex flex-1 items-center gap-3 lg:flex-col lg:gap-3">
                <div className="flex w-full flex-1 flex-col rounded-lg border border-[#262626] bg-[#141414] p-4">
                  <span className="font-mono text-[10px] tracking-widest text-[#FFD400]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-white">{node.step}</span>
                  <span className="mt-1 font-mono text-xs text-[#8A8A8A]">{node.detail}</span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <span className="text-[#FFD400] lg:rotate-90" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}