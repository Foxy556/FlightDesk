"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  Square,
  CheckSquare,
  Star,
  Clock,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface ChecklistItem {
  id: string;
  text: string;
  critical: boolean;
}

interface Template {
  id: string;
  title: string;
  description: string;
  items: string;
}

interface ExecutionItem extends ChecklistItem {
  checked: boolean;
  checkedAt?: string;
}

export default function ExecuteChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [executionItems, setExecutionItems] = useState<ExecutionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(new Date());
  const [elapsed, setElapsed] = useState("00:00");
  const [completed, setCompleted] = useState(false);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime.getTime()) / 1000);
      const m = Math.floor(diff / 60).toString().padStart(2, "0");
      const s = (diff % 60).toString().padStart(2, "0");
      setElapsed(`${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/checklists/${id}`);
      const data = await res.json();
      setTemplate(data);
      const parsed: ChecklistItem[] = JSON.parse(data.items);
      setExecutionItems(parsed.map((item) => ({ ...item, checked: false })));
      setLoading(false);
    };
    load();
  }, [id]);

  const toggleItem = (itemId: string) => {
    if (completed) return;
    setExecutionItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              checked: !item.checked,
              checkedAt: !item.checked ? new Date().toLocaleTimeString("pt-BR") : undefined,
            }
          : item
      )
    );
  };

  const checkedCount = executionItems.filter((i) => i.checked).length;
  const totalCount = executionItems.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
  const allCriticalChecked = executionItems.filter((i) => i.critical).every((i) => i.checked);

  const handleComplete = async () => {
    if (!allCriticalChecked) return;
    setSubmitting(true);

    try {
      await fetch(`/api/checklists/${id}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completedItems: executionItems.filter((i) => i.checked).map((i) => i.id),
          status: "COMPLETED",
        }),
      });
      setCompleted(true);
    } catch {
      alert("Erro ao registrar execução.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin" style={{ color: "var(--accent-blue)" }} />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: "var(--text-secondary)" }}>Checklist não encontrado.</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen dot-grid flex items-center justify-center">
        <div className="text-center animate-fade-up">
          <div
            className="inline-flex items-center justify-center rounded-2xl mb-6"
            style={{
              width: 80,
              height: 80,
              background: "var(--accent-green-glow)",
              border: "2px solid rgba(16,185,129,0.4)",
              boxShadow: "0 0 40px rgba(16,185,129,0.3)",
            }}
          >
            <CheckCircle2 size={40} style={{ color: "#34d399" }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            Procedimento Concluído!
          </h2>
          <p className="mb-1" style={{ color: "var(--text-secondary)" }}>
            Todos os itens foram verificados em <strong style={{ color: "#34d399" }}>{elapsed}</strong>.
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            Execução registrada com timestamp no banco de dados.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => router.push("/checklists")}
              className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            >
              Voltar para Checklists
            </button>
            <button
              onClick={() => { setCompleted(false); setExecutionItems((prev) => prev.map((i) => ({ ...i, checked: false, checkedAt: undefined }))); }}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)", color: "#fff" }}
            >
              Executar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-2xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="animate-fade-up mb-6">
          <Link
            href="/checklists"
            className="inline-flex items-center gap-1.5 text-sm mb-4 transition-all"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <ChevronLeft size={15} /> Cancelar execução
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            {template.title}
          </h1>
          {template.description && (
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {template.description}
            </p>
          )}
        </div>

        {/* Status bar */}
        <div
          className="animate-fade-up delay-1 rounded-2xl px-5 py-4 mb-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: "var(--text-secondary)" }}>
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>{checkedCount}</span>/{totalCount} itens
              </span>
              <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                <Clock size={13} /> {elapsed}
              </span>
            </div>
            <span className="text-sm font-semibold" style={{ color: progress === 100 ? "#34d399" : "var(--accent-blue-light)" }}>
              {Math.round(progress)}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: progress === 100
                  ? "linear-gradient(90deg, #10b981, #34d399)"
                  : "linear-gradient(90deg, #3b82f6, #06b6d4)",
                boxShadow: `0 0 10px ${progress === 100 ? "rgba(16,185,129,0.4)" : "rgba(59,130,246,0.4)"}`,
              }}
            />
          </div>
        </div>

        {/* Checklist items */}
        <div className="animate-fade-up delay-2 space-y-2 mb-6">
          {executionItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
              style={{
                background: item.checked ? (item.critical ? "rgba(16,185,129,0.08)" : "rgba(59,130,246,0.06)") : "var(--bg-card)",
                border: item.checked
                  ? item.critical
                    ? "1px solid rgba(16,185,129,0.3)"
                    : "1px solid rgba(59,130,246,0.25)"
                  : item.critical
                  ? "1px solid rgba(245,158,11,0.2)"
                  : "1px solid var(--border)",
              }}
            >
              {/* Checkbox */}
              {item.checked ? (
                <CheckSquare size={20} style={{ color: item.critical ? "#34d399" : "var(--accent-blue-light)", flexShrink: 0 }} />
              ) : (
                <Square size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              )}

              {/* Number */}
              <span className="text-xs w-5 flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                {index + 1}
              </span>

              {/* Text */}
              <span
                className="flex-1 text-sm font-medium"
                style={{
                  color: item.checked ? "var(--text-muted)" : "var(--text-primary)",
                  textDecoration: item.checked ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>

              {/* Critical badge */}
              {item.critical && (
                <span className="badge badge-yellow flex-shrink-0">
                  <Star size={9} /> Crítico
                </span>
              )}

              {/* Timestamp */}
              {item.checkedAt && (
                <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                  {item.checkedAt}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Warning: critical items not checked */}
        {!allCriticalChecked && checkedCount > 0 && (
          <div
            className="animate-fade-up rounded-xl px-4 py-3 mb-4 flex items-center gap-2 text-sm"
            style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)", color: "var(--accent-yellow)" }}
          >
            <AlertTriangle size={14} />
            Ainda há itens críticos (Memory Items) não verificados. Eles devem ser concluídos antes de finalizar.
          </div>
        )}

        {/* Complete button */}
        <button
          onClick={handleComplete}
          disabled={!allCriticalChecked || submitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: allCriticalChecked
              ? "linear-gradient(135deg, #10b981, #06b6d4)"
              : "var(--bg-card)",
            color: allCriticalChecked ? "#fff" : "var(--text-muted)",
            border: allCriticalChecked ? "none" : "1px solid var(--border)",
            boxShadow: allCriticalChecked ? "0 0 24px rgba(16,185,129,0.35)" : "none",
            cursor: allCriticalChecked ? "pointer" : "not-allowed",
          }}
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
          {submitting ? "Registrando..." : "Concluir Procedimento"}
        </button>
      </div>
    </div>
  );
}
