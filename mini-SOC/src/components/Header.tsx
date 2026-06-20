import { Link } from "react-router-dom";

/* ============================================================
   Header — simple, clean masthead. Shows the project, a one-line
   description of the app, and the author / institution details.

   Edit the three constants below to update author info anywhere
   it appears in the header.
   ============================================================ */

const AUTHOR = "Muthala Gundo";
const INSTITUTION = "University of Johannesburg";
const PROJECT = "Mini-SOC Banking Fraud Monitoring";

function ShieldMark() {
  return (
    <span
      aria-hidden
      className="grid h-10 w-10 place-items-center rounded-md bg-[#FFD400] text-[#0B0B0B]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2}>
        <path d="M12 2 4 5v6c0 5 3.4 8.4 8 11 4.6-2.6 8-6 8-11V5l-8-3Z" strokeLinejoin="round" />
        <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Header() {
  return (
    <header className="border-b border-[#262626] bg-[#0B0B0B]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        {/* Project + short description */}
        <Link to="/home" className="flex items-start gap-3">
          <ShieldMark />
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-wide text-white">
              {PROJECT}
            </span>
            <span className="mt-0.5 block max-w-md text-sm text-[#A3A3A3]">
              Hybrid fraud detection fusing Isolation Forest anomaly scoring with
              transaction-network analysis.
            </span>
          </span>
        </Link>

        {/* Author + institution */}
        <div className="border-l-0 border-t border-[#262626] pt-4 text-left md:border-l md:border-t-0 md:pl-6 md:pt-0 md:text-right">
          <p className="font-mono text-[10px] tracking-[0.22em] text-[#FFD400]">AUTHOR</p>
          <p className="mt-1 text-sm font-semibold text-white">{AUTHOR}</p>
          <p className="text-sm text-[#A3A3A3]">{INSTITUTION}</p>
        </div>
      </div>
    </header>
  );
}