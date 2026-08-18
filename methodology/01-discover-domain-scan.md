# 01 — 阶段 0:领域骨架扫描(DISCOVER)

## 目标

读完 N 本书的目录/序言/结语,产出**领域地图**,与用户对齐"这个领域在讲什么",并定义领域证据层级(evidence_hierarchy)。

## 输入

- N 本书(N≥3)的 PDF/EPUB/TXT 路径
- 领域定位(可选): 一句话说明

## 步骤

1. **批量读目录**: 每本书 5-10 分钟,标注重心章节
2. **读序言 + 结语**: 了解作者"问题意识"和"想说什么"
3. **提取三层**:
   - **术语层**: 领域专有概念(标注作者用法 vs 通用含义)
   - **议题层**: 领域核心问题(N 本书重复出现的议题)
   - **作者分歧**: 同一议题不同作者的不同观点
4. **定义 evidence_hierarchy**(领域证据层级,供 V-REF 使用)

## evidence_hierarchy(必做,领域特定)

MBDF 不规定固定权威等级——不同领域证据结构不同:

```
示例(仅示意,必须按领域重新定义):
医学:     systematic_review > RCT > cohort_study > expert_opinion > case_report
软件工程: production_postmortem > benchmark > practitioner_consensus > book > blog
影视:     box_office > award > critic_consensus > practitioner_book > popular_article
```

## 产出

按 `templates/DOMAIN_OVERVIEW.md.template` 填充,写入 `books/<domain-slug>/DOMAIN_OVERVIEW.md`。

## 门控

- **必须用户确认骨架**:"骨架我理解对了吗?有没有希望重点突出的方向?"
- 未确认不得进入阶段 1
- DM-3 检查: 是否漏掉核心议题?(只看了 1 本书的目录 = 违规)
