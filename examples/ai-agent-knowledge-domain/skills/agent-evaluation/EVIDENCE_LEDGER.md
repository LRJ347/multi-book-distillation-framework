# Evidence Ledger — agent-evaluation

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: 评估先于宣称成功(先定义基准再开发)
P2: trajectory-based 评估(记录 plan/tool-call/result,定位在哪一步失败)
P3: 评估维度多元(正确性/完整性/可操作性/边界安全);持续监控应对分布漂移

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Gulli《Agentic Design Patterns》 | Antonio Gulli | practitioner | Ch19 | framework | L4 | high |
| Albada《Building Applications with AI Agents》 | Michael Albada | practitioner | Ch9-11 | framework+case | L4 | high |
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator | Ch10 | framework+case | L4 | high |
| Rothman《Context Engineering for Multi-Agent Systems》 | Rothman | practitioner | Ch10 | framework | L3 | medium |

## 独立证据链
- 链 1: Gulli(Evaluation and Monitoring 模式,设计模式视角)
- 链 2: Albada(单元/集成测试、生产监控、反馈管线/Shadow 部署,工程全生命周期)
- 链 3: Dibia(trajectory-based evaluation 原始定义 + Direct-Model vs Multi-Agent 实证,简单推理单模型更优)
- 链 4: Rothman(Context Engine 视角的评估补充)

## 支持 / 冲突
- 支持: 4 书一致支持"评估先行 + 轨迹评估 + 持续监控"
- 冲突: 无显著冲突

## 适用条件 / 反例
- 适用: 上线前验证/失败根因定位/生产漂移监控
- 不适用: 原型探索阶段(负触发);一次性 demo(负触发)
- 反例: 无基准宣称成功 x12;只测 happy path 漏失败模式(反场景 2)
- 基准漂移需维护;评估本身可能过度自信

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)