---
name: agent-orchestration
description: |
  设计多智能体编排架构。触发: 用户决定单 agent vs 多 agent、选择编排拓扑(workflow/autonomous)、设计 orchestrator、处理多 agent 协调问题时。核心: 编排谱系从确定性 workflow(sequential/conditional/parallel)到自主编排(plan-based/handoff/conversation-driven);先单 agent,需要时才升级。不适用: 简单任务(单 agent 更优)。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch7 (L4)
  - Albada《Building Applications with AI Agents》Ch8 (L4)
  - 比斯瓦斯《构建 Agentic AI 系统》Ch6 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch2/6/7 (L4)
  - 尹浩《AI Agent 应用开发》Ch7 (L4)
  - Wooldridge《An Introduction to MultiAgent Systems》Ch8 (L4)
semantic_invariants:
  - 必须保留: 多 agent 不是默认选择(简单任务单 agent 更优)
  - 必须保留: workflow 与 autonomous 是谱系两端
  - 必须保留: orchestrator 循环需终止条件
  - 必须保留: 协调有开销(通信/冲突/重复)
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-multi-agent-theory, agent-react-loop]
  transitive: [agent-ux-design]
tags: [multi-agent, orchestration, workflow, autonomous]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户问"该用单 agent 还是多 agent"
    - 用户设计 agent 编排/协调架构
    - 用户处理多 agent 冲突/死锁
  negative:
    - 简单单步任务
    - 用户已确定单 agent
decision_question: "用户是否在决定或设计多个 agent 如何协作完成任务的架构?"
input_required: [任务描述, 可分解性子任务, 角色需求]
output_type: 编排架构建议(拓扑/角色/协调机制)
confidence:
  high: 任务复杂且可分解 + 有明确角色
  medium: 任务复杂但分解模糊
  low: 简单任务
```

# agent-orchestration — 多智能体编排

## R(原文引用)
> "多智能体系统从确定性工作流到自主涌现编排构成一个谱系。"——Dibia, Ch2
> "协调模式包括 democratic / manager / hierarchical / actor-critic。"——Albada, Ch8
> "CWD 模型: 协调者协调,工作者执行,委派者委派任务。"——比斯瓦斯, Ch6

## I(方法论骨架)
多智能体编排的核心是**在确定性(workflow)与自主性(autonomous)之间选择谱系位置**:workflow 是确定性计算图(sequential/conditional/parallel,类型安全、可恢复、可观测);autonomous 是涌现行为(orchestrator 循环: select→execute→check terminate→repeat,支持 plan-based/round-robin/handoff/conversation-driven)。关键决策:①任务是否值得多 agent(简单任务单 agent 更优,有实证);②编排拓扑;③协调机制(Contract Net 招标 / CWD 三角 / orchestrator);④终止条件与恢复。

## A1(书中案例)
- Dibia(Ch6/7): picoagents 实现 workflow(确定性图+checkpoint)与 autonomous(orchestrator 循环)两种编排
- 比斯瓦斯(Ch6): CWD 模式处理安全可控的多智能体协作
- Wooldridge(Ch8): Contract Net 协议作为经典任务分配机制

## A2(触发场景)
- 场景 1: "我的任务要多个 agent 协作,该怎么设计" → 编排拓扑选型
- 场景 2: "多 agent 系统卡死了/任务重复执行" → 协调机制检查
- 场景 3: "单 agent 还是多 agent 好" → 决策框架

## E(执行步骤)
1. 判断任务是否需要多 agent(完成标准: 列出任务分解收益 vs 协调开销)
2. 选拓扑: workflow(确定性需求)→ sequential/conditional/parallel;autonomous(动态)→ orchestrator 循环(完成标准: 明确拓扑)
3. 设计角色与分工(完成标准: 每 agent 有明确职责边界)
4. 选协调机制: 编排器 / CWD / Contract Net(完成标准: 明确冲突解决规则)
5. 设终止条件 + checkpoint 恢复(完成标准: 无死循环,可恢复)
6. 自查: ①多 agent 必要?②拓扑匹配任务?③协调开销可控?④可观测?

## B(边界)
- 反场景 1: 简单任务 → 单 agent(x13 过度工程)
- 反场景 2: 任务不可分解 → 多 agent 无收益
- 作者警告: 无终止条件死循环(x01);多 agent 冲突死锁(x08)
- 与相邻 skill: agent-multi-agent-theory(理论: 博弈/通信);agent-ux-design(用户如何感知多 agent)

## 相关 skills
- agent-multi-agent-theory: 依赖(理论: 通信/博弈/机制)
- agent-ux-design: 组合(多 agent 需要 UX 原则)
- agent-react-loop: 组合(每 agent 内部可用 ReAct)
