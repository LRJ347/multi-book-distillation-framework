# 02 — 阶段 1:多书并行交叉提取(DISCOVER)

## 目标

从 N 本书中并行提取候选方法论单元,每个候选标注来源、chain_level、独立链归属——为阶段 3 的 MB 硬门槛做准备。

## 5 个 extractor(并行 spawn 5 个 sub-agent)

| sub-agent | 读取 prompt | 产出 |
|---|---|---|
| 框架提取器 | extractors/framework-extractor.md | candidates/frameworks.md |
| 原则提取器 | extractors/principle-extractor.md | candidates/principles.md |
| 案例提取器 | extractors/case-extractor.md | candidates/cases.md |
| 反例提取器 | extractors/counter-example-extractor.md | candidates/counter-examples.md |
| 术语提取器 | extractors/glossary-extractor.md | candidates/glossary.md |

每个 sub-agent 独立读书、独立提取、独立输出。长文本按分块策略处理;不支持并行时降级为串行,产出格式不变。

## 候选条目格式(必填字段)

```markdown
## <候选标题>
- **类型**: framework / principle / case / counter-example / glossary
- **来源**: <书 X> 第 Y 章(多书则逐条列出)
- **chain_level**: <L0-L4>(每个来源必须声明;未声明按 L1 保守计)
- **独立链归属**: <链 1 / 链 2 / 传播链>
- **核心**: 一句话
- **细节**: ...
- **多书交叉度**: <M/N 本书>
```

## 关键纪律

1. **每个候选必须做 Provenance Trace**: 画出来源关系图,识别共同祖先
   ```
   原始源头 X(书 A)
   ├─ 作者 B: 独立阅读 X → 结论 Y(L3, 独立链 1)
   ├─ 作者 C: 引用 X,独立得出结论 Y(shared source, 独立链 2)
   └─ 作者 D: 引用 B 的 Y 并扩展(dependency, 并入链 1)
   ```
2. **书籍数量 ≠ 独立证据数量**: 传播链(A→B→C)只算 1 条独立证据链
3. 依赖判定依据量化指标(wording_similarity >60% / explicit_citation / intermediate_claim 完全一致),非量化"高度相关"描述不构成依据
4. shared_primary_source(共同引用同一原始来源)默认 independent

## 产出

`books/<domain-slug>/candidates/<type>.md`(5 个文件),全部带完整来源标注。
