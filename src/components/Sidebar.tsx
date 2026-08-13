"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  BookOpen,
  Settings,
  Plane,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Checklists",
    href: "/checklists",
    icon: ClipboardList,
  },
  {
    label: "Incidentes",
    href: "/incidents",
    icon: AlertTriangle,
  },
  {
    label: "Lições Aprendidas",
    href: "/lessons",
    icon: BookOpen,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col z-40"
      style={{
        width: "var(--sidebar-width)",
        background: "rgba(8, 12, 20, 0.95)",
        borderRight: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-6 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="relative flex items-center justify-center rounded-xl"
          style={{
            width: 38,
            height: 38,
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            boxShadow: "0 0 16px rgba(59,130,246,0.4)",
          }}
        >
          <Plane size={18} className="text-white" style={{ transform: "rotate(-45deg)" }} />
        </div>
        <div>
          <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
            Flight
          </span>
          <span className="font-bold text-base gradient-text">Desk</span>
          <p className="text-xs mt-0" style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>
            Ops Control Center
          </p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p
          className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Módulos
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "text-white"
                  : "hover:text-white"
              )}
              style={
                isActive
                  ? {
                      background: "var(--accent-blue-glow)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      color: "var(--accent-blue-light)",
                    }
                  : {
                      color: "var(--text-secondary)",
                      border: "1px solid transparent",
                    }
              }
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                  style={{ background: "var(--accent-blue)" }}
                />
              )}
              <Icon
                size={17}
                style={{
                  color: isActive ? "var(--accent-blue-light)" : "var(--text-muted)",
                }}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight
                  size={14}
                  style={{ color: "var(--accent-blue-light)", opacity: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-3 py-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <Settings size={17} />
          <span>Configurações</span>
        </Link>

        {/* Version badge */}
        <div className="mt-3 px-3">
          <div
            className="rounded-lg p-3 text-xs"
            style={{
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.1)",
            }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              Inspirado na cultura de segurança da aviação.
            </p>
            <p className="mt-1 font-medium" style={{ color: "var(--accent-blue-light)" }}>
              v0.1.0 — MVP
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
