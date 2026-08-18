# Evidence Ledger — agent-human-in-the-loop

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: 高风险 agent 决策必须保留人工确认点(checkpoint)
P2: 回环密度需与风险等级匹配,过度回环会吞噬自动化价值

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Gulli《Agentic Design Patterns》 | Antonio Gulli | practitioner | Ch13 | framework | L4 | high |
| Fajardo《Build a Multi-Agent System》 | Victor Fajardo | practitioner | Ch8 | framework+case | L4 | high |
| Albada《Building Applications with AI Agents》 | Michael Albada | practitioner | Ch13 | framework | L4 | high |
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator | Ch3 | framework | L3 | high |

## 独立证据链
- 链 1: Gulli — 21 类设计模式中显式列入 HITL(Ch13)
- 链 2: Fajardo — 工程视角 human-in-the-loop 模式落地,agent 请求确认实现
- 链 3: Albada — 应用层视角"人与代理"的伦理/可解释/问责
- 链 4: Dibia — 微软 UX 视角将 interruptibility 列入四大 UX 原则之一

## 支持 / 冲突
- 支持: 4 书均明确支持"高风险决策需人工确认"
- 冲突: 无显著冲突;Fajardo 偏工程实现,Albada 偏伦理/问责,Gulli 偏模式分类,Dibia 偏交互原则,角度互补
- 弱张力: Dibia 把 interruptibility 列入 UX 范畴,本 skill 与 agent-ux-design 的可中断性有概念交叉——已通过"语义不变量"保留各自职责

## 适用条件 / 反例
- 适用: 高风险决策(财务/医疗/法律/对外通讯);多步骤长流程;用户希望掌控关键节点
- 不适用: 低风险全自动任务(B 段反场景 1);用户明确要求零中断
- 反例: 高风险任务完全无人介入(B 段反场景 2)→ 不可接受;回环设计差导致用户长时间无反馈等待(作者警告)
- 与相邻 skill 边界: 与 agent-guardrails 的分工——guardrails 是规则自动拦截(无人在回路),HITL 是人工判断闸(高风险点),二者串联为"规则闸 + 人工闸"双闸防御

## 验证结果(阶段 6 待填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证;语义不变量已锁定 4 条核心不变式)