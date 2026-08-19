# 方法论_蒸馏框架 — MBDF-FLV v1.1.7

> **M**ulti-**B**ook **D**istillation **F**ramework with **F**our-**L**ayer **V**erification
> 多书融合蒸馏 + 四层验证框架(元 skill,纯方法论,无领域污染)

> 🌐 [English](README.en.md) | 中文

## 一句话

把同领域 N 本经典书(N≥3)蒸馏成**可被 Agent 调用**的 skill 工具包,保证**可追溯、可验证、可演化、可重复**。

## 适用场景

- ✅ 用户有同领域多本经典书,想做成统一的知识体系
- ✅ 需要多书交叉验证的方法论蒸馏(每知识点 ≥2 独立证据链)
- ✅ 需要严格质量保证(四层验证 + V4 保真门 + 盲态可重复评估)
- ❌ 单本书 → 用 cangjie-skill(RIA-TV++)
- ❌ 读后感/书摘/作者人设 → 其他工具

## 核心资产

| 文件 | 内容 |
|---|---|
| `SKILL.md` | 入口(触发/流程/红线/调用惯例) |
| `EVALUATION_PROTOCOL.md` | **评估协议 v1.1.7(冻结,唯一阈值权威 SSOT)** |
| `AUTHOR_WEIGHT.md` | 作者角色(先验)与证据强度(后验) |
| `FAILURE_MODES.md` | 已知失败模式 DM-1~DM-18 |
| `CONFLICT_RULES.md` | 冲突裁决优先级 |
| `methodology/` | 三循环 9 阶段详解(00-overview ~ 09-pressure-test) |
| `extractors/` | 5 个并行提取器 prompt |
| `templates/` | 6 个产出模板(SKILL/Overview/Ledger/测试/验证报告/素材索引) |
| `validation/` | 4 轮盲态验证记录(Protocol CLOSED 依据) |

## 快速开始

1. 读 `SKILL.md` 了解触发与流程
2. 按 `methodology/00-overview.md` 走三循环:DISCOVER → DISTILL → VERIFY
3. 验证时严格以 `EVALUATION_PROTOCOL.md` 为唯一依据
4. 产出按 `templates/` 填充

## 状态

- 架构: 冻结 ✅
- 评估协议: v1.1.7 CLOSED ✅(4 轮盲态验证: 16 案例 × 8 评估员 × 128 判定点)
- 后续(v2.0): 运行期监控 / 漂移检测 / 在线反馈 / 周期性重蒸馏

## 实际应用示例

📚 **[AI Agent 知识域](examples/ai-agent-knowledge-domain/)** — 11 本 AI Agent 书籍 → 16 个 skill 的完整蒸馏产物:

- 覆盖: 核心循环 / 能力 / 上下文 / 协作 / 治理 五簇(react-loop、orchestration、mcp-integration、context-engineering、guardrails 等)
- 每个 skill 含四件套: SKILL.md(Skill Card + RIA++ 六段)/ test-prompts.json / EVIDENCE_LEDGER.md / 验证报告.md
- 含完整审计链: DOMAIN_OVERVIEW / verified(筛选理由)/ V-CONFLICT(冲突裁决)/ KNOWLEDGE_GRAPH(引用图)/ GLOSSARY(50 术语)
- 状态: 全部 CONDITIONAL(结构验证 PASS,待真实项目实测升级 VERIFIED)

## 插件(DeepSeek Harness)

🔌 **[plugins/](plugins/)** — 把框架与蒸馏产物装进 DSH,agent 原生可调用:

| 插件 | 注册内容 | 说明 |
|---|---|---|
| `dsh-distill-framework` | `mbdf-flv` 方法论 skill | agent 原生具备多书融合蒸馏能力(三循环 + 四层验证) |
| `dsh-agent-skills` | 16 个 AI Agent 设计 skill | 蒸馏产物直接注册,加载即用(编排/工具/上下文/治理) |
| `dsh-minimax-vision` | MiniMax 视觉理解工具 | 本地图片/URL 交给 MiniMax-VL-01 识别(视觉增强) |

> ⚠️ **插件规范**: 所有自定义插件 package.json **必须含 `dsh.bundle`**(指向入口),否则加入 bundles 会导致 DSH 启动崩溃。已对全部插件补齐。详见 [TROUBLESHOOTING_BUNDLE_MISSING_DSH_BUNDLE.md](plugins/TROUBLESHOOTING_BUNDLE_MISSING_DSH_BUNDLE.md)。

安装: 构建(`bash scripts/build.sh`)后通过 dsh-super-injector 装配,或加入 profile bundles。详见各插件 README。
