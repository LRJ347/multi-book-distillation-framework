# Evidence Ledger — agent-memory-architecture

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 5(独立来源 5)

## 核心命题
P1: 记忆分三层(短期/长期/向量),核心纪律是上下文窗口 ≠ 记忆,长期记忆需显式存储
P2: 记忆需写入/检索/淘汰/压缩四策略;无淘汰 = 污染;依赖上下文窗口代替记忆 = 成本失控

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Agentic Design Patterns | Antonio Gulli | practitioner | Ch8 | framework | L4 | high |
| Building Applications with AI Agents | Michael Albada | practitioner | Ch6 | framework | L4 | high |
| AI Agent 应用开发 | 尹浩 | practitioner | Ch5 | framework+case | L4 | high |
| Build a Multi-Agent System | Val Andrei Fajardo | practitioner | Ch7 | framework | L3 | medium |
| Designing Multi-Agent Systems | Victor Dibia | integrator | Ch4 | framework | L3 | medium |

## 独立证据链
- 链 1: Gulli Ch8(英文,短/长/向量三分定义)
- 链 2: Albada Ch6(英文工程谱系:上下文窗口/关键词/向量库/RAG/GraphRAG/白板)
- 链 3: 尹浩 Ch5(中文,MemGPT 实践与框架源码解析,token 计数 + 手动 Memory)
- 链 4: Fajardo Ch7(从零构建,记忆存储实现)
- 链 5: Dibia Ch4(微软,Agent=Agent(model, tools, memory) 中的 memory 参数)

## 支持 / 冲突
- 支持: 5 书一致支持"显式记忆系统 + 分层管理 + 淘汰机制"为核心架构
- 冲突: 无显著冲突;RAG vs GraphRAG 的选择差异在 Albada Ch6 中以场景区分

## 适用条件 / 反例
- 适用: 跨会话上下文 + 长对话 + 个性化需求
- 不适用: 无状态单次任务(B 段反场景 1);短会话无需持久记忆
- 反例: 记忆无淘汰 → 污染误导(x15);依赖上下文窗口代替记忆 = 成本失控(x02)
- 关键纪律: 上下文窗口是工作空间不是记忆,记忆有写入成本(token/延迟)

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)
