---
name: agent-react-loop
description: |
  判断并应用 ReAct(推理-行动)循环模式构建/改进 LLM agent。触发: 用户在设计 agent 主循环、处理多步推理任务、调试 agent 不行动或乱行动、选择 CoT vs ReAct 时。核心: 推理(Thought)→ 行动(Action)→ 观察(Observation)交替循环,让 LLM 通过工具结果修正后续推理。不适用: 纯文本生成任务(用 CoT)、无工具环境。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch6 (L4)
  - 凌峰《AI Agent 开发与应用》Ch2 (L3)
  - 尹浩《AI Agent 应用开发》Ch6 (L4)
  - Fajardo《Build a Multi-Agent System》Ch1/4 (L3)
semantic_invariants:
  - 必须保留: ReAct = 推理与行动交替(不是纯推理)
  - 必须保留: 观察结果必须回填到上下文
  - 必须保留: 循环需有终止条件
  - 必须保留: 无工具时降级为纯推理
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-planning, agent-tool-use]
  transitive: [agent-reflection-loop]
tags: [agent, react, reasoning, tool-use, pattern]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户在设计/调试 agent 的推理-行动主循环
    - 用户问"如何让 agent 多步推理并调用工具"
    - 用户对比 CoT 与 ReAct
  negative:
    - 纯文本生成/摘要任务(不需要工具交互)
    - 单步问答
decision_question: "用户的问题是否涉及 agent 需要交替推理与工具行动的任务循环?"
input_required: [任务描述, 可用工具列表(如有), 循环终止条件]
output_type: ReAct 循环设计建议/实现指导
confidence:
  high: 有明确工具列表 + 多步任务
  medium: 多步推理但无外部工具
  low: 单步任务
```

# agent-react-loop — ReAct 循环模式

## R(原文引用)
> "ReAct 模式让 LLM 在推理与行动间交替,通过观察工具结果修正后续推理。"——Gulli, Ch6
> "ReAct 是一种将推理和行动结合的模式,agent 思考下一步动作,执行工具调用,观察结果后继续。"——尹浩, Ch6

## I(方法论骨架)
ReAct 的核心是**推理与行动的交替循环**:agent 不是先想完再执行,而是在"思考 → 行动 → 观察"之间循环,每一步的行动结果反馈给下一步的思考。这与 Chain-of-Thought(纯推理)的关键区别在于:ReAct 有**外部世界的信息回填**。标准循环为:Thought(当前状态推理)→ Action(选择工具+JSON 参数)→ Observation(工具返回)→ 重复,直到任务完成或触发终止条件。

## A1(书中案例)
- 尹浩(Ch6): 规划能力章节展示 ReAct 处理需要外部查询的任务,agent 交替推理与工具调用直至答案完整
- 凌峰(Ch2): 技术框架章节将 ReAct 列为大模型驱动 agent 的核心技术栈组件

## A2(触发场景)
- 场景 1: 用户说"我的 agent 只会一次性回答,不会查资料/调工具" → ReAct 循环缺失
- 场景 2: 用户问"ReAct 和 CoT 有什么区别,我该用哪个" → 模式选型
- 场景 3: 用户设计多步骤任务(订票/查询/下单)的主循环 → 循环设计

## E(执行步骤)
1. 确认任务是否需要外部信息(工具/查询)(完成标准: 列出所需信息源)
2. 定义工具 schema(名称/描述/参数,见 agent-tool-use)(完成标准: 每个工具可被 LLM 正确调用)
3. 构建循环: Thought → Action → Observation(完成标准: 观察结果注入上下文)
4. 设定终止条件: 任务完成 / 最大轮次 / 用户打断(完成标准: 无死循环)
5. 无工具环境降级为 CoT(完成标准: 明确降级路径)
6. 自查: ①推理是否利用观察结果?②循环有界?③工具描述清晰?

## B(边界)
- 反场景 1: 纯文本生成/摘要 → 用 CoT 而非 ReAct
- 反场景 2: 单步问答 → 不需要循环
- 作者警告: 无终止条件的 ReAct 会烧光 token(见 counter-example x01)
- 与相邻 skill: agent-planning(先规划后执行)vs ReAct(边想边做);agent-tool-use(工具定义)是 ReAct 的前提

## 相关 skills
- agent-tool-use: 依赖(工具 schema 是 Action 的基础)
- agent-planning: 对比(规划先行 vs 边想边做)
- agent-reflection-loop: 组合(反思可嵌入 ReAct 循环后)
