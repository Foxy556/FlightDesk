# FlightDesk ✈️

Uma plataforma para gestão de checklists operacionais, acompanhamento de incidentes e investigação de causa raiz sem atribuição de culpa (*Blameless Post-Mortem*).

## A Justificativa: Por que a cultura da aviação?

> "Na aviação, a investigação de um erro não busca apontar um culpado, mas sim entender quais falhas no sistema ou no processo permitiram que aquele erro humano acontecesse." — Lito Sousa (Aviões e Músicas)

Se a aviação dependesse apenas da memória ou da infalibilidade dos profissionais, os acidentes seriam constantes. O setor se tornou o meio de transporte mais seguro do mundo porque transformou cada falha e cada 'quase acidente' em aprendizado documentado.

Essa mesma filosofia é perfeitamente aplicável a equipes de tecnologia, saúde, finanças e infraestrutura:

1. **Procedimentos bem padronizados (Checklists)** reduzem o estresse e a margem de erro em tarefas críticas (evitando a complacência).
2. **Relatórios Pós-Morte Sem Culpa (Post-Mortems)** encorajam a transparência e impedem que o mesmo problema se repita.
3. **Recomendações Preventivas** transformam falhas passadas em melhorias definitivas de processo (cuidando dos *Near Misses*).

---

## Módulos do Sistema (MVP)

### Módulo A: Procedimentos Operacionais (Checklists / Runbooks)
- **Criador de Templates:** Permite criar checklists estruturados (ex: "Procedimento de Deploy em Produção" ou "Manutenção Preventiva de Servidor").
- **Itens Críticos x Normais:** Diferenciação entre itens obrigatórios (*Memory Items* / Trava de segurança) e itens de conferência padrão.
- **Executor de Checklist:** Interface de execução onde o usuário marca passo a passo. O sistema grava automaticamente o horário (timestamp) e o operador responsável por cada marcação.

### Módulo B: Gestão e Investigação de Incidentes
- **Registro de Incidente/Ocorrência:** Formulário simples para reportar uma falha real ou um "Quase Acidente" (*Near Miss*).
- **Timeline do Incidente:** Mapeamento em linha do tempo (Ex: 14:00 - Alerta emitido | 14:15 - Causa identificada | 14:40 - Serviço restabelecido).
- **Análise de Causa Raiz (RCA):** Formulário guiado usando a metodologia dos **5 Porquês** (para descobrir o fator sistêmico e não apenas o sintoma superficial).

### Módulo C: Recomendações de Segurança (Ações Preventivas)
- **Geração de Action Items:** Vincular tarefas preventivas diretamente ao relatório do incidente.
- **Acompanhamento de Status:** Painel indicando se as recomendações foram implementadas no sistema/empresa.
- **Base de Conhecimento Pública (Lições Aprendidas):** Busca para que qualquer pessoa da equipe possa consultar falhas passadas e como foram resolvidas.

---

## Requisitos Não-Funcionais (Qualidade e Arquitetura)
- **Rastreabilidade:** Todas as alterações em checklists e relatórios de pós-morte devem ter histórico de versão.
- **Facilidade de Uso (UI Simples):** O foco em momentos de crise deve ser a clareza visual (design limpo e responsivo).
- **Segurança e Papéis:** Perfis de *Operador* (executa checklists e abre incidentes) e *Investigador/Admin* (conclui o relatório e aprova recomendações).

---

## Próximos Passos Sugeridos

1. **Estrutura de Banco de Dados:** Mapear as entidades (`User`, `Checklist`, `ChecklistExecution`, `Incident`, `PostMortem`, `Recommendation`).
2. **Definição da Stack:** Escolher as tecnologias. 
3. **Desenvolvimento:** Iniciar a criação das telas e da API com base no MVP.
