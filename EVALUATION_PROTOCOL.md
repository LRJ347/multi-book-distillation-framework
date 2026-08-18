# EVALUATION_PROTOCOL.md — MBDF-FLV 评估协议 v1.1.7(冻结)

> 全框架唯一 Evaluation SSOT。所有阈值以此文件为准,其他文件只允许 threshold_ref 引用,不得复制数字。
> 状态: **CLOSED** — 经 4 轮盲态协议验证(16 隐藏案例 × 8 独立评估员 × 128 判定点),两独立评估员同一输入产生相同裁决。
> 验证记录: validation/BLIND_VALIDATION_RECORD.md

## 0. 全局状态枚举(唯一)

| 状态 | 含义 |
|---|---|
| PASS | 数据齐全 + 达标 |
| FAIL | 数据齐全 + 不达标(skill 的问题) |
| CONDITIONAL | 部分通过或有条件通过 |
| INVALID | 输入不完整/程序违规,无法评估(不是 skill 的问题) |

- 阈值比较**含等号**(≤10% 含 10% 本身)
- INVALID ≠ FAIL ≠ PASS;存在任一 INVALID → Final 不得为 VERIFIED

## 1. MB Source Independence(多书来源独立性)

### 1.1 硬门槛
- **hard_gate**: independent_chain_count ≥ 2
- author_requirement: distinct_authors ≥ 2(辅助条件,不单独构成通过)
- 质量门: 至少 1 条链达到 L3/L4

### 1.2 来源独立性等级
| 等级 | 定义 | 是否独立 |
|---|---|---|
| L0 | 同一作者重复出版/改版 | 否 |
| L1 | 不同作者,直接引用同一中间结论(direct_dependency) | 否 |
| L2 | 不同作者,间接引用(隔 1+ 层) | 否(弱,可作补充) |
| L3 | 不同作者、不同理论来源 | 是 |
| L4 | 不同作者 + 不同研究/实践证据 | 是(最强) |

### 1.3 独立链判定维度
- source_access_independence: 作者是否可独立获取原始来源
- intermediate_claim_independence: 中间结论是否独立得出
- reasoning_path_independence: 推理结构是否独立
- wording_similarity: 关键句措辞重叠 > 60% 视为复制
- explicit_citation_dependency: 是否显式声明依赖他人中间结论

### 1.4 dependency_confirmed_if(任一条即判依赖)
- 显式依赖他人中间结论
- 措辞 >60% 且推理路径相同
- 中间结论完全一致且无独立推导痕迹

### 1.5 shared_primary_source
- 共同引用同一原始来源,**默认 independent**(独立验证 ≠ 传播链)
- 若一方明显复制另一方的解释链(措辞/推理结构高度雷同)→ 降级为 dependency

### 1.6 chain_level 声明规则
- 每个来源必须声明 chain_level(L0-L4)
- **未声明 → 按 L1(direct_dependency)保守计,不得贡献 L3/L4 质量门**

### 1.7 非量化描述规则
- "高度相关/疑似依赖/内容相似"等非量化描述**不构成** dependency 判定依据
- 依赖判定必须基于 §1.3 量化指标之一
- 非量化描述仅可触发"按 L1 保守计"(因未声明 Level),不得直接判 FAIL

### 1.8 铁律
- **书籍数量 ≠ 独立证据数量**(5 本书引用同一源头 = 1 条证据链 × 5 次传播)
- 不确定案例: 第二 evaluator 判定 → 分歧仲裁 → 仍分歧: 该链计 0(不贡献 hard_gate)

## 2. Input Completeness Contract(输入完整性契约)

任一输入缺失 → 对应验证项 = INVALID:

