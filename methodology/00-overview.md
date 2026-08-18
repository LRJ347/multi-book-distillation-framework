# 00 — 三循环总览(DISCOVER → DISTILL → VERIFY)

## 命名

**MBDF-FLV** = Multi-Book Distillation Framework with Four-Layer Verification
多书融合蒸馏 + 四层验证 + 三循环架构

## 思想来源

| 来源 | 借鉴 |
|---|---|
| Adler《如何阅读一本书》 | 整书理解(结构/解释/批判) |
| 赵周 RIA 拆书法 | R-I-A1-A2 骨架 |
| Luhmann Zettelkasten | 原子化 + 链接 + 用自己的话重写 |
| cangjie-skill (RIA-TV++) | 单书蒸馏骨架 |
| 多书融合方法 | 每知识点 ≥2 书佐证(独立证据链) |
| 四层验证(V-REF/V-REAL/V-NEG/V-E2E) | 严格质量门 |
| 盲态协议验证 | 评估可重复性(两个独立执行者得出相同裁决) |

## 根本洞察

**读书方法论为人类读者蒸馏,MBDF-FLV 为 agent 执行者蒸馏。**

| 维度 | 给人看 | 给 agent 用 |
|---|---|---|
| 关键字段 | 故事/金句/情感钩子 | trigger/可执行步骤/判停标准 |
| 失败模式 | 读完就忘 | trigger 不准 → 永不调用或乱调用 |
| 成功标准 | 读者"有收获" | 真实问题被解决 |

## 三循环流水线

```
DISCOVER(发现)
├ 0 领域骨架扫描 → DOMAIN_OVERVIEW.md
├ 1 多书并行交叉提取 → candidates/
└ 2 候选聚类 → clusters/
   ↓
DISTILL(蒸馏)
├ 3 三重筛选(V1 证据/V2 预测/V3 独特/MB 来源)→ verified.md
├ 4 RIA++ 构造(含 Skill Card)→ SKILL.md
└ 5 V-CONFLICT 冲突/条件化裁决
   ↓
VERIFY(验证)
├ 6 四层验证 + V4 Gate
├ 7 Evidence Ledger
└ 8 压力测试(routing accuracy/FP/FN)
   ↓
FAIL → 回 DISTILL;stuck(3 轮)→ CONDITIONAL(人工)
```

产物层(不参与循环,按需产出):
- 必做: INDEX / KNOWLEDGE_GRAPH / EVIDENCE_LEDGER / test-prompts / 验证报告
- 可选: compiler / 三层架构协同 / LEARNING_NOTE / TALKING_POINTS
- 元规则: AUTHOR_WEIGHT / FAILURE_MODES / CONFLICT_RULES / EVALUATION_PROTOCOL

## 不变量(任何迭代不能违反)

1. 原子性: 一个 skill 只做一个方法论单元
2. 多书交叉: 独立证据链 ≥2(硬门槛)
3. 可追溯: 每条 R 标注章节;Evidence Ledger 完整
4. 可验证: 四层验证 + V4 Gate
5. 用户参与: 阶段 0 后必须确认骨架
6. Routing/Evidence 分离: 互不污染
7. 无领域污染: 框架只含方法论;evidence_hierarchy 由领域定义
8. 终止条件: max_rounds=3
9. SSOT: 阈值只存在于 EVALUATION_PROTOCOL.md

## 本目录文件

| 文件 | 阶段 |
|---|---|
| 01-discover-domain-scan.md | 阶段 0 领域骨架扫描 |
| 02-discover-extract.md | 阶段 1 多书并行交叉提取 |
| 03-discover-cluster.md | 阶段 2 候选聚类 |
| 04-distill-triple-verify.md | 阶段 3 三重筛选 |
| 05-distill-ria-plus.md | 阶段 4 RIA++ 构造 |
| 06-distill-conflict.md | 阶段 5 V-CONFLICT |
| 07-verify-four-layer.md | 阶段 6 四层验证 |
| 08-verify-evidence-ledger.md | 阶段 7 Evidence Ledger |
| 09-verify-pressure-test.md | 阶段 8 压力测试 |
