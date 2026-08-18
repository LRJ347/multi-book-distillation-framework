---
name: agent-human-in-the-loop
description: |
  设计人机回环(HITL)。触发: 用户处理高风险决策、设计人工审批点、平衡自动化与人工、处理 agent 需中途澄清时。核心: 在关键决策点嵌入人工确认;定义暂停点/审批流/可回退;风险越高回环越密。不适用: 低风险完全自动化任务。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch13 (L4)
  - Fajardo《Build a Multi-Agent System》Ch8 (L4)
  - Albada《Building Applications with AI Agents》Ch13 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch3 (L3)
semantic_invariants:
  - 必须保留: 高风险决策需人工确认
  - 必须保留: 暂停点需明确定义
  - 必须保留: 回环与自动化需平衡
  - 必须保留: 人工可中断 agent(interruptibility)
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-guardrails, agent-orchestration]
  transitive: []
tags: [human-in-the-loop, approval, automation, risk]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户处理高风险 agent 决策
    - 用户设计审批流/确认点
    - 用户问"哪里该人工干预"
  negative:
    - 低风险全自动任务
    - 用户明确要全自动化
decision_question: "用户是否在 agent 流程中嵌入人工确认/干预点?"
input_required: [任务风险, 审批人, 流程节点]
output_type: HITL 设计方案
confidence:
  high: 风险明确 + 审批人确定
  medium: 风险模糊
  low: 全自动
```

# agent-human-in-the-loop — 人机回环

## R(原文引用)
> "Human-in-the-loop inserts approval checkpoints in agent workflows."——Gulli, Ch13
> "Interruptibility: 用户应能随时中断 agent 任务。"——Dibia, Ch3

## I(方法论骨架)
HITL 在 agent 流程中嵌入人工确认点:高风险决策(财务/医疗/法律)执行前暂停,人工审核/修正后继续。设计要点: ①暂停点选择(风险阈值处);②审批流(谁批/怎么批/超时怎么办);③可回退(错误操作可撤销);④可中断性(用户随时打断,UI 需支持);⑤回环密度平衡(过度回环降低自动化价值)。与 guardrails 的分工: guardrails 用规则自动拦截,HITL 用人工判断高风险点。

## A1(书中案例)
- Fajardo(Ch8): human-in-the-loop 模式实现(agent 请求确认)
- Albada(Ch13): Humans and Agents 伦理/可解释/问责
- Dibia(Ch3): interruptibility 作为四大 UX 原则之一

## A2(触发场景)
- 场景 1: "agent 要替我做付款/发邮件,怕出事" → 审批点
- 场景 2: "agent 卡住等确认,怎么设计交互" → 中断/确认流
- 场景 3: "哪里该人工哪里该自动" → 风险分级

## E(执行步骤)
1. 风险分级(完成标准: 高风险/中/低清单)
2. 选暂停点(完成标准: 高风险决策执行前)
3. 设计审批流(完成标准: 审批人/方式/超时策略)
4. 实现可中断(完成标准: 用户可随时停止任务)
5. 实现可回退(完成标准: 高风险操作可撤销)
6. 自查: ①暂停点合理?②审批不阻塞低风险?③可中断?④可回退?

## B(边界)
- 反场景 1: 低风险任务过度回环 → 自动化价值丧失
- 反场景 2: 高风险任务全自动 → 不可接受
- 作者警告: 回环设计不佳导致用户体验差(等待无反馈)
- 与相邻 skill: agent-guardrails(规则自动拦截 vs 人工判断)

## 相关 skills
- agent-guardrails: 组合(规则闸 + 人工闸)
- agent-orchestration: 组合(多 agent 流程中的确认点)
