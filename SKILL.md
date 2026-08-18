---
name: mbdf-flv
description: |
  把一组同领域的经典书(N 本,N≥3)蒸馏成一套可被 Agent 调用的 skill 工具包。
  适用:用户说"把 X 领域的 N 本书蒸馏成 skill"/"用多书融合方法蒸馏"/
       "我有同领域的多本书想做成一个体系"/"多书融合拆书"等。
  不适用:单本书(用 cangjie-skill 即可)/纯文学/读后感/作者人设角色扮演。
version: 1.1.7
type: meta-skill(元 skill——只产出方法论应用产物,不掺杂任何具体领域知识)

trigger:
  positive:
    - 用户提供 N≥3 本同领域书籍路径,要求融合蒸馏
    - 用户说"用 MBDF-FLV"或"多书融合蒸馏"
    - 用户有同领域多本书想做成统一的知识体系
  negative:
    - 只有一本书 → 用 cangjie-skill(RIA-TV++)
    - 想做读后感/书摘 → 用普通摘要
    - 想扮演作者 → 用 nuwa-skill

decision_question: |
  用户是否提供了 N≥3 本具有实质内容关联的同领域书籍,
  并希望将其融合蒸馏为可调用的 skill 工具包?

input_required:
  - N 本书的 PDF/EPUB/TXT 路径(N≥3)
  - 领域定位(可选)
  - 领域 evidence_hierarchy(推荐,无则用默认)

output_type: 蒸馏项目(books/<domain-slug>/) + skill 工具包

confidence:
  high: N≥5 本经典书 + 明确领域 + evidence_hierarchy
  medium: N=3 本 + 领域清晰
  low: N=3 本但领域模糊 / 作者角色单一

architecture: DISCOVER → DISTILL → VERIFY 三循环 + 产物层
verification_structure:
  four_layer:
    - V-REF(引用权威校验)
    - V-REAL(真实世界验证)
    - V-NEG(反例验证)
    - V-E2E(端到端验证)
  compression_gate:
    - V4(语义不变量保真)

validation_status: |
  Protocol CLOSED — 经 4 轮盲态协议验证(16 隐藏案例 × 8 独立评估员,
  128 判定点),两个独立评估员在同一输入下产生相同裁决。
  详见 validation/BLIND_VALIDATION_RECORD.md

related_skills:
  direct: [cangjie-skill]
  transitive: [nuwa-skill, darwin-skill]
---

# MBDF-FLV — 多书融合蒸馏框架 v1.1.7

> **M**ulti-**B**ook **D**istillation **F**ramework with **F**our-**L**ayer **V**erification
>
> 把同领域 N 本经典书(N≥3)蒸馏成**可被 Agent 在真实场景调用**的 skill 工具包,
> 保证蒸馏产物**可追溯、可验证、可演化、可重复**。

## 使命

- ✅ 做:方法论 / 决策框架 / 清单 / 原则 / 概念体系的**多书融合蒸馏**
- ❌ 不做:书摘 / 读后感 / 作者人设扮演(后者用 nuwa-skill)
- ❌ 不做:单本书蒸馏(用 cangjie-skill)

## 核心约束(不变量)

1. **原子性**: 一个 skill 只做一个方法论单元
2. **多书交叉**: MB 独立证据链 ≥ 2(硬门槛,作者数仅辅助)
3. **可追溯**: 每条 R 标注章节;Evidence Ledger + Provenance Trace 完整
4. **可验证**: 四层验证 + V4 Gate;阈值以 EVALUATION_PROTOCOL.md 为唯一权威(SSOT)
5. **用户参与**: 阶段 0 后必须用户确认骨架
6. **Routing/Evidence 分离**: Routing 决定调用,Evidence 决定可信度,互不污染
7. **无领域污染**: 本框架只含方法论元规则;evidence_hierarchy 由领域定义
8. **终止条件**: max_rounds=3,超限 → CONDITIONAL(人工复核),不无限循环

## 三循环架构

