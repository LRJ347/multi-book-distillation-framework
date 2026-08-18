# Evidence Ledger — agent-rag

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: RAG 通过加载→转换→嵌入→存储→检索→生成管道注入外部知识,缓解幻觉与知识过期
P2: RAG 变体分支: 普通 / Dual(procedural+factual 双源)/ GraphRAG / High-fidelity(每条事实带 source citation)
P3: 检索内容不可直接信任,需防投毒;事实性要求高时必须高保真引用

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Rothman《Context Engineering for Multi-Agent Systems》 | Rothman | practitioner | Ch3/7 | framework+case | L4 | high |
| Albada《Building Applications with AI Agents》 | Michael Albada | practitioner | Ch6 | framework | L4 | high |
| 尹浩《AI Agent 应用开发》 | 尹浩 | practitioner | Ch4 | case | L4 | medium |
| 凌峰《AI Agent 开发与应用》 | 凌峰 | practitioner | Ch4 | case | L3 | medium |

## 独立证据链
- 链 1: Rothman(Dual RAG + High-fidelity RAG 原始定义,NASA 研究助手高保真 RAG + input sanitization 案例)
- 链 2: Albada(工程实现视角)
- 链 3: 尹浩(LangChain 实现细节,文档解析/向量存储/检索优化)
- 链 4: 凌峰(LlamaIndex 将非结构化数据转为知识库)

## 支持 / 冲突
- 支持: 4 书一致支持"RAG 注入外部知识缓解幻觉;变体选择由事实性要求决定"
- 冲突: 无显著冲突

## 适用条件 / 反例
- 适用: 知识在外部 + 事实性要求高 + 检索可解释
- 不适用: 知识在模型参数内(反场景 1);低风险无引用要求问答(反场景 2)
- 反例: 向量库被污染误导决策 x04;无来源断言 = 幻觉 x05
- 检索内容注入上下文需与 agent-context-engineering 协同

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)