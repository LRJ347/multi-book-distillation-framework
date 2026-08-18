# Evidence Ledger — agent-mcp-integration

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 5(独立来源 4)

## 核心命题
P1: MCP(Model Context Protocol,Anthropic 提出)标准化 agent-工具连接,是事实标准
P2: MCP 架构分 transport/protocol/message 三层;server 暴露能力,client 调用
P3: MCP 与 A2A 分工不同(MCP 管 agent-工具,A2A 管 agent-agent),协议版本兼容与安全边界需管理

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Gulli《Agentic Design Patterns》 | Antonio Gulli | practitioner | Ch10 | framework | L4 | high |
| Fajardo《Build a Multi-Agent System》 | Fajardo | integrator | Ch5 | framework+case | L4 | high |
| Rothman《Context Engineering for Multi-Agent Systems》 | Rothman | practitioner | Ch2 | framework | L4 | high |
| 尹浩《AI Agent 应用开发》 | 尹浩 | practitioner | Ch8 | case | L4 | medium |
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator | Ch12 | framework | L3 | medium |

## 独立证据链
- 链 1: Gulli(设计模式宏观视角,MCP 在工具接入模式中的位置)
- 链 2: Fajardo(从零实现 MCPTool 接入第三方 MCP 服务器,工程层证据)
- 链 3: Rothman(三层架构定义,transport/protocol/message)
- 链 4: Dibia(progress notifications/elicitation/sampling 扩展能力,微软系)
- 传播链: 尹浩(智能家居助手案例,部分依赖他书框架)

## 支持 / 冲突
- 支持: 5 书一致支持"MCP 是 agent-工具协议,server 暴露能力,client 调用"
- 冲突: 无显著冲突(MCP 与 A2A 分工已是多源共识)

## 适用条件 / 反例
- 适用: 多系统互操作/生态需求/标准化要求
- 不适用: 单一内部函数(反场景 1);agent-agent 协作(反场景 2)
- 反例: 工具输入未净化导致注入(作者警告,与 agent-security-prompt-injection 组合)
- 协议版本不兼容导致调用失败(boundary 测试)

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)