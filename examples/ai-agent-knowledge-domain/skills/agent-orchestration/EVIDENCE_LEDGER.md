# Evidence Ledger — agent-orchestration

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 6(独立来源 5)

## 核心命题
P1: 多智能体编排在"确定性 workflow"与"自主 autonomous"谱系中选择
P2: 简单任务单 agent 更优,多 agent 需任务可分解且协调开销可控

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Gulli | Antonio Gulli | practitioner | Ch7 | framework | L4 | high |
| Albada | Michael Albada | practitioner | Ch8 | framework | L4 | high |
| 比斯瓦斯 | Anjanava Biswas | practitioner | Ch6 | framework+case | L4 | high |
| Dibia | Victor Dibia | integrator | Ch2/6/7 | framework | L4 | high |
| 尹浩 | 尹浩 | practitioner | Ch7 | framework+case | L4 | medium |
| Wooldridge | Michael Wooldridge | founder | Ch8 | theory | L4 | high |

## 独立证据链
- 链 1: Gulli(设计模式)
- 链 2: Albada(工程生命周期)
- 链 3: Dibia(模式谱系+UX+评估,微软)
- 链 4: Wooldridge(经典理论 Contract Net)
- 传播链: 尹浩(框架源码分析,部分依赖他书)

## 支持 / 冲突
- 支持: 6 书一致支持"多 agent 编排是核心议题"
- 冲突: 单 vs 多 agent 分歧(Dibia 实证 vs 多 agent 派)→ 条件冲突,已加适用条件

## 适用条件 / 反例
- 适用: 复杂可分解任务 + 角色分工需求
- 不适用: 简单任务(x13);任务不可分解
- 反例: 无终止条件死循环(x01);多 agent 死锁(x08)

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)
