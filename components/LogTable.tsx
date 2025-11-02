"use client";

import useSWR from "swr";
import type { TradeLogEntry } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function LogTable() {
  const { data } = useSWR<{ logs: TradeLogEntry[] }>("/api/logs", fetcher, {
    refreshInterval: 7000
  });

  const logs = data?.logs ?? [];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Execution Logs</h2>
          <p className="mt-1 text-sm text-slate-500">Detailed trace of sync attempts and order placements.</p>
        </div>
      </header>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Timestamp</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Type</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Message</th>
              <th className="px-3 py-2 text-left font-medium text-slate-700">Context</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-slate-500">
                  No logs recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td className="whitespace-nowrap px-3 py-2 text-slate-600">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                        log.type === "info"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {log.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-700">{log.message}</td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-600">
                    {log.context ? JSON.stringify(log.context) : "-"}
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
