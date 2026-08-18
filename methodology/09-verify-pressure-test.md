# 09 — 阶段 8:压力测试(VERIFY)

## 目标

验证 skill 在真实场景的**路由准确性**:该调用时被调用、不该调用时不调用、边界场景不误判、跨 skill 不混淆。

## test-prompts.json 分级

按 skill 复杂度分级(最低数量 + 按复杂度扩展):

| Level | 应调用 should | 不应调用 should_not(诱饵) | 边界 boundary | 跨 skill cross-skill |
|---|---|---|---|---|
| L1 简单 | 5 | 2 | 2 | 1 |
| L2 中等 | 8 | 3 | 3 | 2 |
| L3 复杂组合 | 12+ | 5+ | 5+ | 3+ |

格式按 `templates/test-prompts.json.template`。

## 测试类型要求

1. **should-invoke**: 明确应调用本 skill 的场景
2. **should-not-invoke(诱饵)**: 相似但不该调用的场景
3. **boundary**: 边界模糊场景(判定边界是否清晰)
4. **cross-skill**: 应触发同领域另一个 skill 的场景(至少 1 条,防跨 skill 混淆)

## 路由指标(唯一权威: EVALUATION_PROTOCOL.md §9)

- routing_accuracy ≥ 阈值
- FP(false positive: 不应调用却调用)≤ 阈值 — 比 FN 更严重(乱调用导致用户失望)
- FN(false negative: 应调用却没调用)≤ 阈值
- 样本 n ≥ 阈值

## 执行流程

1. 设计测试 prompt(构造者 ≠ skill 设计者,盲测)
2. **术语遮蔽**: 测试 prompt 用中性描述,不包含 skill 特有术语
3. Skill freeze → Test freeze → Evaluation(强制顺序,防"对着答案出题")
4. 未过 → 回炉阶段 4(RIA++ 重做),不做表面修补
5. 跨 skill 混淆率高 → 回阶段 5(调整相邻 skill 边界)
6. 每个 skill 测试结果写入 `<skill-slug>/test-results.md`

## 门控

- DM-13: routing 指标不达标 → 回阶段 5
- 跨 skill 混淆率异常 → 相邻 skill 边界不清,重做阶段 5