| 验证项 | 必需输入 |
|---|---|
| MB | 来源列表(作者/chain_level/关系描述) |
| V2 | 五维数据(A/B 组均值、n、CI、p)+ 阈值冻结记录 |
| V-REAL | scope_declaration + skill_description + coverage/overreach 原始计数 |
| V-NEG | Level 声明 + 反例清单(hard/soft 分类依据) |
| V-E2E | hard_constraints 清单 + quality 每维得分 + 最低分冻结记录 |
| V4 | 蒸馏前后对比材料(semantic_invariants 清单) |
| routing | routing_accuracy / FP / FN / n |
| V-REF | 领域权威对照材料(supported/enhanced/conflict 证据) |

## 3. V-REF(引用权威校验)

### 3.1 职责
校验,不替代来源。权威层级由领域定义(evidence_hierarchy 在 DOMAIN_OVERVIEW.md 中),不跨领域硬编码。

### 3.2 类别 → 状态映射表(唯一)
| 输入类别 | 映射状态 | 理由 |
|---|---|---|
| supported(权威支持) | PASS | 与领域权威一致 |
| enhanced(权威扩展) | PASS | 权威扩展本 skill,无冲突 |
| conflict(权威冲突) | **CONDITIONAL** | 冲突 ≠ skill 错误;可能为立场分歧,进 V-CONFLICT 条件化裁决 |
| 无输入(材料缺失) | INVALID | 程序违规,打回补数据 |

### 3.3 禁止行为
- 禁止把 conflict 映射为 FAIL(权威冲突不构成 skill 硬伤)
- 禁止把 conflict 判为 INVALID(输入已提供,只是类别特殊)
- 禁止"V-REF 缺失但按 V4 通过"的宽松解读
- 禁止"V-REF 无材料贡献"的默认假设

### 3.4 权威类型(排序按领域定义)
primary_research / textbook / industry_standard / expert_consensus / critical_view
- critical_view 永远有 V-CONFLICT 触发权(防回声室)

## 4. V2 Predictive Test(预测力测试)

### 4.1 统计参数(全局固定,不可逐项目更改)
- alpha = 0.05
- confidence_level = 95%
- test_direction = two_sided
- null_value = 0
- multiple_comparison: 不修正(五维各自独立检验)

### 4.2 维度效应单位与方向(唯一)
| 维度 | 单位 | 方向 |
|---|---|---|
| accuracy | 比例差(pp) | 越大越好 |
| calibration | 校准误差绝对差 | **越小越好(方向性维度)** |
| decision_quality | 双评一致率差(pp) | 越大越好 |
| boundary_recognition | 比例差(pp) | 越大越好 |
| novel_case | 比例差(pp) | 越大越好 |

### 4.3 判定规则
- baseline = control_group_mean(B 组)
- 普通维度(越大越好): effect_absolute = skill - baseline;effect_relative = delta / baseline
- **方向性维度(越小越好,当前仅 calibration)**:
  - 改善量 = max(0, baseline - skill_mean)
  - 恶化量 = max(0, skill_mean - baseline)

### 4.4 dimension_pass(全部满足才 PASS)
1. n >= minimum_n(standard = 20)
2. 普通维度: (effect_absolute >= absolute_threshold OR effect_relative >= relative_threshold)
   方向性维度: 改善量 >= absolute_threshold
3. significance_test_passed(alpha=0.05, two-sided)
4. 95% CI 不跨 null(0)

### 4.5 dimension_materially_worse
- 普通维度: effect_absolute <= -1 * worse_threshold
- 方向性维度: 恶化量 >= worse_threshold

### 4.6 V2 总判定(仅基于非 INVALID 维度)
- 有效维度(非 INVALID)< 3 → V2 = INVALID(证据不足)
- worse_count > 0 → V2_FAIL
- dimensions_passed_count >= 3 → V2_PASS
- 否则 → V2_FAIL

### 4.7 pilot 规则
- pilot(n=10): 仅诊断,不得产生 VERIFIED
- n < 20 → 所有维度 n 条件不满足
- pilot 只能发现问题,不允许作为 VERIFIED 依据

### 4.8 dimension_independence
- 任意两维共享 evaluation units > 30% → V2 = FAIL(reject)

