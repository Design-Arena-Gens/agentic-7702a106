import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MoxyAI Trade Mirror",
  description: "Mirror MoxyAI trades to your trading platform with full observability."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <main className="min-h-screen bg-slate-50">{children}</main>
      </body>
    </html>
  );
}
