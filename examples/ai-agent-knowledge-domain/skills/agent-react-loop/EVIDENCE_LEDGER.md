# Evidence Ledger — agent-react-loop

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: ReAct 是推理与行动交替的循环模式,核心机制是观察结果回填到上下文以修正后续推理
P2: ReAct 适用于多步 + 有工具任务;无工具时降级为 CoT;无终止条件会烧光 token

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Agentic Design Patterns | Antonio Gulli | practitioner | Ch6 | framework | L4 | high |
| AI Agent 开发与应用 | 凌峰 | practitioner | Ch2 | framework | L3 | medium |
| AI Agent 应用开发 | 尹浩 | practitioner | Ch6 | framework+case | L4 | high |
| Build a Multi-Agent System | Val Andrei Fajardo | practitioner | Ch1/4 | framework | L3 | medium |

## 独立证据链
- 链 1: Gulli Ch6(英文工程实战,定义 Thought→Action→Observation 循环)
- 链 2: 尹浩 Ch6(中文实践,Reflexion/Function Calling/ReAct 三大规划能力并列)
- 链 3: Fajardo Ch1/4(从零构建,展示循环如何接入 LLM 与工具)
- 传播链: 凌峰 Ch2(技术框架章节引用,深度依赖他书)

## 支持 / 冲突
- 支持: 4 书一致支持"ReAct = 推理行动交替 + 观察回填"作为核心循环范式
- 冲突: 无显著冲突;CoT vs ReAct 的选择差异已在 B 段以"任务是否需要外部信息"为条件消解

## 适用条件 / 反例
- 适用: 多步任务 + 至少一个可调工具 + 明确的完成信号
- 不适用: 纯文本生成/摘要(B 段反场景 1);单步问答(B 段反场景 2)
- 反例: 无终止条件的循环 → token 烧光(x01)
- 与相邻 skill 区分: agent-planning(先规划后执行)vs ReAct(边想边做);agent-tool-use 是 Action 步骤的前提

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)
