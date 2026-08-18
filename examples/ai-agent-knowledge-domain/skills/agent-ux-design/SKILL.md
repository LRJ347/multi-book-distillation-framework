---
name: agent-ux-design
description: |
  设计多智能体系统的用户体验。触发: 用户构建 agent UI、设计能力发现/委派交互、实现可观测性/可中断性、处理长任务 UX 时。核心: 四大 UX 原则(capability discovery/cost-aware delegation/observability/interruptibility);流式展示进度;双组件架构(后端 API + 前端 UI)。不适用: 无 UI 的后台 agent。
version: 1.0.0
source_books:
  - Dibia《Designing Multi-Agent Systems》Ch3/8 (L4)
  - Albada《Building Applications with AI Agents》Ch3 (L3)
semantic_invariants:
  - 必须保留: 用户需知道 agent 能做什么(能力发现)
  - 必须保留: 委派需成本感知
  - 必须保留: 进度需可观测(流式)
  - 必须保留: 用户可中断
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-orchestration, agent-human-in-the-loop]
  transitive: []
tags: [ux, multi-agent, interface, observability, delegation]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户构建 agent 界面
    - 用户设计能力发现/委派交互
    - 用户处理长任务进度展示
  negative:
    - 无 UI 的后台 agent
    - CLI/API 内部使用
decision_question: "用户是否在为用户设计使用多 agent 系统的界面/交互?"
input_required: [用户类型, 交互场景, 任务时长]
output_type: UX 设计方案
confidence:
  high: 用户与场景明确
  medium: 场景模糊
  low: 无 UI
```

# agent-ux-design — 多智能体 UX

## R(原文引用)
> "Four UX principles: capability discovery, cost-aware delegation, observability & provenance, interruptibility."——Dibia, Ch3
> "Agent applications stream progress: text/code as generated, which tool is running, what came back."——Dibia, Ch8

## I(方法论骨架)
多 agent 系统的 UX 与普通软件不同:任务运行分钟到小时,用户不能盯着 spinner。四大原则: ①能力发现(用户知道 agent 能做什么/不能做什么);②成本感知委派(委派前提示成本);③可观测性(流式展示进度: 文本/工具调用/中间结果,谁在说话、贡献了什么);④可中断性(随时停止/调整)。架构: 后端(agent 执行+API)+ 前端(UI),用 SSE/WebSocket 流式通信;长任务需两阶段(启动即反馈 → 完成通知)。

## A1(书中案例)
- Dibia(Ch8): 用 FastAPI+SSE 实现 agent Web 应用,展示流式进度与能力发现
- Albada(Ch3): UX 设计(交互模态/同步异步/上下文/信任)

## A2(触发场景)
- 场景 1: "用户看不到 agent 在干嘛" → 流式进度
- 场景 2: "用户不知道 agent 能做什么" → 能力发现
- 场景 3: "长任务等太久" → 异步+通知

## E(执行步骤)
1. 用户与场景分析(完成标准: 用户类型/任务时长/交互频次)
2. 能力发现设计(完成标准: UI 展示 agent 能力清单)
3. 委派交互设计(完成标准: 成本提示 + 确认)
4. 可观测性实现(完成标准: 流式进度/工具调用可见)
5. 可中断性实现(完成标准: 停止/调整控件)
6. 自查: ①四原则覆盖?②流式通信?③长任务有反馈?④中断可用?

## B(边界)
- 反场景 1: 后台无 UI → 不需要
- 反场景 2: 短任务过度设计 → 简单进度即可
- 作者警告: 无反馈的长任务让用户以为卡死;不可中断让用户失去控制
- 与相邻 skill: agent-human-in-the-loop(审批点也是 UX 交互);agent-orchestration(编排决定展示什么)

## 相关 skills
- agent-orchestration: 依赖(编排产生 UX 数据)
- agent-human-in-the-loop: 组合(确认点 UI)
