# 07 — 阶段 6:四层验证 + V4 Gate(VERIFY)

## 目标

对每个 skill 执行四层验证 + 压缩保真门。**本阶段唯一权威是 EVALUATION_PROTOCOL.md(SSOT)**,本文件只做执行指引,不复制阈值。

## 执行顺序(防泄漏,强制)

```
Skill freeze → Scope freeze(独立审查)→ Test freeze(gold 冻结)→ Evaluation
```

## 四层验证

### V-REF(引用权威校验)
- 用领域 evidence_hierarchy 对照 skill 主张
- 类别映射: supported → PASS / enhanced → PASS / conflict → CONDITIONAL / 无输入 → INVALID
- 职责是校验,不是替代来源

### V-REAL(真实世界验证)
- 用真实作品/案例验证规则解释力
- 指标: coverage(≥阈值)与 overreach(≤阈值),按 evaluation_unit 计算
- scope_integrity: 声称能力 > 评估范围 → FAIL
- 数据来源五级: real / anonymized_real / public_case / controlled_simulation / synthetic

### V-NEG(反例验证)
- 构造反例测试错误检测能力
- hard_failure(明显违反核心规则未识别)→ FAIL
- soft_failure(边缘不稳定)→ 记录,回 B/trigger 调整
- Level 必须声明;n 必须达标

### V-E2E(端到端验证)
- 真实输入走完整调用链
- 两层: hard_constraints(不能错)+ quality_dimensions(真的好)
- 先写评分标准 → 再跑 → 最后评分(禁止倒过来)

## V4 Gate(压缩保真门)

- 检查 semantic_invariants 蒸馏前后是否**语义保留**(允许结构重组)
- 删除/扭曲/概括化 → FAIL
- 无对比材料 → INVALID

## 产出

每个 skill 的 `<skill-slug>/验证报告.md`(按 templates/验证报告.md.template),包含:
- V-REF 对照表(逐条: 规则 / 权威 / 类别 / 状态)
- V-REAL 指标(coverage/overreach + n + 数据来源)
- V-NEG 结果(hard/soft 计数 + Level)
- V-E2E 结果(contract + quality 各维)
- V4 结果(invariants 对照)
- 结论: 通过项 / 修正项 / 补入项

## 门控

| ID | 症状 | 处理 |
|---|---|---|
| DM-10 | V-REAL 未找到真实作品(用合成替代) | 找真实案例 |
| DM-11 | V-NEG 反例太简单 | 构造更有挑战性反例 |
| DM-12 | V-E2E 用合成数据 | 用真实输入 |
| DM-13 | routing 指标不达标 | 回阶段 5 调整边界 |
| DM-16 | V4 漏检 | 补 invariants |
| DM-17 | invariants 未保留 | FAIL |
