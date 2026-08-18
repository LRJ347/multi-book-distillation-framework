# Evidence Ledger — agent-ux-design

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 2(独立来源 2)

## 核心命题
P1: 多 agent 系统的 UX 必须满足四大原则(能力发现/成本感知委派/可观测性/可中断性)
P2: 长任务 UX 必须用流式通信 + 两阶段反馈(启动即反馈 → 完成通知)

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator(微软) | Ch3/8 | framework+case | L4 | high |
| Albada《Building Applications with AI Agents》 | Michael Albada | practitioner | Ch3 | framework | L3 | medium |

## 独立证据链
- 链 1: Dibia — 微软 multi-agent 系统作者,Ch3 提出四大 UX 原则,Ch8 给 FastAPI+SSE 流式进度工程实现
- 链 2: Albada — 应用层视角补充"交互模态/同步异步/上下文/信任"等 UX 设计面

## 支持 / 冲突
- 支持: 2 书均支持"agent 系统需要专门的 UX 设计原则,不能照搬普通软件 UX"
- 冲突: 无显著冲突;Dibia 偏交互原则与工程实现,Albada 偏应用层 UX 视角,角度互补
- 弱张力: Dibia Ch3 把 interruptibility 列入 UX 范畴,与 agent-human-in-the-loop 的 interruptibility 概念交叉——已通过"语义不变量"明确分工(HITL 偏审批确认,UX 偏可中断控件)

## 适用条件 / 反例
- 适用: 多 agent 系统有 UI 暴露;长任务需要进度展示;用户需理解 agent 能力与代价
- 不适用: 后台无 UI agent(B 段反场景 1);短任务(<几秒)
- 反例: 无反馈的长任务让用户以为卡死;不可中断让用户失去控制(B 段作者警告)
- 与相邻 skill 边界: 与 agent-orchestration 关系——编排是数据源,UX 是渲染层;与 agent-human-in-the-loop 关系——HITL 的审批点也是 UX 交互,二者通过"确认点 UI"组合

## 验证结果(阶段 6 待填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证;语义不变量已锁定 4 条;Dibia 一书覆盖多章节,实际证据跨度 L4 充分)