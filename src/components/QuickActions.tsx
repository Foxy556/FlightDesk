"use client";

import Link from "next/link";
import { ClipboardList, AlertTriangle, BookOpen } from "lucide-react";
import { colorMap } from "@/lib/colors";

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


export function QuickActions() {
  return (
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
              (e.currentTarget as HTMLElement).style.border = `1px solid var(--border)`;
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
  );
}
