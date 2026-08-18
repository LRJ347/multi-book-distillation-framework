---
name: agent-memory-architecture
description: |
  设计 agent 记忆架构。触发: 用户需要跨会话上下文、长对话管理、个性化记忆、选择记忆方案(上下文窗口/向量库/数据库)、处理记忆污染时。核心: 三层记忆(短期/长期/向量)+ 写入/检索/淘汰策略;上下文窗口≠记忆。不适用: 短会话无状态任务。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch8 (L4)
  - Albada《Building Applications with AI Agents》Ch6 (L4)
  - 尹浩《AI Agent 应用开发》Ch5 (L4)
  - Fajardo《Build a Multi-Agent System》Ch7 (L3)
  - Dibia《Designing Multi-Agent Systems》Ch4 (L3)
semantic_invariants:
  - 必须保留: 上下文窗口是工作空间不是记忆
  - 必须保留: 长期记忆需显式存储
  - 必须保留: 记忆需更新与淘汰(防污染)
  - 必须保留: 记忆写入有成本(token/延迟)
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-context-engineering, agent-tool-use]
  transitive: []
tags: [agent, memory, long-term, vector, context]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户问"agent 怎么记住之前的对话/用户偏好"
    - 用户设计记忆存储方案
    - 用户遇到上下文超限/记忆污染
  negative:
    - 无状态单次任务
    - 短会话无需持久记忆
decision_question: "用户是否在解决 agent 如何存储和检索跨会话信息的问题?"
input_required: [会话特点, 需记住的信息类型, 存储环境]
output_type: 记忆架构方案
confidence:
  high: 明确信息类型 + 存储环境
  medium: 信息类型模糊
  low: 无持久需求
```

# agent-memory-architecture — 记忆架构

## R(原文引用)
> "Memory management distinguishes short-term, long-term, and vector memory."——Gulli, Ch8
> "上下文窗口是工作空间,持久记忆需要显式存储系统。"——Albada, Ch6
> "记忆模块包括信息类型、压缩算法、短期/长期记忆,MemGPT 是分层记忆框架。"——尹浩, Ch5

## I(方法论骨架)
记忆架构分三层:①短期记忆(会话内,即上下文窗口/工作区);②长期记忆(跨会话,显式存储: 数据库/文件);③向量记忆(语义检索,embedding 相似度)。设计要点: 写入策略(什么值得记)、检索策略(如何召回)、更新淘汰(防过期/污染)、压缩(上下文超限时摘要/裁剪,见 Summarizer)。MemGPT(尹浩)用 OS 式分层管理。关键纪律: 上下文窗口是工作空间不是记忆——依赖长窗口代替记忆系统成本高且不可靠。

## A1(书中案例)
- 尹浩(Ch5): 手动实现 Memory + token 计数 + MemGPT 实践与框架源码解析
- Gulli(Ch8): 短期/长期/向量记忆三分
- Albada(Ch6): 上下文窗口/关键词/向量库/RAG/GraphRAG/白板方案谱系

## A2(触发场景)
- 场景 1: "agent 每次对话都忘记之前的事" → 长期记忆缺失
- 场景 2: "对话越长越贵/越慢" → 压缩策略
- 场景 3: "agent 记得的东西是错的" → 记忆淘汰/更新

## E(执行步骤)
1. 分析需记忆的信息类型(完成标准: 分类: 会话内/跨会话/语义检索)
2. 选存储方案(完成标准: 短期=上下文;长期=DB/文件;向量=向量库)
3. 设计写入策略(完成标准: 明确什么写入、何时写入)
4. 设计检索策略(完成标准: 何时检索、检索 Top-K)
5. 设计更新/淘汰(完成标准: 过期信息可清除;冲突可覆盖)
6. 设压缩策略(完成标准: 超限时摘要/裁剪路径)
7. 自查: ①分层合理?②检索有效?③污染可防?④成本可控?

## B(边界)
- 反场景 1: 无状态单次任务 → 不需要记忆
- 反场景 2: 记忆无淘汰 → 污染误导(x15)
- 作者警告: 依赖上下文窗口代替记忆 = 成本失控(x02)
- 与相邻 skill: agent-context-engineering(上下文管理含 token 预算,记忆是其存储层)

## 相关 skills
- agent-context-engineering: 依赖(上下文/token 管理)
- agent-tool-use: 组合(向量库检索可作为工具)
