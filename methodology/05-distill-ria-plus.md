# 05 — 阶段 4:RIA++ 构造 SKILL.md(DISTILL)

## 目标

把阶段 3 通过的每个方法论单元,构造成符合 skill 规范的 SKILL.md(含 Skill Card 决策入口)。

## RIA++ 六段 + Skill Card

### Skill Card(决策入口,YAML,每个 skill 必填)

```yaml
trigger:
  positive: ["用户说'<具体话>'时", ...]
  negative: ["用户说'<诱饵>'时不触发", ...]
decision_question: "用户当前问题是否实际在问本 skill 所解决的问题?"
input_required: ["<需要用户提供的输入>"]
output_type: <输出形态>
confidence:
  high: <什么情况下高置信>
  medium: <什么情况下中置信>
  low: <什么情况下低置信>
```

**decision_question 设计原则**: Agent 调用前用一句话判断"这是不是该 skill 的领域"。好: "用户当前问题是否涉及多机位场景的机位朝向、空间方向一致性?"坏: "用户在问镜头问题吗?"(太宽)

### R — Reading(原文)
- 直接引用 ≤150 字/段(英文 ≤100 词)
- 必须标注出处(章节/页码/段落标识)
- 英文原书引用原文 + 自己翻译,不用现成译本

### I — Interpretation(自述)
- 用自己的话重写方法论核心骨架,5-15 行
- 检查: 没读过原书的人能否理解?不能则重写
- 禁止: 照搬原文句子/堆砌修辞

### A1 — Past Application(书中案例)
- 作者亲自用该方法论的案例 1-3 条
- 每条: 遇到什么问题 → 怎么用 → 得出什么结论 → 实际结果

### A2 — Future Trigger(未来触发场景)★ 最关键
- 用户会在什么情境遇到这类问题(3-5 条)
- 这些情境的语言信号是什么(用户会说什么话)
- 与相邻 skill 的不同(避免抢调用)
- 产出直接写入 frontmatter description

### E — Execution(可执行步骤)
- 方法论转成 1-2-3 步骤,每步有**可判断的完成标准**
- 有判停点显式写出(step 2 后若 X 则跳到 step 5)
- 附带自查 checklist

### B — Boundary(边界)
- 什么时候**不要**用(反场景)
- 作者警告过的失败模式
- 来自阶段 0 批判的作者盲点
- 相邻但易混淆的其他方法论

## Frontmatter 设计

```yaml
---
name: <skill-slug>                # kebab-case 唯一
description: |                    # A2 浓缩版 ≤300 字
  <何时用 + 何时不用 + 关键 trigger>
version: 1.0.0
source_books:                     # MBDF 必有
  - <书名 1>(第 X 章, L4)
  - <书名 2>(第 Y 章, L3)
semantic_invariants:              # V4 前置,蒸馏前定义
  - 必须保留的条件
  - 必须保留的因果方向
  - 必须保留的适用对象
  - 必须保留的反例
verification_layers_passed:       # 阶段 6 后回填
  - V-REF ⏳ / V-REAL ⏳ / V-NEG ⏳ / V-E2E ⏳ / V4 ⏳
related_skills:
  direct: []
  transitive: []
tags: [...]
---
```

## 常见失败模式

1. **I 段写成书摘** — 读起来像"本章作者说了 X" → 重写
2. **A2 太宽** — "需要决策时"这种 trigger 永不精准 → 必须给可识别语言信号
3. **E 段只有哲学** — "保持客观"不是 step,"列出 3 个最不希望发生的结果"才是
4. **缺 B 段** — 没边界的 skill 会被过度调用
5. **从 I 直接跳到 E 跳过 A1** — 丢失"作者亲自用过"的证据,权威性受损
6. **缺 semantic_invariants** — 蒸馏前不定义,阶段 6 的 V4 无法执行
