# Evidence Ledger — agent-failure-recovery

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: 失败是 agent 运行的常态,必须显式处理(异常处理+恢复策略)
P2: 恢复策略需分级——重试 / 降级 / 回退 / 明确失败,且不可恢复错误不应硬扛

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Gulli《Agentic Design Patterns》 | Antonio Gulli | practitioner | Ch12 | framework | L4 | high |
| Fajardo《Build a Multi-Agent System》 | Val Andrei Fajardo | practitioner | Ch4 | framework | L3 | medium |
| Albada《Building Applications with AI Agents》 | Michael Albada | practitioner | Ch10 | framework+case | L4 | high |
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator(微软) | Ch6/7 | framework | L4 | high |

## 独立证据链
- 链 1: Gulli — 21 类设计模式中显式列入 Exception Handling and Recovery(Ch12)
- 链 2: Albada — 生产化视角监控失败模式与可恢复性
- 链 3: Dibia — workflow checkpoint + structure hash validation(微软 multi-agent 实证实现)
- 传播链: Fajardo — 教育向,部分依赖他书

## 支持 / 冲突
- 支持: 4 书一致支持"失败是常态,显式恢复策略是生产化的前提"
- 冲突: 无显著冲突;Gulli 偏模式分类,Fajardo 偏工程实现,Albada 偏生产监控,Dibia 偏实证 checkpoint 方案,角度互补
- 弱张力: Dibia 强调"自动 checkpoint 恢复",Gulli 强调"显式异常处理",落地形式不同——但都在"分级恢复"框架内,已通过 E 步骤覆盖

## 适用条件 / 反例
- 适用: 工具调用存在失败风险;长任务可被中断需恢复;LLM 输出异常;上下文超限
- 不适用: 简单无状态任务(B 段 trigger.negative);失败可忽略
- 反例: 不可恢复错误强行重试(B 段反场景 1);非幂等重试放大故障(B 段反场景 2);无终止条件死循环 x01(作者警告)
- 与相邻 skill 边界: 与 agent-react-loop 关系——循环需终止条件;与 agent-evaluation 关系——失败监控

## 验证结果(阶段 6 待填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证;语义不变量已锁定 4 条;来源书数 4,覆盖最充分的一档)