```
DISCOVER 发现层                     DISTILL 蒸馏层
├ 0 领域骨架扫描 → DOMAIN_OVERVIEW  ├ 3 三重筛选(V1/V2/V3/MB) → verified.md
├ 1 多书并行交叉提取 → candidates/  ├ 4 RIA++ 构造(含 Skill Card) → SKILL.md
└ 2 候选聚类 → clusters/            └ 5 V-CONFLICT 冲突/条件化裁决
                                      ↓
        VERIFY 验证层                 FAIL → 回 DISTILL
        ├ 6 四层验证 + V4 Gate        stuck → CONDITIONAL(人工)
        ├ 7 Evidence Ledger
        └ 8 压力测试(routing accuracy/FP/FN)

产物层(按需): INDEX / KNOWLEDGE_GRAPH / compiler / LEARNING_NOTE / TALKING_POINTS
元规则: AUTHOR_WEIGHT / FAILURE_MODES / CONFLICT_RULES / EVALUATION_PROTOCOL
```

## 何时调用

用户说类似:
- "把 X 领域的 N 本书蒸馏成 skill"
- "用多书融合方法蒸馏这几本同主题的书"
- "我有同领域的多本书想做成一个体系"
- "distill these N books on <topic> into a skill suite"

## 输入要求(开始前必须确认)

1. **书本文本来源**: N≥3 本书的 PDF/EPUB/TXT 路径或可访问纯文本。**不要凭记忆蒸馏**。
2. **书名 + 作者 + 出版年**: 用于目录命名和审计。
3. **领域定位**(可选): 一句话说明领域,用于 evidence_hierarchy。
4. **是否首次试点**: 建议先蒸馏 1 个领域验证流程再批量。

## 执行流程(严格按顺序)

### DISCOVER

#### 阶段 0 — 领域骨架扫描
1. 批量读 N 本书目录/序言/结语,标注重心章节
2. 提取三层: 术语层 / 议题层 / 作者分歧
3. 定义领域 evidence_hierarchy(证据层级,见 `methodology/01-discover-domain-scan.md`)
4. 按 `templates/DOMAIN_OVERVIEW.md.template` 产出,写入 `books/<domain-slug>/DOMAIN_OVERVIEW.md`
5. **展示给用户确认骨架**,确认后才进入阶段 1

#### 阶段 1 — 多书并行交叉提取
并行 spawn 5 个 sub-agent(extractors/ 下 5 个 prompt):
| extractor | 产出 |
|---|---|
| framework-extractor | 决策框架 / 思维模型 |
| principle-extractor | 原则 / 清单 / 规则 |
| case-extractor | 作者亲自用过的实例 |
| counter-example-extractor | 书中警告的失败模式 |
| glossary-extractor | 关键概念词典 |

每候选标注: 类型 / 来源(书+章节)/ chain_level(L0-L4)/ 多书交叉度 / 独立链归属。

#### 阶段 2 — 候选聚类
- 相似度匹配合并同一概念;拆分误聚合
- 门控: DM-1 过度细分 / DM-2 过度聚合 / DM-3 漏核心议题(见 FAILURE_MODES.md)

### DISTILL

#### 阶段 3 — 三重筛选(+ MB 来源独立)
- **V1 证据独立性**: ≥2 个独立证据场景(同书不同章节/案例)
- **V2 预测力**: 新场景推导,需非平庸结论(与 baseline 对照,防常识包装)
- **V3 独特性**: 非任何聪明人都说的常识
- **MB 来源独立性**: ≥2 条独立证据链(见 EVALUATION_PROTOCOL.md §3.1)
- 未通过 → rejected/(附原因,可事后捞回)
- 用户轻确认: "这 N 个会做成 skill,有想捞回或砍掉的吗?"

#### 阶段 4 — RIA++ 构造(SKILL.md)
按 `templates/SKILL.md.template` 填充:
- **Skill Card**: trigger / decision_question / input_required / output_type / confidence
- **R**: 原文引用 ≤150 字/段,标注章节
- **I**: 用自己的话重写 5-15 行
- **A1**: 书中案例 1-3 条(问题→方法→结论→结果)
- **A2**: 触发场景 3-5 条(可识别语言信号)→ description
- **E**: 可执行步骤(每步有完成标准 + 自查清单)
- **B**: 边界(反场景 + 与相邻 skill 区分)

