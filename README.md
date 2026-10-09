<div align="center">

# ✈️ FlightDesk

**Checklists operacionais, gestão de incidentes e post-mortems sem culpa.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 🇧🇷 Sobre

O FlightDesk nasceu de uma premissa simples: **na aviação, investigar um erro não é procurar
um culpado — é entender que falha de sistema permitiu aquele erro acontecer.**

Se a aviação dependesse só da memória e da infalibilidade das pessoas, acidentes seriam
constantes. O setor se tornou o mais seguro do mundo porque transforma cada falha e cada
"quase acidente" em aprendizado documentado.

Essa filosofia funciona igual em tecnologia, saúde, finanças e infraestrutura:

1. **Checklists padronizados** reduzem o estresse e a margem de erro em tarefas críticas.
2. **Post-mortems sem culpa** criam transparência e impedem que o mesmo problema se repita.
3. **Ações preventivas** transformam falhas passadas em melhoria definitiva de processo.

O FlightDesk é a plataforma que materializa esses três pilares.

---

## 📦 Módulos

### A — Procedimentos operacionais (Checklists / Runbooks)

- **Templates reutilizáveis** — *"Procedimento de deploy em produção"*, *"Manutenção
  preventiva de servidor"*, etc.
- **Itens críticos × normais** — diferencia *memory items* (trava de segurança) de
  conferências padrão.
- **Executor de checklist** — marcação passo a passo com registro automático de **timestamp**
  e do **operador responsável** por cada item.

### B — Incidentes e investigação

- **Registro de ocorrência** — falha real ou *near miss* ("quase acidente").
- **Linha do tempo** — `14:00 alerta emitido → 14:15 causa identificada → 14:40 serviço
  restabelecido`.
- **Análise de causa raiz (RCA)** — formulário guiado pelos **5 Porquês**, indo ao fator
  sistêmico e não ao sintoma superficial.

### C — Recomendações de segurança

- **Action items** vinculados diretamente ao relatório do incidente.
- **Painel de status** das recomendações (pendente / em andamento / implementada).
- **Base de conhecimento** consultável por toda a equipe.

---

## 🏗️ Stack e arquitetura

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Framer Motion, Lucide icons |
| Linguagem | TypeScript 5 |
| ORM / Banco | Prisma 7 + SQLite (dev) |
| Qualidade | ESLint 9, `tsc` |

```
src/
├── app/          # rotas e páginas (App Router)
├── components/   # UI compartilhada
└── lib/          # utilitários e acesso a dados
prisma/
└── schema.prisma # modelo de dados (User, Checklist, Incident, PostMortem…)
```

### Requisitos não funcionais

- **Rastreabilidade** — histórico de versão de checklists e relatórios.
- **Clareza em crise** — interface limpa e responsiva, priorizando leitura sob pressão.
- **Papéis e segurança** — `Operador` (executa checklists e abre incidentes) e
  `Investigador/Admin` (conclui relatórios e aprova recomendações).

---

## 🚀 Como rodar

```bash
git clone https://github.com/Foxy556/FlightDesk.git
cd FlightDesk
npm install

# aponta o Prisma para o banco local
cp .env.example .env

# cria/atualiza o banco local
npx prisma db push
npx prisma generate

npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

| Comando | Descrição |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run lint` | ESLint |
| `npx prisma studio` | inspecionar o banco no navegador |

> ⚙️ **Configuração:** o Prisma 7 lê a URL do banco de `prisma.config.ts`, que carrega
> `DATABASE_URL` via `dotenv`. O `.env` é local e está no `.gitignore` — o template fica em
> [`.env.example`](.env.example). O SQLite (`dev.db`) é criado pelo `prisma db push` e
> também não é versionado.

---

## 🗺️ Roadmap

- [x] Modelagem de dados e estrutura do projeto
- [x] CRUD de templates de checklist
- [x] Executor de checklist com auditoria de execução
- [ ] Registro de incidentes e *near misses*
- [ ] Linha do tempo do incidente
- [ ] Fluxo de RCA com 5 Porquês
- [ ] Painel de recomendações e base de conhecimento
- [ ] Autenticação e controle de papéis
- [ ] Deploy público

---

## 🤝 Contribuição

Issues e pull requests são bem-vindas.

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-melhoria`
3. Commit: `git commit -m "feat: adiciona X"`
4. Push: `git push origin feat/minha-melhoria`
5. Abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).

---

<div align="center">

**Veja também:** [net_troubleshoot](https://github.com/Foxy556/net_troubleshoot) ·
[apontamentos](https://github.com/Foxy556/apontamentos) ·
[Perfil](https://github.com/Foxy556)

</div>
