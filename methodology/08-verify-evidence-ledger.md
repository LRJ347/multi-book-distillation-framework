# 08 — 阶段 7:Evidence Ledger(VERIFY)

## 目标

每个 skill 建立证据账本,确保**可追溯、可演化**——修改 skill 时能回答"这条规则为什么存在",而不是只剩最终 SKILL.md。

## 文件位置

`<skill-slug>/EVIDENCE_LEDGER.md`(按 templates/EVIDENCE_LEDGER.md.template)

## 核心内容

```markdown
# Evidence Ledger — <Skill 名>

> 版本: v1.0.0 | 蒸馏日期: <日期> | 来源书数: N

## 核心命题
P1: <一句话命题>
P2: <二句话命题>

## Provenance Trace(必填)
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| <书1> | <作者> | founder | Ch.X | framework | L4 | high |

## 独立证据链
- 链 1: <书 A>(原始)
- 链 2: <书 C>(独立,不同证据)
- 传播链: <书 B>(引用 A,不独立)

## 支持 / 冲突
- 支持: <书 A> ✓ / <书 C> ✓
- 冲突: <书 D> ✗(<冲突点>,处理: 条件化/competing)

## 适用条件 / 反例
- 适用: 在 <条件 X> 下成立
- 不适用: <条件 Y> 下不成立

## 验证结果(各轮)
- V-REF: supported / enhanced / conflict(附权威层级来源)
- V-REAL: coverage = X%(n=Y) / overreach = Z%
- V-NEG: hard = 0 / soft = X%(Level)
- V-E2E: contract 通过(版本号)/ quality 各维
- V4: semantic_invariants 保留(允许结构重组)

## 版本历史
### v1.0.0(<日期>) — 初始蒸馏
### v1.1.0(<日期>) — 变更: <新增来源/冲突处理/边界调整>(附理由)

## 状态
VERIFIED / CONDITIONAL / REJECTED(+ 原因)
```

## 关键纪律

1. **Provenance Trace 必填** — 每个来源标注 L0-L4 与证据类型(framework/case/counter-example)
2. **author_role ≠ evidence_strength** — 两列独立: 奠基人的某条具体命题可能 evidence_strength=low
3. **版本化** — 变更记录演化轨迹,不覆盖历史
4. **不把整本书放进 references** — 只保留被引用的关键段落
