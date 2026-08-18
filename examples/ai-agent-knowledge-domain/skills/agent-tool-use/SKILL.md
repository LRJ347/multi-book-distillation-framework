---
name: agent-tool-use
description: |
  设计 agent 工具调用能力。触发: 用户定义工具 schema、处理 LLM 误用工具、集成外部 API/工具、选择 MCP vs 自建工具时。核心: 工具=名称+描述+参数 schema;描述是 LLM 选工具的依据;参数最小化;JSON 结构化调用。不适用: 无需外部能力的纯生成任务。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch5 (L4)
  - Albada《Building Applications with AI Agents》Ch4 (L4)
  - 尹浩《AI Agent 应用开发》Ch6 (L4)
  - Fajardo《Build a Multi-Agent System》Ch2/5 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch4 (L3)
semantic_invariants:
  - 必须保留: 工具描述是 LLM 选择依据
  - 必须保留: 参数需最小化且类型明确
  - 必须保留: 工具调用是结构化输出(JSON)
  - 必须保留: 工具结果需验证
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-react-loop, agent-mcp-integration]
  transitive: []
tags: [agent, tool-use, function-calling, schema]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户定义/设计 agent 工具
    - 用户遇到 LLM 误用工具/参数错误
    - 用户集成外部 API 为工具
  negative:
    - 纯文本任务
    - 无外部能力需求
decision_question: "用户是否在让 agent 获得调用外部能力(工具)的能力或解决工具调用问题?"
input_required: [外部能力清单, 调用方式(API/CLI/库)]
output_type: 工具 schema 设计 + 调用流程
confidence:
  high: 能力清单明确
  medium: 能力模糊需澄清
  low: 无外部能力
```

# agent-tool-use — 工具使用

## R(原文引用)
> "Tool use enables agents to interact with external systems via structured calls."——Fajardo, Ch2
> "工具设计的关键是让 LLM 能正确选择与调用:名称清晰、描述精准、参数最少。"——Gulli, Ch5

## I(方法论骨架)
工具使用是 LLM agent 与外部世界交互的通道。核心机制:工具暴露为"名称+描述+参数 JSON Schema",LLM 通过结构化输出(JSON)声明要调用的工具与参数,系统执行后把结果回填上下文。设计三原则:①名称表达意图;②描述是 LLM 选择的唯一依据(必须写清何时用/何时不用);③参数最小化(每个参数有明确类型与说明)。工具结果需验证(失败重试/错误处理),防止幻觉传播。

## A1(书中案例)
- Fajardo(Ch2/5): 从零实现 BaseTool 抽象 + PydanticFunctionTool,展示工具接口设计
- 尹浩(Ch6): Function Calling 作为规划能力章节的关键技术
- Dibia(Ch4): agent = Agent(model, tools, memory) 抽象中 tools 是核心参数

## A2(触发场景)
- 场景 1: "我的 agent 老调错工具/参数" → 检查工具描述与 schema
- 场景 2: "怎么把内部 API 给 agent 用" → 工具封装
- 场景 3: "工具太多 agent 选不过来" → 工具分组/路由

## E(执行步骤)
1. 列出外部能力(完成标准: 能力清单)
2. 为每个能力定义工具: 名称/描述/参数 schema(完成标准: 描述含"何时用/不用")
3. 参数最小化(完成标准: 无冗余参数,类型明确)
4. 集成调用: 执行→结果回填→错误处理(完成标准: 失败有重试/降级)
5. 测试误用率(完成标准: 多轮测试工具选择准确)
6. 自查: ①描述精准?②参数最少?③结果验证?④错误处理?

## B(边界)
- 反场景 1: 无外部能力需求 → 不需要工具
- 反场景 2: 工具描述模糊 → 必然误用(x07)
- 作者警告: 工具权限过大是安全隐患(与 agent-guardrails 组合)
- 与相邻 skill: agent-mcp-integration(MCP 是工具接入的标准协议);agent-react-loop(ReAct 的 Action 步骤调用工具)

## 相关 skills
- agent-mcp-integration: 依赖(MCP 标准化工具接入)
- agent-react-loop: 组合(工具调用在 ReAct 循环中)
- agent-guardrails: 组合(工具权限控制)
