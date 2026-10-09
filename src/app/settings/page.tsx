import type { Metadata } from "next";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Configurações",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8 animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Sistema
          </span>
          <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>Configurações</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            Preferências, papéis de acesso e parâmetros operacionais da equipe.
          </p>
        </div>

        <div
          className="animate-fade-up delay-1 rounded-2xl p-16 text-center"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <Settings size={48} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
          <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>Módulo em desenvolvimento</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Em breve você poderá configurar papéis, notificações e parâmetros do FlightDesk.
          </p>
        </div>
      </div>
    </div>
  );
}
