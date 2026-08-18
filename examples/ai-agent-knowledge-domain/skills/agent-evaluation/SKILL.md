---
name: agent-evaluation
description: |
  评估 agent 系统质量。触发: 用户上线前评估、建立测试集/基准、定位 agent 失败根因、对比模型/架构、监控生产 agent 时。核心: 先定义基准再开发;trajectory-based 评估(评估执行轨迹非仅结果);评估维度(正确性/完整性/可操作性);持续监控。不适用: 原型探索阶段。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch19 (L4)
  - Albada《Building Applications with AI Agents》Ch9-11 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch10 (L4)
  - Rothman《Context Engineering for Multi-Agent Systems》Ch10 (L3)
semantic_invariants:
  - 必须保留: 评估先于宣称成功
  - 必须保留: 轨迹评估定位失败根因
  - 必须保留: 基准需维护(漂移)
  - 必须保留: 监控是持续过程(非一次性)
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-reflection-loop, agent-orchestration]
  transitive: [agent-guardrails]
tags: [evaluation, benchmark, monitoring, trajectory]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户上线前评估 agent
    - 用户定位 agent 失败根因
    - 用户建立测试集/基准/监控
  negative:
    - 原型探索阶段
    - 一次性 demo
decision_question: "用户是否在系统评估 agent 的质量或定位其失败原因?"
input_required: [agent 行为, 评估维度, 测试数据]
output_type: 评估方案(基准/指标/监控)
confidence:
  high: 有测试数据 + 明确维度
  medium: 维度模糊
  low: 无测试数据
```

# agent-evaluation — 评估

## R(原文引用)
> "Trajectory-based evaluation assesses the execution path, not just the final output."——Dibia, Ch10
> "评估是测量: 单元测试/集成测试/幻觉检测/部署准备。"——Albada, Ch9

## I(方法论骨架)
评估让 agent 改进有据可依。核心原则: ①先定义基准再开发(评估先行);②trajectory-based 评估——记录执行轨迹(plan/tool-call/result),定位"在哪一步失败"而非"是否失败";③评估维度: 正确性/完整性/可操作性/边界安全;④持续监控(生产分布漂移/失败模式/可观测);⑤实证对比(Direct-Model vs Multi-Agent,避免想当然)。配套: 测试集 + gold labels + 迭代改进循环。

## A1(书中案例)
- Dibia(Ch10): trajectory-based evaluation + Direct-Model vs Multi-Agent 实证(简单推理单模型更优)
- Albada(Ch9-11): 单元/集成测试、生产监控、反馈管线/Shadow 部署
- Gulli(Ch19): Evaluation and Monitoring 模式

## A2(触发场景)
- 场景 1: "agent 老在某些任务失败" → 轨迹评估定位
- 场景 2: "上线前怎么验证" → 基准+测试集
- 场景 3: "生产环境 agent 变差了" → 漂移监控

## E(执行步骤)
1. 定义评估维度(完成标准: 正确性/完整性/可操作性等 checklist)
2. 建测试集 + gold labels(完成标准: 覆盖正常/边界/失败场景)
3. 记录轨迹(完成标准: plan/tool-call/result 全记录)
4. 执行评估(完成标准: 逐维度评分,定位失败步骤)
5. 对比基准(完成标准: Direct-Model vs Multi-Agent 实证)
6. 设生产监控(完成标准: 漂移/失败率/可观测指标)
7. 自查: ①基准先行?②轨迹完整?③维度覆盖?④监控持续?

## B(边界)
- 反场景 1: 无基准宣称成功 → 不可信(x12)
- 反场景 2: 只测 happy path → 漏失败模式
- 作者警告: 评估基准漂移需维护;过度自信(evaluation 部分)
- 与相邻 skill: agent-reflection-loop(单次反思 vs 系统评估);agent-guardrails(安全评估维度)

## 相关 skills
- agent-reflection-loop: 组合(评估标准可复用)
- agent-guardrails: 组合(安全维度评估)
