"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Star, AlertTriangle, ChevronLeft, ClipboardList, Check } from "lucide-react";
import Link from "next/link";

interface ChecklistItem {
  id: string;
  text: string;
  critical: boolean;
}

export default function CreateChecklistPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: crypto.randomUUID(), text: "", critical: false },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addItem = () => {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), text: "", critical: false }]);
  };

  const updateItem = (id: string, field: keyof ChecklistItem, value: string | boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    if (!title.trim()) { setError("O título é obrigatório."); return; }
    const validItems = items.filter((i) => i.text.trim());
    if (validItems.length === 0) { setError("Adicione pelo menos um item."); return; }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/checklists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, items: validItems }),
      });

      if (!res.ok) throw new Error();
      router.push("/checklists");
    } catch {
      setError("Erro ao salvar o checklist. Tente novamente.");
      setSaving(false);
    }
  };

  const normalItems = items.filter((i) => !i.critical);
  const criticalItems = items.filter((i) => i.critical);

  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-3xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="animate-fade-up mb-8">
          <Link
            href="/checklists"
            className="inline-flex items-center gap-1.5 text-sm mb-4 transition-all"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <ChevronLeft size={15} /> Voltar para Checklists
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                boxShadow: "0 0 20px rgba(59,130,246,0.35)",
              }}
            >
              <ClipboardList size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Novo Procedimento Operacional
              </h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Crie um checklist com itens normais e itens de memória (críticos).
              </p>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div
          className="animate-fade-up delay-1 rounded-xl px-5 py-4 mb-6 flex gap-3"
          style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <Star size={16} style={{ color: "var(--accent-yellow)", flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Itens marcados como <strong style={{ color: "var(--accent-yellow)" }}>críticos</strong> são os &quot;Memory Items&quot; da aviação — passos que não podem ser pulados em hipótese alguma, mesmo sob pressão ou cansaço.
          </p>
        </div>

        {/* Form card */}
        <div
          className="animate-fade-up delay-2 rounded-2xl p-6 space-y-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
              Título do Procedimento *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Procedimento de Deploy em Produção"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => ((e.target as HTMLElement).style.border = "1px solid rgba(59,130,246,0.5)")}
              onBlur={(e) => ((e.target as HTMLElement).style.border = "1px solid var(--border)")}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
              Descrição (opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Quando usar este procedimento? Qual o objetivo?"
              rows={2}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => ((e.target as HTMLElement).style.border = "1px solid rgba(59,130,246,0.5)")}
              onBlur={(e) => ((e.target as HTMLElement).style.border = "1px solid var(--border)")}
            />
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid var(--border)" }} />

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Itens do Checklist
              </label>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1"><span style={{ color: "#34d399" }}>●</span> Normal: {normalItems.length}</span>
                <span className="flex items-center gap-1"><span style={{ color: "var(--accent-yellow)" }}>●</span> Crítico: {criticalItems.length}</span>
              </div>
            </div>

            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all"
                  style={{
                    background: "var(--bg-secondary)",
                    border: item.critical
                      ? "1px solid rgba(245,158,11,0.3)"
                      : "1px solid var(--border)",
                  }}
                >
                  <span className="text-xs w-5 text-center flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateItem(item.id, "text", e.target.value)}
                    placeholder="Descreva o passo..."
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "var(--text-primary)" }}
                  />
                  <button
                    type="button"
                    onClick={() => updateItem(item.id, "critical", !item.critical)}
                    title={item.critical ? "Item Crítico (Memory Item)" : "Marcar como crítico"}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                    style={
                      item.critical
                        ? { background: "var(--accent-yellow-glow)", color: "var(--accent-yellow)", border: "1px solid rgba(245,158,11,0.3)" }
                        : { background: "transparent", color: "var(--text-muted)", border: "1px solid transparent" }
                    }
                  >
                    <Star size={12} />
                    {item.critical ? "Crítico" : "Normal"}
                  </button>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f87171")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "transparent",
                border: "1px dashed var(--border-light)",
                color: "var(--text-muted)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent-blue-light)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)";
              }}
            >
              <Plus size={14} /> Adicionar item
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="animate-fade-up mt-4 rounded-xl px-4 py-3 flex items-center gap-2 text-sm"
            style={{ background: "var(--accent-red-glow)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}
          >
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="animate-fade-up delay-3 mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: saving ? "var(--border)" : "linear-gradient(135deg, #3b82f6, #06b6d4)",
            color: saving ? "var(--text-muted)" : "#fff",
            boxShadow: saving ? "none" : "0 0 24px rgba(59,130,246,0.4)",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? (
            <>Salvando...</>
          ) : (
            <><Check size={16} /> Criar Checklist</>
          )}
        </button>
      </div>
    </div>
  );
}
