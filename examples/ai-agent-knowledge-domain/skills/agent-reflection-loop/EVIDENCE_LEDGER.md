# Evidence Ledger — agent-reflection-loop

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: 反思循环让 agent 通过"生成→评估→修正"迭代改进输出,评估者可与生成者分离
P2: 反思必须设迭代上限(防 token 浪费/越改越差),失败经验可写入记忆(Reflexion 变体)

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Agentic Design Patterns | Antonio Gulli | practitioner | Ch4 | framework | L4 | high |
| 构建 Agentic AI 系统 | Anjanava Biswas | practitioner | Ch4 | theory+framework | L4 | high |
| AI Agent 应用开发 | 尹浩 | practitioner | Ch6 | framework+case | L4 | high |
| Designing Multi-Agent Systems | Victor Dibia | integrator | Ch7 | framework | L3 | medium |

## 独立证据链
- 链 1: Gulli Ch4(英文,Reflection 作为核心模式)
- 链 2: 比斯瓦斯 Ch4(中文译,元推理/自我解释/自我建模的元认知框架)
- 链 3: 尹浩 Ch6(中文,Reflexion 作为规划能力章节的独立技术,失败经验回写)
- 链 4: Dibia Ch7(微软研究者,多 agent 上下文中的反思机制)

## 支持 / 冲突
- 支持: 4 书一致支持"反思=循环迭代+评估驱动修正"为核心质量改进机制
- 冲突: 无显著冲突;自评 vs 外部批评者 vs LLM-as-judge 的差异已在 I/E 段以"成本/客观性"权衡覆盖

## 适用条件 / 反例
- 适用: 有客观评估标准的任务(代码/写作/可验证输出)
- 不适用: 无法客观评估的任务(B 段反场景 1);低风险简单输出(B 段反场景 2)
- 反例: 无迭代上限 → token 浪费且越改越差(x10)
- 与相邻 skill 区分: agent-evaluation(系统化批量评估 vs 单次反思);反思可嵌入 ReAct 循环

## 验证结果(待填,阶段 6 执行后回填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证)
