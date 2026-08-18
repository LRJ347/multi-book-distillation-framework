---
name: agent-failure-recovery
description: |
  设计 agent 失败处理与恢复。触发: 用户处理工具调用失败、上下文超限、agent 死循环、系统降级、需要 checkpoint 恢复时。核心: 显式异常处理(重试/降级/回退);checkpoint 恢复;终止条件防死循环。不适用: 不可恢复错误(明确失败)。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch12 (L4)
  - Fajardo《Build a Multi-Agent System》Ch4 (L3)
  - Albada《Building Applications with AI Agents》Ch10 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch7 (L4)
semantic_invariants:
  - 必须保留: 失败是常态(需显式处理)
  - 必须保留: 恢复策略分级(重试/降级/回退)
  - 必须保留: checkpoint 可恢复
  - 必须保留: 不可恢复错误明确告知
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-react-loop, agent-evaluation]
  transitive: []
tags: [failure, recovery, retry, checkpoint, error-handling]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户处理 agent 工具失败/异常
    - 用户设计重试/降级/恢复
    - 用户遇到死循环/超限
  negative:
    - 简单无状态任务
    - 失败可忽略
decision_question: "用户是否在解决 agent 运行中失败的处理与恢复?"
input_required: [失败类型, 可用降级路径, 恢复要求]
output_type: 恢复方案
confidence:
  high: 失败类型明确
  medium: 失败类型模糊
  low: 无失败处理需求
```

# agent-failure-recovery — 失败恢复

## R(原文引用)
> "Exception handling and recovery are essential agent patterns."——Gulli, Ch12
> "Workflows support automatic checkpointing and structure-hash-validated recovery."——Dibia, Ch6/7

## I(方法论骨架)
agent 运行必然失败(工具调用失败/LLM 输出异常/上下文超限/网络错误),显式恢复策略是生产化的前提。分级恢复: ①重试(瞬时错误,带退避);②降级(换工具/换模型/简化任务);③回退(checkpoint 恢复到已知良好状态);④明确失败(不可恢复时告知用户)。配套: 终止条件(防死循环/烧 token)、结构哈希校验(检查点有效性)、错误分类(可重试 vs 不可重试)。

## A1(书中案例)
- Gulli(Ch12): Exception Handling and Recovery 模式
- Dibia(Ch6): workflow checkpoint + structure hash validation 恢复
- Albada(Ch10): 生产失败模式与监控

## A2(触发场景)
- 场景 1: "工具调用老是失败" → 重试策略
- 场景 2: "长任务中断要重来" → checkpoint
- 场景 3: "agent 死循环" → 终止条件

## E(执行步骤)
1. 错误分类(完成标准: 可重试/降级/不可恢复)
2. 重试策略(完成标准: 次数+退避;幂等性检查)
3. 降级路径(完成标准: 备用工具/模型/简化方案)
4. checkpoint 设计(完成标准: 状态可保存恢复;哈希校验)
5. 终止条件(完成标准: max rounds/token/目标达成)
6. 明确失败(完成标准: 用户可理解错误信息)
7. 自查: ①分类正确?②重试不放大故障?③恢复有效?④无死循环?

## B(边界)
- 反场景 1: 不可恢复错误强行重试 → 浪费时间
- 反场景 2: 重试放大故障(非幂等) → 数据问题
- 作者警告: 无终止条件死循环(x01);假设工具永远成功
- 与相邻 skill: agent-react-loop(循环需终止条件);agent-evaluation(失败模式监控)

## 相关 skills
- agent-react-loop: 组合(循环终止条件)
- agent-evaluation: 组合(失败监控)
