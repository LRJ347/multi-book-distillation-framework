---
name: agent-guardrails
description: |
  设计 agent 安全护栏。触发: 用户保护生产 agent、限制 agent 行为/权限、内容审核、处理越权/越狱、设计安全边界时。核心: 输入过滤+行为约束+输出过滤+监控;最小权限;Rule of Two;双阶段审核。不适用: 低风险内部原型。
version: 1.0.0
source_books:
  - Gulli《Agentic Design Patterns》Ch18 (L4)
  - Albada《Building Applications with AI Agents》Ch12 (L4)
  - 比斯瓦斯《构建 Agentic AI 系统》Ch8-9 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch13 (L4)
  - Rothman《Context Engineering for Multi-Agent Systems》Ch8 (L4)
semantic_invariants:
  - 必须保留: 护栏限制行为但不杀死能力(平衡)
  - 必须保留: 最小权限原则
  - 必须保留: 输入输出双闸门
  - 必须保留: 护栏可被绕过(需监控)
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-security-prompt-injection, agent-evaluation]
  transitive: []
tags: [guardrails, safety, permission, moderation]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户保护生产 agent
    - 用户限制 agent 权限/行为
    - 用户设计内容审核
  negative:
    - 低风险内部原型
    - 无敏感操作
decision_question: "用户是否在限制 agent 的行为/权限以降低风险?"
input_required: [agent 能力, 风险面, 合规要求]
output_type: 护栏方案
confidence:
  high: 风险面明确 + 合规要求
  medium: 风险面模糊
  low: 无风险
```

# agent-guardrails — 安全护栏

## R(原文引用)
> "Guardrails constrain agent behavior to prevent harmful actions."——Gulli, Ch18
> "Rule of Two: 不可同时具有不可信输入与高权限动作。"——Dibia, Ch13
> "双阶段审核: 预处理(输入)+ 后处理(输出)。"——Rothman, Ch8

## I(方法论骨架)
护栏是 agent 的防护层,四道闸: ①输入过滤(sanitization,防注入);②行为约束(权限分级/规则/政策);③输出过滤(内容合规/格式);④监控告警。核心原则: 最小权限(agent 只获得任务所需权限);Rule of Two(不可信输入+高权限动作不同时出现);双阶段审核(输入输出都要);政策驱动(组织政策作为最高级 context)。关键平衡: 护栏过度杀死能力,不足则风险失控——需按风险面分级设计。

## A1(书中案例)
- Dibia(Ch13): Rule of Two 安全基线;jailbreak 防护
- Rothman(Ch8): 两阶段 moderation + policy-driven meta-controller + 法律合规助手
- 比斯瓦斯(Ch8-9): 信任构建(透明度/可解释性)+ 安全管理(对抗攻击/隐私/IP)

## A2(触发场景)
- 场景 1: "agent 要上生产,怎么保证安全" → 四道闸
- 场景 2: "agent 权限太大怕出事" → 最小权限
- 场景 3: "内容审核怎么设计" → 双阶段

## E(执行步骤)
1. 风险面分析(完成标准: 列出 agent 能做什么、风险在哪)
2. 权限分级设计(完成标准: 每权限有理由;敏感操作需审批)
3. 输入过滤(完成标准: 净化规则覆盖注入向量)
4. 输出过滤/审核(完成标准: 内容合规规则)
5. 监控告警(完成标准: 异常行为可检测)
6. Rule of Two 检查(完成标准: 不可信输入与高权限不同时)
7. 自查: ①护栏平衡(不杀死能力)?②权限最小?③可绕过点有监控?

## B(边界)
- 反场景 1: 低风险原型 → 轻量护栏
- 反场景 2: 护栏过度 → 能力下降
- 作者警告: 护栏可被绕过(对抗攻击,需持续监控);越权是灾难(x06)
- 与相邻 skill: agent-security-prompt-injection(注入防御是护栏的输入闸)

## 相关 skills
- agent-security-prompt-injection: 依赖(输入净化)
- agent-evaluation: 组合(安全评估维度)
