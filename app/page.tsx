import { StatusCard } from "@/components/StatusCard";
import { SyncButton } from "@/components/SyncButton";
import { TradeTable } from "@/components/TradeTable";
import { LogTable } from "@/components/LogTable";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
            Agent Control Center
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            MoxyAI Trade Mirroring Agent
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Monitor, replicate, and audit trades executed on MoxyAI with automated order placement on your
            preferred trading platform.
          </p>
        </div>
        <SyncButton />
      </header>

      <StatusCard />

      <div className="grid gap-6 lg:grid-cols-1">
        <TradeTable />
        <LogTable />
      </div>
    </div>
  );
}
