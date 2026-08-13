import type { Metadata } from "next";
import { Plane, ClipboardList, AlertTriangle, BookOpen, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  {
    label: "Checklists Criados",
    value: "—",
    icon: ClipboardList,
    color: "blue",
  },
  {
    label: "Incidentes Abertos",
    value: "—",
    icon: AlertTriangle,
    color: "red",
  },
  {
    label: "Post-Mortems",
    value: "—",
    icon: Activity,
    color: "yellow",
  },
  {
    label: "Ações Preventivas",
    value: "—",
    icon: TrendingUp,
    color: "green",
  },
];

const quickActions = [
  {
    label: "Novo Checklist",
    description: "Crie um procedimento operacional padronizado.",
    href: "/checklists/create",
    icon: ClipboardList,
    color: "blue",
  },
  {
    label: "Reportar Incidente",
    description: "Abra um Near Miss ou falha real sem apontar culpados.",
    href: "/incidents/create",
    icon: AlertTriangle,
    color: "red",
  },
  {
    label: "Lições Aprendidas",
    description: "Consulte falhas passadas e ações preventivas implementadas.",
    href: "/lessons",
    icon: BookOpen,
    color: "green",
  },
];

const colorMap: Record<string, { glow: string; text: string; border: string; bg: string }> = {
  blue: {
    glow: "rgba(59,130,246,0.12)",
    text: "var(--accent-blue-light)",
    border: "rgba(59,130,246,0.25)",
    bg: "var(--accent-blue-glow)",
  },
  red: {
    glow: "rgba(239,68,68,0.12)",
    text: "#f87171",
    border: "rgba(239,68,68,0.25)",
    bg: "var(--accent-red-glow)",
  },
  yellow: {
    glow: "rgba(245,158,11,0.12)",
    text: "#fbbf24",
    border: "rgba(245,158,11,0.25)",
    bg: "var(--accent-yellow-glow)",
  },
  green: {
    glow: "rgba(16,185,129,0.12)",
    text: "#34d399",
    border: "rgba(16,185,129,0.25)",
    bg: "var(--accent-green-glow)",
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div
                className="radar-ring absolute inset-0 rounded-full"
                style={{ background: "rgba(59,130,246,0.25)" }}
              />
              <div
                className="relative flex items-center justify-center rounded-2xl"
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  boxShadow: "0 0 24px rgba(59,130,246,0.4)",
                }}
              >
                <Plane size={24} className="text-white" style={{ transform: "rotate(-45deg)" }} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                Centro de Controle Operacional
              </h1>
              <p style={{ color: "var(--text-secondary)" }}>
                Bem-vindo ao FlightDesk — onde cada processo é documentado e cada falha se torna aprendizado.
              </p>
            </div>
          </div>

          {/* Aviation quote */}
          <div
            className="rounded-xl px-5 py-4"
            style={{
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
              &quot;Na aviação, a investigação de um erro não busca apontar um culpado, mas sim entender quais falhas
              no sistema ou no processo permitiram que aquele erro humano acontecesse.&quot;
            </p>
            <p className="text-xs mt-1 font-medium" style={{ color: "var(--accent-blue-light)" }}>
              — Lito Sousa, Aviões e Músicas
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const c = colorMap[stat.color];
            return (
              <div
                key={stat.label}
                className={`animate-fade-up delay-${i + 1} rounded-2xl p-5`}
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid var(--border)`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="rounded-lg p-2"
                    style={{ background: c.glow }}
                  >
                    <Icon size={18} style={{ color: c.text }} />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              const c = colorMap[action.color];
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`animate-fade-up delay-${i + 2} group block rounded-2xl p-6 transition-all duration-200`}
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid var(--border)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)";
                    (e.currentTarget as HTMLElement).style.border = `1px solid ${c.border}`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${c.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                    (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center rounded-xl mb-4"
                    style={{
                      width: 44,
                      height: 44,
                      background: c.glow,
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    <Icon size={20} style={{ color: c.text }} />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    {action.label}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Three pillars */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            Os 3 Pilares do FlightDesk
          </h2>
          <div
            className="rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {[
              { emoji: "📋", title: "Checklists Operacionais", desc: "Procedimentos padronizados evitam erros causados pela complacência, mesmo para profissionais experientes." },
              { emoji: "🔍", title: "Post-Mortem Blameless", desc: "Quando algo falha, investigamos o sistema, não o indivíduo. O foco é aprender, nunca punir." },
              { emoji: "✅", title: "Ações Preventivas", desc: "Cada investigação gera recomendações rastreáveis para que o mesmo erro nunca aconteça duas vezes." },
            ].map((pillar, i) => (
              <div key={i} className={`animate-fade-up delay-${i + 1}`}>
                <div className="text-2xl mb-2">{pillar.emoji}</div>
                <h3 className="font-semibold mb-1 text-sm" style={{ color: "var(--text-primary)" }}>
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
