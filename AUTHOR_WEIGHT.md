# AUTHOR_WEIGHT — 作者角色与证据强度

> 目的: 多书融合时,不同作者的观点不应被平等对待;但作者身份**不等于命题正确**。

## 双重维度(独立评估,联合使用)

### 维度 1: author_role(先验 — 作者在知识谱系中的位置)

| 角色 | provenance_role | 说明 |
|---|---|---|
| founder | originator(原创源头) | 领域开创者,原创观点 |
| integrator | synthesizer(综合整理) | 综合多人观点,系统化整理 |
| practitioner | field_experience(实战经验) | 实战经验丰富 |
| critic | counterpoint(反向证据) | 反向证据,防回声室(有 V-CONFLICT 触发权) |
| popularizer | disseminator(传播简化) | 面向大众,可能简化 |

**标签化,不是评分**。角色只用于证据**排序**(V-CONFLICT 优先级、V-REF 权威匹配),**不参与事实正确性计算**。"founder" ≠ "更正确",只表示知识谱系位置更靠前。

### 维度 2: evidence_strength(后验 — 该具体命题的证据强度)

| 强度 | 标准 |
|---|---|
| high | 有原始研究/数据支持;多本独立书一致认可(独立链,非传播链);真实案例反复验证 |
| medium | 有理论支撑但实证有限;部分书认可部分书反对 |
| low | 仅经验性主张;仅来自单一权威;与最新研究冲突 |

## 反例陷阱(必须避免)

```
作者身份: founder
但某条具体命题: 实证支持弱 → evidence_strength = low
→ 不能仅凭 founder 身份就提高该命题的可信度
```

## 应用规则

1. **MB 通过**: 只看 independent_chain_count ≥ 2(硬门槛),**不看 author_role 之和**
2. **V-CONFLICT**: author_role 影响优先级,但 critic 永远有触发权
3. **V-REF**: author_role + evidence_strength 联合参与权威匹配
4. **V-REAL**: evidence_strength 主导,author_role 作为后置修正

## 记录位置

每个来源在 Evidence Ledger 的 Provenance Trace 中标注 author_role 与 evidence_strength 两列。