### 4.9 程序违规
- **阈值冻结缺失(absolute/relative/worse 未提供)→ V2 = INVALID**
- 任一维度必要数据(CI/显著性/阈值)缺失 → 该维度 = INVALID

### 4.10 维度判定检查清单(每维逐项核对,防漏检)
```
[ ] 1. n >= minimum_n
[ ] 2. effect 达标(abs 或 rel / 改善量)
[ ] 3. p < alpha(0.05, two-sided)
[ ] 4. 95% CI 不跨 null(0)
```
注意: 3、4 是独立条件,必须分别核对;即使 effect 很大,CI 跨 0 或 p ≥ 0.05 仍判该维 FAIL。

### 4.11 阈值冻结契约(Test Freeze 前必须完成)
- baseline_definition(B 组的构造方法)
- absolute_threshold(每维,单位见 §4.2)
- relative_threshold(每维)
- worse_threshold(每维)
- 阈值理由(threshold_provenance: domain_standard / historical_variance / expert_consensus / decision_cost)
- 冻结后任何人不得调整;结果不达标不得事后调低阈值(违规 = 协议 FAIL)

## 5. V-REAL(真实世界验证)

- evaluation_unit = skill scope 内预先声明的目标变量
- coverage_rate = 正确解释的 in-scope 目标变量数 / 测试中出现的 in-scope 目标变量总数
- overreach_rate = 错误强断言的 out-of-scope units / 所有 out-of-scope units
- **denominator = 0 → N/A(不得写 0%;N/A ≠ 0%,不虚高也不惩罚)**
- pass: coverage >= 80% AND overreach <= 10%
- **scope_integrity**: scope_declaration 必须与 skill_description 声称能力一致;
  declared_capability > evaluated_scope → V-REAL = FAIL
- scope_declaration 必须包含: 目标变量(可枚举)/ in_scope 场景 / out_of_scope 场景

## 6. V-NEG(反例验证)

- hard_failure: 明显违反 skill 核心规则却无法识别 → 直接 FAIL
- soft_failure: 边缘反例识别不稳定 → 记录,回 B/trigger 调整
- denominator: evaluation_unit(每个反例 = 1 单元)
- **skill 必须声明 Level(L1/L2/L3);未声明 → V-NEG = INVALID(禁止"任意 Level 都过"推理)**
- minimum_n: L1=10 / L2=10 / L3=10;n < minimum_n → V-NEG = INVALID
- thresholds(rate AND absolute count,双条件):
  - L1: soft_rate <= 10% AND soft_count <= 1
  - L2: soft_rate <= 20% AND soft_count <= 2
  - L3: soft_rate <= 10% AND soft_count <= 1
- hard: 0(全 Level);hard > 0 → V-NEG = FAIL
- 反例构造者不得是 skill 设计者(防"对着答案出题")

## 7. V-E2E(端到端验证)

### 7.1 两层结构
- **hard_constraints**(must_include / must_not_include / boundary_checks): 违反 → 直接 FAIL
- **quality_dimensions**(correctness / completeness / actionability / boundary_safety): 每维 ≥ 冻结最低分,任一维不达标 → FAIL

### 7.2 规则
- **quality 每维最低分必须在 Test Freeze 前定义;未定义 → V-E2E = INVALID(程序违规)**
- Contract 保证"不能错";Quality rubric 保证"真的好"。两层缺一不可。
- E2E contract 在运行前冻结;运行后发现的"遗漏项"不得事后补入评分标准

## 8. V4(压缩保真门)

- semantic_invariants: 每个 skill 蒸馏前定义,蒸馏后验证
- **语义保真,不是位置保真**: 允许结构重组(条件从正文移到"适用条件"段)
- 检查: 条件/因果方向/适用对象/反例 是否语义保留
- 删除/扭曲/概括化(如"高并发"→"大规模")→ FAIL
- **无蒸馏前后对比材料 → V4 = INVALID**

