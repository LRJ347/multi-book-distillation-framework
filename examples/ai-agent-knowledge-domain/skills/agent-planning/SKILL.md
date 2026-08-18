---
name: agent-planning
description: |
  设计 agent 任务规划。触发: 用户需要复杂任务分解、Plan-and-Execute 架构、动态重规划、区分 planning/CoT/reasoning LLM 时。核心: 先规划后执行,规划产出可执行步骤计划而非推理过程;环境动态时需重规划。不适用: 简单单步任务。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch6 (L4)
  - Albada《Building Applications with AI Agents》Ch5 (L4)
  - 尹浩《AI Agent 应用开发》Ch6 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch2 (L3)
  - Fajardo《Build a Multi-Agent System》Ch1 (L3)
semantic_invariants:
  - 必须保留: 规划产出步骤计划(不是推理过程)
  - 必须保留: 计划可动态调整
  - 必须保留: planning ≠ CoT ≠ reasoning LLM
  - 必须保留: 计划需验证可行性
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-react-loop, agent-orchestration]
  transitive: []
tags: [agent, planning, plan-execute, decomposition]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户处理复杂多步任务
    - 用户问 planning 与 CoT 的区别
    - 用户设计 Plan-and-Execute 流程
  negative:
    - 简单单步任务
    - 纯推理任务(用 CoT)
decision_question: "用户是否在让 agent 先制定步骤计划再执行复杂任务?"
input_required: [任务描述, 环境动态性, 可执行步骤能力]
output_type: 规划方案(计划结构/重规划策略)
confidence:
  high: 复杂任务 + 可执行步骤
  medium: 任务复杂但步骤模糊
  low: 单步任务
```

# agent-planning — 任务规划

## R(原文引用)
> "Planning separates the generation of a step-by-step plan from execution."——Gulli, Ch6
> "规划能力包括 CoT、Self-Ask、Reflexion、Function Calling、ReAct、Plan-and-Execute、Self-Discover。"——尹浩, Ch6

## I(方法论骨架)
规划让 agent 在执行前先制定步骤计划,再把计划逐步执行。与 CoT 的区别:CoT 产出推理链(思考过程),规划产出可执行步骤(动作序列);与 reasoning LLM 的区别:reasoning 是模型内置的思考能力,规划是显式架构模式。Plan-and-Execute: ①生成计划(步骤列表) ②逐步执行(每步可调用工具) ③动态调整(环境变化时重规划)。复杂任务计划本身可分层/并行。

## A1(书中案例)
- Gulli(Ch6): Planning 模式与 ReAct 对比,展示显式计划生成
- 尹浩(Ch6): Plan-and-Execute 与 Self-Discover 等规划技术对比

## A2(触发场景)
- 场景 1: "任务太复杂,agent 边想边做很乱" → Plan-and-Execute
- 场景 2: "环境变化后计划失效" → 重规划策略
- 场景 3: "planning/CoT/reasoning 怎么选" → 模式选型

## E(执行步骤)
1. 判断任务复杂度(完成标准: 是否需多步规划)
2. 生成计划(步骤列表,每步可执行)(完成标准: 步骤有完成标准)
3. 选择执行模式: 顺序/分层/并行(完成标准: 明确依赖关系)
4. 定义重规划触发条件(完成标准: 环境变化/步骤失败时重规划)
5. 执行+验证(完成标准: 每步验证结果再继续)
6. 自查: ①计划可执行?②依赖正确?③重规划有触发?④计划与执行分离?

## B(边界)
- 反场景 1: 简单单步任务 → 直接执行
- 反场景 2: 纯推理任务 → CoT
- 作者警告: 规划产出不可执行步骤 = 空计划;环境高度动态时计划频繁失效
- 与相邻 skill: agent-react-loop(边想边做 vs 先规划后做)

## 相关 skills
- agent-react-loop: 对比(planning 先行 vs ReAct 交替)
- agent-orchestration: 组合(多 agent 计划可分配到各 agent)
