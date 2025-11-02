"use client";

import useSWR from "swr";
import type { MirroredTrade } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TradeTable() {
  const { data } = useSWR<{ trades: MirroredTrade[] }>("/api/trades", fetcher, {
    refreshInterval: 5000
  });

  const trades = data?.trades ?? [];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Mirrored Trades</h2>
          <p className="mt-1 text-sm text-slate-500">Chronological log of the most recent mirrored orders.</p>
        </div>
      </header>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="whitespace-nowrap px-3 py-2 text-left font-medium text-slate-700">Trade ID</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Pair</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Direction</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Entry</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Lot</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Timeframe</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">SL</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">TP</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Platform Order</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Status</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Mirrored At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trades.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-3 py-6 text-center text-slate-500">
                  No trades mirrored yet. Trigger a sync to replicate the latest signals.
                </td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr key={`${trade.id}-${trade.platformOrderId}`}>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-slate-600">{trade.id}</td>
                  <td className="px-3 py-2 text-slate-700">{trade.pair}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                        trade.direction === "buy"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {trade.direction.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-600">{trade.entry.toFixed(5)}</td>
                  <td className="px-3 py-2 text-slate-700">{trade.lotSize}</td>
                  <td className="px-3 py-2 text-slate-700">{trade.timeframe}</td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-600">{trade.stopLoss?.toFixed(5) ?? "-"}</td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-600">{trade.takeProfit?.toFixed(5) ?? "-"}</td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-600">{trade.platformOrderId}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                        trade.status === "executed"
                          ? "bg-emerald-100 text-emerald-700"
                          : trade.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {trade.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-700">
                    {new Date(trade.mirroredAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
