# Evidence Ledger — agent-planning

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 5(独立来源 5)

## 核心命题
P1: 规划产出可执行步骤计划(动作序列),而非推理过程;环境动态时需重规划
P2: planning ≠ CoT ≠ reasoning LLM;三者是不同概念层(架构/推理链/模型内置能力)

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Agentic Design Patterns | Antonio Gulli | practitioner | Ch6 | framework | L4 | high |
| Building Applications with AI Agents | Michael Albada | practitioner | Ch5 | framework | L4 | high |
| AI Agent 应用开发 | 尹浩 | practitioner | Ch6 | framework | L4 | high |
| Designing Multi-Agent Systems | Victor Dibia | integrator | Ch2 | framework | L3 | medium |
| Build a Multi-Agent System | Val Andrei Fajardo | practitioner | Ch1 | framework | L3 | medium |

## 独立证据链
- 链 1: Gulli Ch6(英文,Planning 模式与 ReAct 对比,显式计划生成)
- 链 2: Albada Ch5(英文工程实战,Plan-and-Execute 架构)
- 链 3: 尹浩 Ch6(中文,规划能力 7 子项谱系:CoT/Self-Ask/Reflexion/FC/ReAct/P&E/Self-Discover)
- 链 4: Dibia Ch2(微软,模式谱系中的 Planning)
- 链 5: Fajardo Ch1(从零构建,Plan-and-Execute 入门)

## 支持 / 冲突
- 支持: 5 书一致支持"先规划后执行 + 步骤可执行 + 环境动态重规划"为核心范式
- 冲突: 无显著冲突;planning 与 CoT 的边界已在 I 段显式区分(动作序列 vs 推理链)

## 适用条件 / 反例
- 适用: 复杂多步任务 + 步骤明确可执行 + 环境动态需调整
- 不适用: 简单单步任务(B 段反场景 1);纯推理任务(B 段反场景 2,用 CoT)
- 反例: 规划产出不可执行步骤 = 空计划;环境高度动态 → 计划频繁失效
- 与相邻 skill 区分: agent-react-loop(边想边做 vs 先规划后做);多 agent 计划可分配到各 agent(orchestration 组合)

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)
