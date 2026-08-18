---
name: agent-mcp-integration
description: |
  通过 MCP(Model Context Protocol)接入工具与资源。触发: 用户集成外部工具/数据源、选择 MCP vs 自建工具、处理 MCP 协议问题、对比 MCP/A2A 时。核心: MCP 标准化 agent-工具连接(transport/protocol/message);server 暴露能力,client 调用。不适用: 无外部工具需求、纯内部函数。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch10 (L4)
  - Fajardo《Build a Multi-Agent System》Ch5 (L4)
  - Rothman《Context Engineering for Multi-Agent Systems》Ch2 (L4)
  - 尹浩《AI Agent 应用开发》Ch8 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch12 (L3)
semantic_invariants:
  - 必须保留: MCP 是 agent-工具协议(非 agent-agent)
  - 必须保留: 工具经 server 暴露,client 调用
  - 必须保留: 协议版本兼容性需管理
  - 必须保留: 安全边界(权限/认证)需配置
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-tool-use, agent-orchestration]
  transitive: [agent-security-prompt-injection]
tags: [mcp, protocol, tools, integration, a2a]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户集成外部工具/数据源到 agent
    - 用户问 MCP 与自建工具/API 的取舍
    - 用户对比 MCP 与 A2A
  negative:
    - 无外部工具需求
    - 内部函数无需协议化
decision_question: "用户是否在通过标准协议(MCP)为 agent 接入外部工具或资源?"
input_required: [外部能力, 运行环境, 安全要求]
output_type: MCP 接入方案
confidence:
  high: 外部能力明确 + 安全要求清楚
  medium: 能力明确但协议选型待定
  low: 无外部能力
```

# agent-mcp-integration — MCP 接入

## R(原文引用)
> "MCP standardizes how agents connect to tools and resources."——Fajardo, Ch5
> "MCP 架构包括 transport、protocol、message 三层,是 agent 工具接入的事实标准。"——Rothman, Ch2

## I(方法论骨架)
MCP(Model Context Protocol,Anthropic 提出)把工具/资源接入标准化:能力提供方实现 MCP server(暴露工具/资源/提示),agent 通过 MCP client 调用。架构: transport(stdio/HTTP/SSE)→ protocol(消息类型: initialize/tools/list/tools/call)→ message(JSON-RPC)。优势: 一次实现多处复用、生态互操作。与 A2A 的分工: MCP 管 agent-工具,A2A 管 agent-agent。集成要点: 协议版本管理、安全边界(认证/权限)、错误处理。

## A1(书中案例)
- Fajardo(Ch5): 从零实现 MCPTool 接入第三方 MCP 服务器
- 尹浩(Ch8): 智能家居助手通过 MCP 接入设备控制
- Dibia(Ch12): MCP progress notifications/elicitation/sampling 能力

## A2(触发场景)
- 场景 1: "agent 要调外部系统,怎么接入" → MCP server/client
- 场景 2: "MCP 还是自己封装 API" → 协议选型
- 场景 3: "多个 agent 都要用同一批工具" → MCP server 复用

## E(执行步骤)
1. 确认外部能力(完成标准: 能力清单+调用方式)
2. 选 MCP vs 自建(完成标准: 多系统互操作/生态需求 → MCP;单一内部 → 自建)
3. 实现/接入 MCP server(完成标准: 工具暴露,描述清晰)
4. 配置 client 与安全边界(完成标准: 认证/权限/网络边界)
5. 测试工具调用(完成标准: 端到端调用成功,错误可处理)
6. 自查: ①协议版本匹配?②安全边界?③错误处理?④性能(连接复用)?

## B(边界)
- 反场景 1: 单一内部函数 → 直接封装,无需 MCP
- 反场景 2: agent-agent 协作 → 用 A2A 而非 MCP
- 作者警告: MCP 工具是外部输入,需防注入(与 agent-security-prompt-injection 组合)
- 与相邻 skill: agent-tool-use(工具设计原则适用于 MCP 工具)

## 相关 skills
- agent-tool-use: 依赖(工具设计原则)
- agent-orchestration: 组合(多 agent 共享 MCP 工具)
- agent-security-prompt-injection: 组合(MCP 工具输入需净化)
