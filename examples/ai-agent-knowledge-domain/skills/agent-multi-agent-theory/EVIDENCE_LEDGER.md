# Evidence Ledger — agent-multi-agent-theory

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 2(独立来源 2)

## 核心命题
P1: 经典 MAS 理论(BDI/通信/Contract Net/VCG)是 LLM agent 协作的概念锚点
P2: 理论是锚点不是答案,必须经"LLM 能力适配"后才能落地

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Wooldridge《An Introduction to MultiAgent Systems》 | Michael Wooldridge | founder(经典 MAS 教科书作者) | Ch2-17(精选 Ch4/8/14) | theory | L4 | high |
| 比斯瓦斯《构建 Agentic AI 系统》 | Anjanava Biswas | practitioner | Ch2/6 | framework+case | L3 | medium |

## 独立证据链
- 链 1: Wooldridge — 经典 MAS 教科书,涵盖 BDI/言语行为/Contract Net/VCG(理论锚点不可替代)
- 链 2: 比斯瓦斯 — LLM agent 视角下把 Wooldridge 概念做工程映射(CWD 模型作为安全协作映射 Ch6)

## 支持 / 冲突
- 支持: 2 书均支持"理论是协作设计的锚点"
- 冲突: 无显著冲突;Wooldridge 是理论锚,比斯瓦斯是工程映射,二者互补而非冲突
- 弱张力: 经典 MAS 的 BDI 假设理性 agent,LLM agent 非完全理性——SKILL.md I 段已明确"理论是锚点,需适配 LLM"

## 适用条件 / 反例
- 适用: 多 agent 通信协议设计;任务分配存在竞争;资源稀缺需激励相容;希望复用经典模式
- 不适用: 单 agent 任务(B 段反场景 1);简单两 agent 无竞争
- 反例: 无共享语义的通信必然误解;无激励相容的分配必然被策略性操纵(B 段作者警告)
- 与相邻 skill 边界: 与 agent-orchestration 关系——理论指导编排,但编排是工程落地;与 agent-ux-design 通过"多 agent 用户感知"组合

## 验证结果(阶段 6 待填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证;语义不变量已锁定 4 条;来源数偏少是潜在弱项,需 Wooldridge 一书覆盖多章来弥补)