# Evidence Ledger — agent-guardrails

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 5(独立来源 5)

## 核心命题
P1: 护栏四道闸: 输入过滤 / 行为约束 / 输出过滤 / 监控告警
P2: Rule of Two: 不可信输入与高权限动作不同时出现(Dibia)
P3: 双阶段审核(输入输出)+ 最小权限 + 政策驱动;护栏可被绕过需监控

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Gulli《Agentic Design Patterns》 | Antonio Gulli | practitioner | Ch18 | framework | L4 | high |
| Albada《Building Applications with AI Agents》 | Michael Albada | practitioner | Ch12 | framework | L4 | high |
| 比斯瓦斯《构建 Agentic AI 系统》 | Anjanava Biswas | practitioner | Ch8-9 | framework+case | L4 | high |
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator | Ch13 | framework+case | L4 | high |
| Rothman《Context Engineering for Multi-Agent Systems》 | Rothman | practitioner | Ch8 | framework+case | L4 | high |

## 独立证据链
- 链 1: Gulli(Guardrails constrain agent behavior 顶层定义)
- 链 2: Dibia(Rule of Two 安全基线 + jailbreak 防护)
- 链 3: Rothman(双阶段 moderation + policy-driven meta-controller + 法律合规助手案例)
- 链 4: 比斯瓦斯(信任构建: 透明度/可解释性 + 安全管理: 对抗攻击/隐私/IP)
- 链 5: Albada(工程化护栏实施)

## 支持 / 冲突
- 支持: 5 书一致支持"护栏限制 agent 行为以防伤害"
- 冲突: 平衡点分歧(护栏过度 vs 不足) → 条件性,已加 V4 平衡约束

## 适用条件 / 反例
- 适用: 生产环境 + 高风险操作 + 合规要求
- 不适用: 低风险内部原型(反场景 1);护栏过度杀死能力(反场景 2)
- 反例: 护栏可被绕过(对抗攻击,需持续监控);越权是灾难 x06
- Rule of Two 违反 = 不可信输入与高权限同现

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)