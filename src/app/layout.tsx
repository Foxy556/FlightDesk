import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: {
    default: "FlightDesk",
    template: "%s | FlightDesk",
  },
  description:
    "Gestão de incidentes e checklists operacionais baseados na cultura de segurança da aviação",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full antialiased">
        <div className="flex h-full">
          <Sidebar />
          <main
            className="flex-1 overflow-y-auto"
            style={{
              marginLeft: "var(--sidebar-width)",
              background: "var(--bg-primary)",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
