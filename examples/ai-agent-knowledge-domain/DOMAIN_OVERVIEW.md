# AI Agent 知识域 — 领域骨架扫描(DOMAIN_OVERVIEW)

> 版本: v1.0.0 | 日期: 2026-08-18 | 来源书数: 11(10 个独立来源,Wooldridge 上下卷合并)
> 方法: MBDF-FLV v1.1.7 阶段 0(3 扫描员并行 + 主流程补充)

## 一句话定位

**如何把大语言模型(LLM)驱动的智能体(Agent)从"原型"构建为"可部署、可验证、可信赖"的工程系统**——覆盖设计模式、多智能体协作、上下文管理、记忆、规划、工具、评估、安全与伦理。

## 核心议题(N 本书重复出现)

| # | 议题 | 出现书籍 | 共识度 |
|---|---|---|---|
| 1 | Agent 设计模式(ReAct/Reflection/Planning/Tool Use/Chaining) | 02 Gulli, 07 比斯瓦斯, 08 尹浩, 05 Albada, 10 Fajardo, 12 Dibia | ★★★★★ |
| 2 | 多智能体协作与编排(workflow vs autonomous, orchestrator, CWD) | 02, 05, 07, 08, 10, 11, 12, 03+04 | ★★★★★ |
| 3 | 记忆系统(短期/长期/向量/压缩) | 02, 05, 08, 10, 12 | ★★★★ |
| 4 | 上下文工程与管理(Context Engineering, token 预算) | 11 Rothman(专书), 01 凌峰, 08 尹浩 | ★★★ |
| 5 | 工具使用与 MCP(Model Context Protocol) | 02, 05, 08, 10, 11, 12 | ★★★★★ |
| 6 | RAG 知识检索(高保真/防投毒) | 01, 05, 08, 11 | ★★★★ |
| 7 | 评估、可观测性与生产监控 | 02, 05, 11, 12 | ★★★★ |
| 8 | 安全、Guardrails、伦理与可信 AI | 02, 05, 07, 11, 12 | ★★★★ |
| 9 | 多智能体理论(BDI/博弈论/通信协议 KQML·FIPA/A2A) | 03+04 Wooldridge(理论), 02, 10, 12 | ★★★ |
| 10 | Agent 应用开发实战(客服/办公/翻译/家居) | 01, 07, 08 | ★★★ |

## 关键术语表(跨书)

| 术语 | 作者用法 | 通用含义 |
|---|---|---|
| Agent / LLM Agent | backbone LLM + tools + loop(10);自主系统(05) | 能感知-决策-执行自主系统 |
| Agentic Design Pattern | 21 个可复用模式(02) | 可复用构件 |
| ReAct | Reason+Act 循环(01/08) | 推理与行动交替 |
| Reflection / Reflexion | 自我反思(02/07/08) | 元认知循环 |
| MCP | Model Context Protocol(02/05/08/10/11/12) | 工具/资源标准协议 |
| A2A | Agent-to-Agent(02/10/12) | 跨组织 agent 协作协议 |
| RAG / GraphRAG / Dual RAG | 检索增强(01/05/08/11) | 知识注入 |
| Orchestrator | 编排器(02/11/12) | 调度多个 agent |
| CWD | Coordinator-Worker-Delegate(07) | 协调-工作者-委派模式 |
| Context Engineering | 上下文工程(11 专书) | 结构化管理 LLM 信息 |
| BDI | Belief-Desire-Intention(03+04) | 信念-愿望-意图架构 |
| Contract Net | 合同网协议(03+04) | 任务分配机制 |
| workflow vs autonomous | 确定性图 vs 涌现编排(12) | 编排谱系两端 |

## 作者共识 vs 分歧

| 议题 | 共识 | 分歧 |
|---|---|---|
| 何时用多 agent | 任务复杂/可分解时(12: empirical 对比) | 简单任务单模型更优(Dibia 实证)vs 多 agent 万能(部分框架厂商) |
| 编排方式 | workflow 确定性 vs autonomous 涌现是谱系(12) | 各自强调一端(05 工程化 vs 10 教育) |
| 记忆实现 | 短期+长期+向量是标配 | 压缩策略(MemGPT 08)vs 白板/上下文窗口(05) |
| 上下文 vs 提示 | Context Engineering 超越 Prompt Engineering(11) | 传统 prompt 派 vs context 派 |

## evidence_hierarchy(AI Agent 领域)

```
1. primary_research(论文/基准: trajectory evaluation, Direct-Model vs Multi-Agent 实证)
2. production_postmortem(生产系统复盘/失败模式)
3. practitioner_consensus(3+ 本独立书共识)
4. textbook_authority(Wooldridge 2009 / Mahmoud 2020)
5. popular_article(博客/在线教程)
```

## 蒸馏边界

✅ 适合蒸馏(主体语料):
- 02 Gulli(21 模式,高权重)
- 05 Albada(工程生命周期,高权重)
- 07 比斯瓦斯(CWD/信任,高权重)
- 08 尹浩(代码实战,高权重)
- 10 Fajardo(从零实现,中权重)
- 11 Rothman(上下文工程,高权重)
- 12 Dibia(模式谱系/UX/评估,高权重)
- 03+04 Wooldridge(理论锚点,中权重)
- 01 凌峰(中文实战,中权重)

⚠️ 仅作理论锚点(不为主体语料):
- 06 Mahmoud(经典控制论 consensus/Laplacian,与 LLM agent 无交集)

❌ 不适合蒸馏:
- 06 的数学证明/动力学建模部分(对 LLM agent 工程价值有限)

## 用户确认

- [ ] 骨架已确认(签名: ______)

## 附:扫描文件索引

- scan_books_1-4.md(凌峰/Gulli/Wooldridge)
- scan_books_5-8.md(Albada/Mahmoud/比斯瓦斯/尹浩)
- scan_books_10-12.md(Fajardo/Rothman/Dibia)
