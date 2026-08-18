---
name: agent-reflection-loop
description: |
  应用反思(Reflection/Reflexion)循环改进 agent 输出质量。触发: 用户需要提高代码/写作/推理输出质量、设计自我评估机制、处理"输出差但不知道哪里差"的问题时。核心: 生成→评估→修正循环,可内置自评或外部批评者。不适用: 无法客观自评的任务、低风险简单输出。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch4 (L4)
  - 比斯瓦斯《构建 Agentic AI 系统》Ch4 (L4)
  - 尹浩《AI Agent 应用开发》Ch6 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch7 (L3)
semantic_invariants:
  - 必须保留: 反思是循环(不是单次检查)
  - 必须保留: 需迭代上限(防过度反思)
  - 必须保留: 评估者可与生成者分离
  - 必须保留: 无法自评时需外部评估
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-react-loop, agent-evaluation]
  transitive: []
tags: [agent, reflection, metacognition, quality]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户问"如何让 agent 输出质量更高"
    - 用户设计自我评估/批评者机制
    - 代码/写作 agent 需要迭代修正
  negative:
    - 低风险简单输出
    - 无法客观评估的任务(无标准)
decision_question: "用户是否在寻求让 agent 评估并改进自身输出的机制?"
input_required: [任务类型, 可用的评估标准/批评者]
output_type: 反思循环设计
confidence:
  high: 有明确评估标准
  medium: 可自评但标准模糊
  low: 无法客观评估
```

# agent-reflection-loop — 反思循环模式

## R(原文引用)
> "Reflection 模式使 agent 能够评估自身输出并迭代改进。"——Gulli, Ch4
> "反思与内省能力是智能体的元认知,包括元推理、自我解释、自我建模。"——比斯瓦斯, Ch4

## I(方法论骨架)
反思循环让 agent 成为自己的批评者:生成输出后,通过内部自评或外部批评者评估,根据评估结果修正,再重复。关键设计点:①评估标准(什么算"好");②迭代上限(防止无界反思浪费 token 且可能震荡);③评估者与生成者是否分离(分离更客观但成本高)。Reflexion(Y/尹浩)是其变体:不仅修正输出,还把失败经验写入记忆供未来参考。

## A1(书中案例)
- Gulli(Ch4): Reflection 作为核心模式,展示代码生成后自评修正
- 尹浩(Ch6): Reflexion 作为规划能力章节的独立技术,展示失败经验回写

## A2(触发场景)
- 场景 1: "我的 agent 生成的代码有 bug 但不知道哪里错" → 反思+批评者
- 场景 2: "怎么让写作 agent 输出更符合要求" → 反思循环
- 场景 3: "反思循环会不会太慢/太贵" → 迭代上限设计

## E(执行步骤)
1. 定义评估标准(完成标准: 可判定"好/差"的 checklist)
2. 选择评估者: 自评 / 外部批评者 / LLM 评判(完成标准: 明确评估者)
3. 构建循环: 生成 → 评估 → 修正(完成标准: 评估结果注入下一轮)
4. 设定迭代上限(默认 3 轮)(完成标准: 无死循环)
5. 可选: 失败经验写入记忆(Reflexion 变体)(完成标准: 经验可检索)
6. 自查: ①有评估标准?②有迭代上限?③修正是否利用评估?

## B(边界)
- 反场景 1: 无法客观评估的任务(无标准)→ 用外部专家
- 反场景 2: 低风险简单输出 → 直接输出
- 作者警告: 过度反思浪费 token 且可能越改越差(x10)
- 与相邻 skill: agent-evaluation(系统评估 vs 单次反思);agent-react-loop(反思可嵌入 ReAct 循环)

## 相关 skills
- agent-evaluation: 依赖(评估标准设计)
- agent-react-loop: 组合(反思嵌入 ReAct 循环后)
