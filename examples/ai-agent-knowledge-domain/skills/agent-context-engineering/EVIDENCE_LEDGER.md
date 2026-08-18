# Evidence Ledger — agent-context-engineering

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: 上下文工程超越提示工程,把提示升格为可审计的结构化资产
P2: Rothman Glass-Box Context Engine 核心组件: Planner/Executor/Tracer/AgentRegistry + Summarizer + token 预算
P3: 上下文需可审计(Glass-Box),压缩不得丢失语义不变量

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Rothman《Context Engineering for Multi-Agent Systems》 | Rothman | practitioner | Ch1-6 | framework+case | L4 | high |
| 尹浩《AI Agent 应用开发》 | 尹浩 | practitioner | Ch4/5 | case | L4 | medium |
| Albada《Building Applications with AI Agents》 | Michael Albada | practitioner | Ch6 | framework | L4 | high |
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator | Ch11 | framework | L3 | medium |

## 独立证据链
- 链 1: Rothman(Glass-Box Context Engine 原始定义 + NASA 研究助手案例,领域无关复用至营销)
- 链 2: Albada(工程生命周期视角的上下文管理)
- 链 3: Dibia(架构模式补充)
- 传播链: 尹浩(RAG 检索增强 + 记忆压缩实践,部分依赖他书)

## 支持 / 冲突
- 支持: 4 书一致支持"上下文工程 ≠ 提示工程,需结构化/可审计"
- 冲突: 无显著冲突

## 适用条件 / 反例
- 适用: 多 agent 协作/token 成本压力/可追溯性要求
- 不适用: 短对话(反场景 1);单 prompt(负触发)
- 反例: 上下文爆炸 x02(无管理必然爆炸);不可审计 = 黑盒 x11
- 压缩丢关键信息(违反 V4 semantic_invariants)

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)