## 9. Routing(路由测试)

- routing_accuracy >= 85% AND FP <= 10% AND FN <= 10%(n >= 20)
- FP(不应调用却调用)> FN(应调用未调用)更严重
- 测试 prompt 不得包含 skill 特有术语(术语遮蔽,防泄漏)

## 10. Expert Gold(专家金标准)

- minimum_expert_count: 2(独立评分,互不通信)
- 分歧 → 仲裁(第三专家)→ 仍分歧 → ambiguous_gold(该 case 剔除,单独报告)
- evaluable_n < minimum_n → 该测试 = INVALID(需补样)
- **Gold 三源分离**(三个问题不能用同一套 gold):
  | Gold 来源 | 生产者 | 回答的问题 |
  |---|---|---|
  | source_derived | evaluator 读 source books 标注 | skill 是否忠实蒸馏了书?(fidelity/V4) |
  | expert_derived | 独立领域专家(不接触 skill) | skill 对新问题是否合理?(novel/real-world) |
  | empirical_derived | 测量/实验/历史数据 | skill 在现实中是否有效?(性能) |

## 11. Claims 与状态机

### 11.1 Claims 映射(子项最严状态: FAIL > INVALID > CONDITIONAL > PASS)
| Claim | 组成 |
|---|---|
| fidelity | V-REF + V4 |
| validity | V2 + V-REAL |
| robustness | V-NEG + 边界 |
| routing | routing tests |
| production_readiness | V-E2E |

### 11.2 Decision Matrix(唯一)
```
| 条件 | Final |
|---|---|
| 任一 claim = INVALID | INVALID(整体,打回补数据) |
| fidelity = FAIL | REJECTED |
| robustness = FAIL(hard) | REJECTED |
| validity = FAIL(其余 PASS) | CONDITIONAL |
| routing = FAIL(其余 PASS) | CONDITIONAL |
| e2e = FAIL(其余 PASS) | CONDITIONAL |
| 任一 claim = CONDITIONAL | CONDITIONAL |
| 全部 PASS | VERIFIED |
```

### 11.3 聚合优先规则(唯一)
1. 任一 claim = INVALID → 整体 INVALID(不进入状态判定)
2. 无 INVALID 时:
   a. fidelity FAIL 或 robustness FAIL(hard) → REJECTED
   b. 其余 FAIL → CONDITIONAL
   c. 任一 CONDITIONAL → CONDITIONAL
   d. 全 PASS → VERIFIED

### 11.4 状态机(闭合)
```
VERIFIED ←(revalidation triggers)→ CONDITIONAL → REJECTED

VERIFIED = 全部红线通过,可发布
CONDITIONAL = 可入候选库/人工测试,禁止作为 production skill
REJECTED = 硬伤,不可发布(新证据 + 人工复核可重入)

revalidation triggers(VERIFIED → CONDITIONAL 条件):
  - material_new_evidence(实质新证据,非普通新书)
  - source_conflict(来源间出现新冲突)
  - domain_definition_change(领域定义/边界变化)
  - routing_failure_spike(routing 误调用率突增)
```

## 12. 数据来源

- 五级: real > anonymized_real > public_case > controlled_simulation > synthetic
- synthetic 不得冒充 real,需显式声明并标注"证据等级降低"
- 无真实样本时(隐私/商业/法律/安全限制)synthetic 可作为 supplementary evidence

## 13. 评估者一致性协议(Inter-Rater Reliability)

