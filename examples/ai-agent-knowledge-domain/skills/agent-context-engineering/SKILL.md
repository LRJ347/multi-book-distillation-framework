---
name: agent-context-engineering
description: |
  设计 agent 上下文管理(超越提示工程)。触发: 用户管理 token 预算、设计上下文结构、构建可审计上下文引擎、处理上下文爆炸/成本失控、选择上下文策略时。核心: 上下文是结构化资产(非随意拼接);Planner/Executor/Tracer 可审计架构;Summarizer 压缩;token 预算显式管理。不适用: 短对话无上下文压力。
version: 1.0.0
source_books:
  - Rothman《Context Engineering for Multi-Agent Systems》Ch1-6 (L4)
  - 尹浩《AI Agent 应用开发》Ch4/5 (L4)
  - Albada《Building Applications with AI Agents》Ch6 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch11 (L3)
semantic_invariants:
  - 必须保留: 上下文工程 ≠ 提示工程(结构化管理信息)
  - 必须保留: 上下文需可审计(Glass-Box)
  - 必须保留: token 预算显式管理
  - 必须保留: 压缩不得丢失语义不变量
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-memory-architecture, agent-evaluation]
  transitive: [agent-rag]
tags: [context, token-budget, context-engine, auditability]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户问"上下文怎么管理/成本怎么控制"
    - 用户设计可审计的 agent 信息流
    - 用户遇到上下文爆炸/超限
  negative:
    - 短对话无压力
    - 单 prompt 无需上下文架构
decision_question: "用户是否在系统化管理 agent 的上下文信息(结构/预算/审计)?"
input_required: [信息流特点, 成本约束, 审计要求]
output_type: 上下文管理方案
confidence:
  high: 信息流明确 + 成本约束
  medium: 信息流模糊
  low: 无上下文压力
```

# agent-context-engineering — 上下文工程

## R(原文引用)
> "Context engineering structures, manages, and governs the information LLMs use."——Rothman, Ch1
> "Context Engineering 超越 Prompt Engineering: 语义蓝图(SRL)把提示升格为可审计的结构。"——Rothman, Ch1

## I(方法论骨架)
上下文工程把"提示词"升格为"结构化、可管理、可审计的上下文资产"。核心架构(Rothman Glass-Box Context Engine): ①Planner(接收目标+能力清单→制定计划) ②Executor(执行) ③Tracer(记录执行轨迹,flight recorder) ④AgentRegistry(能力登记)。配套机制: Semantic Blueprint(SRL 结构化)、Context Chaining(步骤间上下文传递)、Summarizer(主动压缩/token 预算)、Dual RAG(procedural+factual 双源)。关键纪律: 上下文是资产不是临时拼接;每一步可追溯。

## A1(书中案例)
- Rothman(Ch4-7): Context Engine 从组装到生产化,NASA 研究助手高保真工作流
- Rothman(Ch9): 同一引擎复用营销领域,证明领域无关
- 尹浩(Ch4/5): RAG 检索增强 + 记忆压缩实践

## A2(触发场景)
- 场景 1: "多 agent 共享上下文怎么管理" → Context Engine 架构
- 场景 2: "token 成本越来越高" → Summarizer + 预算
- 场景 3: "agent 行为不可追溯" → Tracer/Glass-Box

## E(执行步骤)
1. 盘点信息流(完成标准: 哪些信息进上下文、来自哪里)
2. 设计上下文结构(完成标准: 角色/数据/中间结果分区)
3. 选管理架构: 轻量(预算+压缩)vs 完整(Context Engine)(完成标准: 按复杂度选型)
4. 设 token 预算 + Summarizer(完成标准: 超限有压缩路径)
5. 加可审计性: Tracer/日志(完成标准: 每步可追溯)
6. 自查: ①结构清晰?②预算可控?③可审计?④压缩保真?

## B(边界)
- 反场景 1: 短对话 → 不需要完整架构
- 反场景 2: 压缩丢关键信息 → 违反 V4
- 作者警告: 无管理上下文必然爆炸(x02);不可审计 = 黑盒(x11)
- 与相邻 skill: agent-memory-architecture(记忆是上下文的持久层);agent-rag(检索注入上下文)

## 相关 skills
- agent-memory-architecture: 依赖(持久记忆层)
- agent-rag: 组合(检索内容注入)
- agent-evaluation: 组合(上下文质量需评估)
