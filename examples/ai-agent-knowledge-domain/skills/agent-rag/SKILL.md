---
name: agent-rag
description: |
  设计 agent 检索增强(RAG)方案。触发: 用户构建知识库检索、选择 RAG 变体(普通/Dual/Graph/高保真)、处理检索质量/幻觉、设计 agentic RAG 时。核心: RAG 注入外部知识;Dual RAG 分流程/事实双源;高保真 RAG 每条事实带引用;防投毒。不适用: 无需外部知识的任务。
version: 1.0.0
source_books:
  - Rothman《Context Engineering for Multi-Agent Systems》Ch3/7 (L4)
  - Albada《Building Applications with AI Agents》Ch6 (L4)
  - 尹浩《AI Agent 应用开发》Ch4 (L4)
  - 凌峰《AI Agent 开发与应用》Ch4 (L3)
semantic_invariants:
  - 必须保留: 检索内容需溯源(高保真)
  - 必须保留: 检索结果不可直接信任(防投毒/注入)
  - 必须保留: 知识库需维护更新
  - 必须保留: 检索质量决定生成质量
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-context-engineering, agent-security-prompt-injection]
  transitive: []
tags: [rag, retrieval, knowledge-base, citation]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户构建知识库问答/检索
    - 用户选 RAG 方案(普通/Dual/Graph/高保真)
    - 用户遇到幻觉/检索质量差
  negative:
    - 无外部知识需求
    - 知识在模型参数内即可
decision_question: "用户是否在让 agent 从外部知识源检索信息来增强回答?"
input_required: [知识源, 事实性要求, 维护能力]
output_type: RAG 方案
confidence:
  high: 知识源明确 + 事实性要求高
  medium: 知识源模糊
  low: 无外部知识
```

# agent-rag — 检索增强

## R(原文引用)
> "Dual RAG separates procedural from factual knowledge."——Rothman, Ch3
> "High-fidelity RAG attaches source citations to every fact."——Rothman, Ch7
> "RAG 通过加载器/转换器/嵌入模型/向量存储/检索构建知识问答系统。"——尹浩, Ch4

## I(方法论骨架)
RAG 让 agent 从外部知识源检索信息增强回答,缓解幻觉与知识过期。核心决策: ①知识源结构(文档/DB/API);②RAG 变体: 普通(单一检索)/ Dual(procedural 流程知识 + factual 事实知识双源)/ GraphRAG(图结构关系)/ High-fidelity(每条事实带 source citation);③管道: 加载→转换→嵌入→存储→检索→生成;④agentic RAG(检索作为工具,agent 自主决定何时检索)。关键纪律: 检索内容不可直接信任(防投毒/注入);事实性要求高时必须高保真引用。

## A1(书中案例)
- Rothman(Ch7): NASA 研究助手高保真 RAG + input sanitization
- 尹浩(Ch4): 基于 LangChain 的 RAG 实现(文档解析/向量存储/检索优化)
- 凌峰(Ch4): LlamaIndex 将非结构化数据转为知识库

## A2(触发场景)
- 场景 1: "agent 回答编造事实" → 高保真 RAG
- 场景 2: "知识库怎么建/怎么更新" → RAG 管道设计
- 场景 3: "流程知识和事实知识混在一起乱" → Dual RAG

## E(执行步骤)
1. 确认知识源与事实性要求(完成标准: 知识源清单 + 引用要求)
2. 选 RAG 变体(完成标准: 事实性高 → 高保真;流程+事实 → Dual)(完成标准: 明确选择理由)
3. 建管道: 加载→转换→嵌入→存储(完成标准: 可检索)
4. 设计检索策略(完成标准: 查询路由/Top-K/chunk 大小)
5. 高保真: 来源标注 + 引用生成(完成标准: 每条事实可溯源)
6. 防投毒: 来源验证/输入净化(完成标准: 未验证内容标记不可信)
7. 自查: ①检索质量?②可溯源?③防投毒?④知识库更新机制?

## B(边界)
- 反场景 1: 知识在模型参数内 → 不需要 RAG
- 反场景 2: 无引用要求的低风险问答 → 普通 RAG
- 作者警告: 向量库被污染误导决策(x04);无来源断言 = 幻觉(x05)
- 与相邻 skill: agent-context-engineering(检索内容注入上下文);agent-security-prompt-injection(检索内容防注入)

## 相关 skills
- agent-context-engineering: 组合(检索注入)
- agent-security-prompt-injection: 组合(检索内容净化)
