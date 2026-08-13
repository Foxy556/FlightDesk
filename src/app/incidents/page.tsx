import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Incidentes",
};

export default function IncidentsPage() {
  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Módulo B</span>
            <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>Gestão de Incidentes</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              Reporte falhas reais e Near Misses sem foco em culpa — entenda o sistema.
            </p>
          </div>
          <Link
            href="/incidents/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm"
            style={{ background: "linear-gradient(135deg, #ef4444, #f87171)", color: "#fff", boxShadow: "0 0 20px rgba(239,68,68,0.3)" }}
          >
            <Plus size={16} /> Reportar Incidente
          </Link>
        </div>

        <div
          className="animate-fade-up delay-1 rounded-2xl p-16 text-center"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <AlertTriangle size={48} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
          <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>Módulo em desenvolvimento</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Em breve você poderá reportar incidentes, criar Post-Mortems e analisar causas raiz.
          </p>
        </div>
      </div>
    </div>
  );
}
