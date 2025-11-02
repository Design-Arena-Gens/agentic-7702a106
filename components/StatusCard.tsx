"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function StatusCard() {
  const { data, mutate, isLoading } = useSWR("/api/settings", fetcher, {
    refreshInterval: 10000
  });

  const toggle = async () => {
    await fetch("/api/settings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mirroringEnabled: !data?.mirroringEnabled
      })
    });
    mutate();
  };

  const enabled = data?.mirroringEnabled ?? true;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Mirroring Status</h2>
          <p className="mt-1 text-sm text-slate-500">
            Automatically replicate trades from MoxyAI to your connected platform.
          </p>
        </div>
        <button
          onClick={toggle}
          disabled={isLoading}
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
            enabled
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </button>
      </div>
      <dl className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
        <div>
          <dt className="font-medium text-slate-700">Last Sync</dt>
          <dd>{data?.lastSyncAt ? new Date(data.lastSyncAt).toLocaleString() : "Never"}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-700">Last Trade ID</dt>
          <dd>{data?.lastMoxyTradeId ?? "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-700">Polling Interval</dt>
          <dd>Manual or scheduled via cron</dd>
        </div>
      </dl>
    </section>
  );
}
