# Evidence Ledger — agent-tool-use

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 5(独立来源 5)

## 核心命题
P1: 工具是 LLM agent 与外部世界交互的通道,核心机制是"名称+描述+参数 JSON Schema"+结构化调用
P2: 工具描述是 LLM 选择的唯一依据;参数需最小化;工具结果需验证以防幻觉传播

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Agentic Design Patterns | Antonio Gulli | practitioner | Ch5 | framework | L4 | high |
| Building Applications with AI Agents | Michael Albada | practitioner | Ch4 | framework+case | L4 | high |
| AI Agent 应用开发 | 尹浩 | practitioner | Ch6 | framework+case | L4 | high |
| Build a Multi-Agent System | Val Andrei Fajardo | practitioner | Ch2/5 | framework+case | L4 | high |
| Designing Multi-Agent Systems | Victor Dibia | integrator | Ch4 | framework | L3 | medium |

## 独立证据链
- 链 1: Gulli Ch5(英文,工具三原则:名称清晰/描述精准/参数最少)
- 链 2: Albada Ch4(英文工程实战,Function Calling 落地)
- 链 3: 尹浩 Ch6(中文,Function Calling 作为规划能力章节的关键技术)
- 链 4: Fajardo Ch2/5(从零实现 BaseTool + PydanticFunctionTool,展示接口抽象)
- 链 5: Dibia Ch4(微软,agent=Agent(model, tools, memory) 三元组)

## 支持 / 冲突
- 支持: 5 书一致支持"工具 schema + 结构化调用 + 结果回填"为工具使用的标准范式
- 冲突: 无显著冲突;MCP vs 自建工具的选择已在相邻 skill 中处理

## 适用条件 / 反例
- 适用: 需让 agent 获得外部能力(API/CLI/库)
- 不适用: 纯文本任务(B 段反场景 1);无外部能力需求
- 反例: 工具描述模糊 → LLM 必然误用(x07)
- 边界警告: 工具权限过大 = 安全隐患(与 agent-guardrails 组合)

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)
