"use client";

import { useState } from "react";

export function SyncButton() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const syncNow = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/sync", {
        method: "POST"
      });
      const data = await response.json();
      if (data.success) {
        setStatus(`Mirrored ${data.mirrored} | Skipped ${data.skipped}`);
      } else {
        setStatus("Sync failed");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={syncNow}
        disabled={loading}
        className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {loading ? "Syncing..." : "Run Sync"}
      </button>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </div>
  );
}
