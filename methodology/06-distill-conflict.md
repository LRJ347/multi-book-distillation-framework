# 06 — 阶段 5:V-CONFLICT 冲突/条件化裁决(DISTILL)

## 目标

不强行统一多本书的冲突,而是**显化冲突**,产出适用的 skills。这是多书融合真正的价值——不是"统一",而是"显化冲突与边界"。

## 冲突类型与处理(唯一)

| 冲突类型 | 定义 | 处理 |
|---|---|---|
| 表面冲突 | 表述不同但本质相同(如"快速失败"vs"尽早试错") | 统一表述 |
| 条件冲突 | 不同条件下结论不同(如简单系统用 X / 复杂系统用 Y) | 加入适用条件 |
| 真冲突 | 不可调和的分歧(书 A 原则 X vs 书 B 原则 X 的反面) | 保留两个 competing skills |
| 无法裁决 | 当前信息不足 | 降级为候选,不进入 verified |

## 条件冲突的产出形式

```markdown
## 适用条件
- 在 <条件 A> 下: 用方案 X
- 在 <条件 B> 下: 用方案 Y
- 在 <条件 C> 下: 无明确推荐
```

## 真冲突的产出形式

```
skill-X-a/   # 方案 A
skill-X-b/   # 方案 B
```
并在 KNOWLEDGE_GRAPH.md 中标注为 competing。

## 与 V-REF 的联动

- V-REF 类别为 conflict(权威冲突)→ CONDITIONAL(见 EVALUATION_PROTOCOL.md §3)
- 冲突裁决依据领域 evidence_hierarchy;critic 观点永远有触发权(防回声室)

## 门控

- DM-5: V-CONFLICT 被绕过(真冲突被强行统一)→ 重走本阶段
