---
name: agent-multi-agent-theory
description: |
  应用多智能体理论(BDI/通信/博弈/机制设计)设计 agent 协作。触发: 用户设计 agent 通信/协商、任务分配、资源竞争、理解经典 MAS 理论对 LLM agent 的映射时。核心: BDI 架构、言语行为/KQML/FIPA 通信、Contract Net 任务分配、博弈论/拍卖/VCG 机制设计。不适用: 单 agent 任务。
version: 1.0.0
source_books:
  - Wooldridge《An Introduction to MultiAgent Systems》Ch2-17 (L4)
  - 比斯瓦斯《构建 Agentic AI 系统》Ch2/6 (L3)
semantic_invariants:
  - 必须保留: 通信需共享语义(本体/协议)
  - 必须保留: 任务分配需明确机制(Contract Net/拍卖)
  - 必须保留: 资源竞争需激励相容
  - 必须保留: 理论是锚点,映射 LLM agent 需适配
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-orchestration]
  transitive: [agent-ux-design]
tags: [mas-theory, bdi, game-theory, communication, mechanism-design]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户设计 agent 通信/协商协议
    - 用户处理多 agent 资源竞争/任务分配
    - 用户想理解经典 MAS 理论
  negative:
    - 单 agent 任务
    - 简单两 agent 无竞争
decision_question: "用户是否在设计多个 agent 之间的通信、协商或资源分配机制?"
input_required: [agent 数量, 交互类型, 竞争/协作性质]
output_type: 理论映射建议(通信/分配/机制)
confidence:
  high: 交互类型明确
  medium: 交互模糊
  low: 单 agent
```

# agent-multi-agent-theory — 多智能体理论

## R(原文引用)
> "Practical reasoning is deliberation plus means-ends reasoning."——Wooldridge, Ch4
> "Contract Net allocates tasks via announce-bid-award."——Wooldridge, Ch8
> "VCG mechanisms achieve incentive-compatible allocation."——Wooldridge, Ch14

## I(方法论骨架)
经典 MAS 理论为 LLM agent 协作提供概念锚点: ①个体架构(BDI: 信念-愿望-意图;慎思/反应/混合);②通信(言语行为理论、KQML/FIPA ACL 的语义层、共享本体);③任务分配(Contract Net 招标-投标-中标);④群体决策(博弈论: Nash 均衡/帕累托;社会选择;联盟: Shapley 值;拍卖: Vickrey/VCG 机制设计——激励相容);⑤协商(交替报价)与论辩(argumentation)。映射到 LLM agent: BDI → 意图状态管理;KQML/FIPA → 现代 A2A;Contract Net → orchestrator 任务分配;VCG → 资源竞价。理论是锚点,需适配 LLM 具体能力。

## A1(书中案例)
- Wooldridge(Ch14): 拍卖机制(English/Dutch/Vickrey/Combinatorial/VCG)
- Wooldridge(Ch8): Contract Net 协议与协同问题求解
- 比斯瓦斯(Ch6): CWD 模型作为安全协作的实践映射

## A2(触发场景)
- 场景 1: "多 agent 抢资源/任务重复" → 分配机制
- 场景 2: "agent 之间怎么通信/协商" → 通信协议
- 场景 3: "为什么有的协作系统稳定有的崩" → 激励相容/机制设计

## E(执行步骤)
1. 识别交互类型(完成标准: 协作/竞争/协商分类)
2. 通信设计(完成标准: 消息语义 + 共享术语表)
3. 任务分配机制(完成标准: 简单→orchestrator;竞争→Contract Net/拍卖)
4. 激励检查(完成标准: 无激励冲突;机制激励相容)
5. 协商/冲突解决(完成标准: 明确协商协议)
6. 自查: ①语义共享?②分配无重复?③激励相容?④理论适配 LLM?

## B(边界)
- 反场景 1: 单 agent → 不适用
- 反场景 2: 复杂机制(VCG)对 LLM agent 过重 → 轻量适配
- 作者警告: 无共享语义的通信必然误解;无激励相容的分配必然操纵
- 与相邻 skill: agent-orchestration(编排是理论的工程落地)

## 相关 skills
- agent-orchestration: 组合(理论指导编排设计)
- agent-ux-design: 组合(多 agent 用户感知)
