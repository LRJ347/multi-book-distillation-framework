---
name: agent-security-prompt-injection
description: |
  防御 agent 提示注入与数据投毒。触发: 用户处理外部输入安全、设计输入净化、防护检索内容投毒、处理越狱/对抗攻击时。核心: 指令与数据隔离;输入净化;检索内容标记不可信;来源验证。不适用: 完全可信的受控输入。
version: 1.0.0
source_books:
  - Rothman《Context Engineering for Multi-Agent Systems》Ch7 (L4)
  - 比斯瓦斯《构建 Agentic AI 系统》Ch9 (L4)
  - Dibia《Designing Multi-Agent Systems》Ch13 (L4)
  - Gulli《Agentic Design Patterns》Ch18 (L3)
semantic_invariants:
  - 必须保留: 指令与数据必须隔离
  - 必须保留: 外部输入不可直接信任
  - 必须保留: 检索内容需标记来源
  - 必须保留: 防御需持续更新(对抗)
verification_layers_passed:
  - V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳
related_skills:
  direct: [agent-guardrails, agent-rag]
  transitive: [agent-mcp-integration]
tags: [security, prompt-injection, data-poisoning, sanitization]
---

# Skill Card

```yaml
trigger:
  positive:
    - 用户处理 agent 外部输入安全
    - 用户设计输入净化/防注入
    - 用户担心检索内容被投毒
  negative:
    - 完全可信的受控输入
    - 无外部内容进入
decision_question: "用户是否在防御外部输入对 agent 的注入/投毒攻击?"
input_required: [输入来源, 威胁模型, 现有防护]
output_type: 防御方案
confidence:
  high: 输入来源明确 + 威胁模型
  medium: 来源模糊
  low: 无外部输入
```

# agent-security-prompt-injection — 注入防御

## R(原文引用)
> "Input sanitization defends against prompt injection and data poisoning."——Rothman, Ch7
> "Jailbreaks and prompt injection are top threats for agent systems."——Dibia, Ch13

## I(方法论骨架)
提示注入(外部内容中的恶意指令劫持 agent)是 LLM agent 特有威胁。防御层: ①指令-数据隔离(分隔符/角色分离,外部内容标记"数据"而非"指令");②输入净化(sanitize: 清洗/校验/转义);③检索内容治理(向量库内容标记不可信来源,防数据投毒);④来源验证(高保真引用,无法溯源不采信);⑤权限隔离(即使被注入,最小权限限制损害,Rule of Two)。注意: 防御是持续对抗,需监控新攻击向量。

## A1(书中案例)
- Rothman(Ch7): NASA 研究助手 input sanitization + 高保真 RAG
- Dibia(Ch13): jailbreak 防护 + Rule of Two
- 比斯瓦斯(Ch9): 对抗攻击/隐私/IP 风险管理

## A2(触发场景)
- 场景 1: "用户输入/网页内容让 agent 乱来" → 注入防御
- 场景 2: "知识库内容可疑" → 投毒防护
- 场景 3: "agent 被诱导执行危险操作" → 权限+Rule of Two

## E(执行步骤)
1. 威胁建模(完成标准: 输入来源+注入向量清单)
2. 指令-数据隔离(完成标准: 外部内容显式标记/分隔)
3. 输入净化(完成标准: 清洗规则覆盖已知向量)
4. 检索治理(完成标准: 内容来源标注+可信度)
5. 权限隔离(完成标准: 最小权限+Rule of Two)
6. 监控更新(完成标准: 新攻击向量跟踪)
7. 自查: ①隔离彻底?②净化覆盖?③来源可溯?④权限最小?

## B(边界)
- 反场景 1: 完全可信受控输入 → 简化防御
- 反场景 2: 防御过度影响功能 → 平衡
- 作者警告: 无隔离的拼接必然可注入(x14);投毒误导检索(x04)
- 与相邻 skill: agent-guardrails(注入防御是护栏输入闸);agent-rag(检索内容治理)

## 相关 skills
- agent-guardrails: 组合(护栏输入闸)
- agent-rag: 组合(检索内容可信度)
- agent-mcp-integration: 组合(MCP 工具输入净化)