#### 阶段 5 — V-CONFLICT 冲突/条件化裁决
| 冲突类型 | 处理 |
|---|---|
| 表面冲突 | 统一表述 |
| 条件冲突 | 加入适用条件 |
| 真冲突 | 保留两个 competing skills |
| 无法裁决 | 降级为候选 |

### VERIFY

#### 阶段 6 — 四层验证 + V4 Gate
按 `EVALUATION_PROTOCOL.md`(唯一权威)执行:
- V-REF(权威校验,类别映射 supported/enhanced/conflict/无输入)
- V-REAL(coverage ≥80% AND overreach ≤10%,按 evaluation_unit)
- V-NEG(hard=0;soft 按 Level 阈值;Level 必须声明)
- V-E2E(hard_constraints + quality_dimensions 两层)
- V4(semantic_invariants 语义保真)
- 验证结果写入 `<skill-slug>/验证报告.md`

#### 阶段 7 — Evidence Ledger
每个 skill 建立 `<skill-slug>/EVIDENCE_LEDGER.md`(按 `templates/EVIDENCE_LEDGER.md.template`):
核心命题 / Provenance Trace / 独立证据链 / 支持冲突 / 适用条件反例 / 各轮验证结果 / 状态

#### 阶段 8 — 压力测试
- 按复杂度分级(L1/L2/L3)生成 `test-prompts.json`(should / should_not / boundary / cross-skill)
- routing_accuracy ≥85% AND FP ≤10% AND FN ≤10%(n≥20)
- 未过 → 回炉阶段 4;跨 skill 混淆率低 → 回阶段 5

### 终止与状态
- iteration_policy: max_rounds=3
- 状态机: VERIFIED(全红线通过)/ CONDITIONAL(可入候选库,禁 production)/ REJECTED(硬伤)
- 任何 claim INVALID → 整体 INVALID(打回补数据)

## 质量红线(违反则阻止输出)

1. 每个 skill 通过四层验证 + V4 Gate
2. 每个 skill 有 R/I/A1/A2/E/B 六段 + Skill Card
3. 原文引用 ≤150 字/段,标注具体章节
4. MB 独立证据链 ≥2
5. decision_question 具体到 skill 核心领域,不得宽泛
6. semantic_invariants 蒸馏前后完全保留(语义保真)
7. 阈值只存在于 EVALUATION_PROTOCOL.md(SSOT),其他文件只引用
8. pilot(n=10)仅诊断,不可产生 VERIFIED
9. 协议升级 ≠ 历史结果自动升级(旧结果保留其 protocol_version)

## 调用惯例

- **永远先试点 1 个领域** — 除非用户明确说"批量"
- **阶段之间主动汇报进度** — 不静默跑完再 dump
- **不凭记忆拆书** — 没文本就停下来问
- **保留审计轨迹** — candidates/ 和 rejected/ 都要留
- **验证失败回 DISTILL** — 不做表面修补
- **冲突不强行统一** — 走 V-CONFLICT
- **V4 不可跳过** — 压缩损失必查

## 文件索引

| 文件 | 内容 |
|---|---|
| `EVALUATION_PROTOCOL.md` | 评估协议 v1.1.7(冻结,唯一阈值权威) |
| `AUTHOR_WEIGHT.md` | 作者角色标签(先验)与证据强度(后验) |
| `FAILURE_MODES.md` | 已知失败模式 DM-1~DM-18 |
| `CONFLICT_RULES.md` | 冲突裁决优先级 |
| `methodology/` | 三循环 9 个阶段详解 |
| `extractors/` | 5 个并行提取器 prompt |
| `templates/` | 6 个产出模板 |
| `validation/BLIND_VALIDATION_RECORD.md` | 4 轮盲态验证记录(CLOSED 依据) |
