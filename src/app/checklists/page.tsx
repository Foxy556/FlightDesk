"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, Plus, Play, Trash2, Calendar, ChevronRight, Search } from "lucide-react";

interface ChecklistTemplate {
  id: string;
  title: string;
  description: string;
  items: string;
  createdAt: string;
}

export default function ChecklistsPage() {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/checklists");
    const data = await res.json();
    setTemplates(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este checklist?")) return;
    await fetch(`/api/checklists/${id}`, { method: "DELETE" });
    load();
  };

  const filtered = templates.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const getItemCount = (itemsJson: string) => {
    try { return JSON.parse(itemsJson).length; }
    catch { return 0; }
  };

  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                Módulo A
              </span>
            </div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Checklists Operacionais
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              Procedimentos padronizados com rastreabilidade total de execução.
            </p>
          </div>
          <Link
            href="/checklists/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(59,130,246,0.35)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(59,130,246,0.6)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(59,130,246,0.35)")
            }
          >
            <Plus size={16} />
            Novo Checklist
          </Link>
        </div>

        {/* Search */}
        <div
          className="animate-fade-up delay-1 flex items-center gap-3 px-4 py-3 rounded-xl mb-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Buscar checklist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl h-24 animate-pulse"
                style={{ background: "var(--bg-card)" }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="animate-fade-up delay-1 rounded-2xl p-16 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <ClipboardList size={48} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
            <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>
              Nenhum checklist encontrado
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Crie seu primeiro procedimento operacional padronizado.
            </p>
            <Link
              href="/checklists/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm"
              style={{
                background: "var(--accent-blue-glow)",
                color: "var(--accent-blue-light)",
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            >
              <Plus size={15} /> Criar agora
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((t, i) => {
              const itemCount = getItemCount(t.items);
              const date = new Date(t.createdAt).toLocaleDateString("pt-BR");
              return (
                <div
                  key={t.id}
                  className={`animate-fade-up delay-${Math.min(i + 1, 5)} group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200`}
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid var(--border-light)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: "var(--accent-blue-glow)",
                      border: "1px solid rgba(59,130,246,0.2)",
                    }}
                  >
                    <ClipboardList size={20} style={{ color: "var(--accent-blue-light)" }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                      {t.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      {t.description && (
                        <p className="text-xs truncate max-w-xs" style={{ color: "var(--text-secondary)" }}>
                          {t.description}
                        </p>
                      )}
                      <span className="badge badge-blue">{itemCount} itens</span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Calendar size={11} /> {date}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/checklists/execute/${t.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: "var(--accent-green-glow)",
                        color: "#34d399",
                        border: "1px solid rgba(16,185,129,0.25)",
                      }}
                    >
                      <Play size={12} /> Executar
                    </Link>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#f87171")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                      }
                    >
                      <Trash2 size={15} />
                    </button>
                    <ChevronRight size={15} style={{ color: "var(--text-muted)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
