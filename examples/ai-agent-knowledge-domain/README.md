# AI Agent Knowledge Domain — 实际蒸馏示例

> 这是 MBDF-FLV 框架的**端到端实际应用示例**:11 本 AI Agent 书籍 → 16 个可调用 skill。
> 完整蒸馏链路: 领域骨架扫描 → 多书提取 → 三重筛选 → RIA++ 构造 → V-CONFLICT → 四层验证 → 交付。

## 输入

11 本 AI Agent 书籍(10 个独立来源):

| 来源 | 书名 | 作者角色 |
|---|---|---|
| Wooldridge | An Introduction to MultiAgent Systems | founder |
| Gulli | Agentic Design Patterns | practitioner |
| Albada | Building Applications with AI Agents | practitioner |
| Dibia | Designing Multi-Agent Systems | integrator |
| Rothman | Context Engineering for MAS | practitioner |
| Fajardo | Build a Multi-Agent System from Scratch | practitioner |
| Mahmoud | Multiagent Systems(理论锚点) | integrator |
| 凌峰 | AI Agent 开发与应用 | practitioner |
| 比斯瓦斯 | 构建 Agentic AI 系统 | practitioner |
| 尹浩 | AI Agent 应用开发 | practitioner |

## 产出:16 个 skill(5 簇)

```
核心循环簇: react-loop / reflection-loop / planning / failure-recovery
能力簇:     tool-use / mcp-integration
上下文簇:   memory-architecture / context-engineering / rag
协作簇:     orchestration / multi-agent-theory / ux-design
治理簇:     evaluation / guardrails / human-in-the-loop / security-prompt-injection
```

每个 skill 目录含:
- `SKILL.md` — Skill Card(触发条件)+ RIA++ 六段 + semantic_invariants
- `test-prompts.json` — 8 条压力测试(应调用/诱饵/边界/跨 skill)
- `EVIDENCE_LEDGER.md` — 证据账本(Provenance Trace/独立链)
- `验证报告.md` — 四层验证结果

## 关键文档

| 文件 | 内容 |
|---|---|
| `DOMAIN_OVERVIEW.md` | 领域骨架(议题/术语/evidence_hierarchy) |
| `verified.md` | 16 单元三重筛选理由 |
| `V-CONFLICT.md` | 5 个跨书冲突裁决记录 |
| `INDEX.md` | skill 总览与读取顺序 |
| `KNOWLEDGE_GRAPH.md` | skill 引用关系(mermaid) |
| `GLOSSARY.md` | 50 术语词典 |
| `candidates/` | 191+ 候选素材(框架/原则/案例/反例/术语) |

## 验证状态

所有 skill 为 **CONDITIONAL**:结构验证(V-REF/V4/V-NEG 纸面)PASS;
V-REAL/V-E2E 待真实项目实测后升级 **VERIFIED**。

## 使用方式

1. 读取 `INDEX.md` 选 skill
2. 按 `SKILL.md` 的 Skill Card 触发条件调用
3. 用 `test-prompts.json` 在真实项目验证后升级状态

## 来源完整性说明

- 书籍全文文本(`_source/`)与扫描中间件不入库(版权与体积考虑)
- 候选素材(`candidates/`)保留完整来源标注(书号+章节)供审计