- 关键验证抽样 20% 双评,effective_n = max(5, ceil(total_n × 0.2))
- 指标按数据类型:
  - categorical: 类间一致率(如 Cohen's κ 或等效)
  - ordinal: 加权一致率
  - continuous: 可靠性指标(如 ICC 或等效)
- **raw agreement rate 只是基础指标,不得单独作为评估协议通过依据**(基础率陷阱: 95 个 PASS 案例中永远选 PASS 也有 90% 一致)
- agreement 低于阈值 → **EVALUATION PROTOCOL FAIL**(不是 skill FAIL)→ 修订 rubric → 重新评估
- 盲测: skill 设计者不评自己的 skill

## 14. 测试泄漏防护(Test-set / Leakage Protocol)

### 14.1 强制执行顺序
```
1. skill_freeze: DISTILL 完成后冻结 candidate skill
2. scope_freeze: 独立审查者批准 scope 后冻结
3. test_freeze: 独立生成/抽样测试集 + gold labels 冻结
4. evaluation: 用冻结的 test set 评估冻结的 skill
```
- 测试集构造者 ≠ skill 设计者(或盲测)
- test set 冻结后运行中不得增删改
- skill 在 freeze 后发现的缺陷记录但不修改(进入下一轮迭代)

### 14.2 术语遮蔽
- 测试 prompt 用中性描述替代 skill 术语
- 例: "两个人隔着桌子对峙" 而非 "轴线规则测试"

## 15. SSOT 版本策略(审计正确)

```yaml
threshold_ref:
  protocol: EVALUATION_PROTOCOL.md
  protocol_version: 1.1.7
  evaluated_against: 1.1.7

version_policy:
  协议升级 → 历史结果不自动升级
  旧结果永远保留其当时的 protocol_version(审计)
  新协议改变阈值 → 需要重新评估(显式触发,非自动)
  禁止声称"引用自动随版本更新"(Markdown 不会自动更新)
```

---

## 附录 A:阈值总表(唯一权威)

| 指标 | 阈值 | 绑定条件 |
|---|---|---|
| MB hard_gate | independent_chain_count ≥ 2 | 独立证据链 |
| MB author | distinct_authors ≥ 2 | 辅助条件 |
| MB chain quality | ≥1 条 L3/L4 | |
| V2 pilot | n=10,诊断 only,不可 VERIFIED | |
| V2 standard | n=20,≥3/5 维通过 | effect + significance + CI |
| V2 high_risk | n=30+ | 医疗/金融/安全 |
| V2 effect | 普通: abs 或 rel;方向性: 改善量 | 阈值 Test Freeze 冻结 |
| V2 worse | worse_threshold | 冻结 |
| V2 dimension_independence | 共享 units >30% → FAIL | |
| V-REAL coverage | ≥80% | 按 evaluation_unit |
| V-REAL overreach | ≤10% 或 N/A | 按 out-of-scope units |
| V-NEG hard | =0 | 全 Level |
| V-NEG soft | L1≤10%&≤1 / L2≤20%&≤2 / L3≤10%&≤1 | rate AND count |
| V-NEG minimum_n | 10(全 Level) | n<10 → INVALID |
| V-E2E quality | 每维 ≥ 冻结最低分 | 未冻结 → INVALID |
| V4 | 全部 semantic_invariants 语义保留 | 允许位置重组 |
| routing_accuracy | ≥85% | n≥20 |
| FP / FN | ≤10% | |
| double scoring | max(5, ceil(n×0.2)) | |
| evaluator agreement | 按数据类型指标 | raw rate 不单独用 |
| max_rounds | 3 | 之后 CONDITIONAL/REJECTED |

## 附录 B:状态机(唯一权威)
VERIFIED ←(revalidation triggers)→ CONDITIONAL → REJECTED
- triggers: material_new_evidence / source_conflict / domain_definition_change / routing_failure_spike

## 附录 C:Gold Source 对照表
| 问题 | gold 来源 | 生产者 | 用途 |
|---|---|---|---|
| 忠实蒸馏了吗? | source_derived | evaluator 读书 | fidelity/V4 |
| 新问题合理吗? | expert_derived | 独立专家 | novel/real-world |
| 现实有效吗? | empirical_derived | 测量数据 | 性能验证 |

---

*协议结束。MBDF-FLV v1.1.7 — Protocol CLOSED。任何修订需先改本文件版本号,并记录于 validation/BLIND_VALIDATION_RECORD.md。*
