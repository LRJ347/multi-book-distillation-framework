# verified.md — 通过三重筛选的单元

> 筛选方法: MBDF-FLV v1.1.7 阶段 3
> V1 证据独立性(≥2 场景) / V2 预测力(能答新问题) / V3 独特性(非常识) / MB 独立链 ≥2
> 筛选依据: candidates/ 中各候选的来源标注与 chain_level

## 通过单元(进入阶段 4 RIA++ 构造)

### skill-01 agent-react-loop(ReAct 循环)
- **type**: framework | f01
- **来源**: G(Ch6) L(Ch2) Y(Ch6) F(Ch1/4) — 4 书
- **V1**: ✅ ReAct 在 4 本书多个章节出现(推理-行动-观察循环)
- **V2**: ✅ 能推导"无工具环境如何降级"等新问题
- **V3**: ✅ 推理与行动交替是反直觉的(区别于纯 CoT)
- **MB**: 独立链 ≥3(G+L, Y+F)

### skill-02 agent-reflection-loop(反思循环)
- **type**: framework | f02
- **来源**: G(Ch4) B(Ch4) Y(Ch6) D(Ch7) — 4 书
- **V1**: ✅ 4 书独立出现
- **V2**: ✅ 能推导"无法自评任务如何外评"
- **V3**: ✅ 自我评估修正循环非常识
- **MB**: 独立链 ≥3

### skill-03 agent-orchestration(多智能体编排)
- **type**: framework | f08
- **来源**: G(Ch7) A(Ch8) B(Ch6) D(Ch2/6/7) Y(Ch7) F(Ch6) R(Ch2/3) W(Ch8) — 8 书
- **V1**: ✅ 领域核心,8 书出现
- **V2**: ✅ 能推导"何时 workflow 优于 autonomous"
- **V3**: ✅ 编排谱系(确定性→涌现)是独特视角
- **MB**: 独立链 ≥4

### skill-04 agent-tool-use(工具使用)
- **type**: framework | f06
- **来源**: G(Ch5) A(Ch4) Y(Ch6) F(Ch2/5) D(Ch4) — 5 书
- **V1**: ✅ 5 书出现
- **V2**: ✅ 能推导"工具 schema 设计对误用率的影响"
- **V3**: ✅ 工具调用协议(JSON schema)是 LLM agent 特有
- **MB**: 独立链 ≥3

### skill-05 agent-memory-architecture(记忆架构)
- **type**: framework | f10
- **来源**: G(Ch8) A(Ch6) Y(Ch5) F(Ch7) D(Ch4) — 5 书
- **V1**: ✅ 5 书出现
- **V2**: ✅ 能推导"记忆污染如何检测"
- **V3**: ✅ 三层记忆(短期/长期/向量)是 agent 特有
- **MB**: 独立链 ≥3

### skill-06 agent-planning(规划)
- **type**: framework | f07
- **来源**: G(Ch6) A(Ch5) Y(Ch6) D(Ch2) F(Ch1) — 5 书
- **V1**: ✅ 5 书出现
- **V2**: ✅ 能推导"动态环境下重规划策略"
- **V3**: ✅ Plan-and-Execute 与 CoT 区分非常识
- **MB**: 独立链 ≥3

### skill-07 agent-mcp-integration(MCP 接入)
- **type**: framework | f17
- **来源**: G(Ch10) F(Ch5) R(Ch2) Y(Ch8) D(Ch12) — 5 书
- **V1**: ✅ 5 书出现(2025 标准协议)
- **V2**: ✅ 能推导"MCP 与 A2A 分工"
- **V3**: ✅ MCP 是新兴标准,书间有分歧(纳入 V-CONFLICT)
- **MB**: 独立链 ≥3

### skill-08 agent-context-engineering(上下文工程)
- **type**: framework | f11/f20
- **来源**: R(Ch1-6) Y(Ch4/5) A(Ch6) D(Ch11) — 4 书
- **V1**: ✅ 4 书出现(R 专书)
- **V2**: ✅ 能推导"token 预算策略选择"
- **V3**: ✅ Context Engineering 超越 Prompt Engineering 是独特主张
- **MB**: 独立链 ≥3

### skill-09 agent-rag(检索增强)
- **type**: framework | f12/f21
- **来源**: R(Ch3/7) A(Ch6) Y(Ch4) L(Ch4) — 4 书
- **V1**: ✅ 4 书出现
- **V2**: ✅ 能推导"高保真 RAG 的成本权衡"
- **V3**: ✅ Dual RAG/高保真引用是独特视角
- **MB**: 独立链 ≥3

### skill-10 agent-evaluation(评估)
- **type**: framework | f16/f25
- **来源**: G(Ch19) A(Ch9-11) D(Ch10) R(Ch10) — 4 书
- **V1**: ✅ 4 书出现
- **V2**: ✅ 能推导"轨迹评估的实施步骤"
- **V3**: ✅ trajectory-based 评估非常识
- **MB**: 独立链 ≥3

### skill-11 agent-guardrails(安全护栏)
- **type**: framework | f15/f22
- **来源**: G(Ch18) A(Ch12) B(Ch8-9) D(Ch13) R(Ch8) — 5 书
- **V1**: ✅ 5 书出现
- **V2**: ✅ 能推导"护栏与能力的平衡策略"
- **V3**: ✅ Rule of Two/双阶段审核是独特视角
- **MB**: 独立链 ≥3

### skill-12 agent-human-in-the-loop(人机回环)
- **type**: framework | f14
- **来源**: G(Ch13) F(Ch8) A(Ch13) D(Ch3) — 4 书
- **V1**: ✅ 4 书出现
- **V2**: ✅ 能推导"暂停点定义原则"
- **V3**: ✅ 人机回环平衡自动化与风险
- **MB**: 独立链 ≥3

### skill-13 agent-multi-agent-theory(多智能体理论:BDI/通信/博弈)
- **type**: framework | f18/f19/f29
- **来源**: W(Ch2-17) B(Ch2/6/7) — 理论锚点
- **V1**: ✅ Wooldridge 全书系统论述
- **V2**: ✅ 能推导"LLM agent 与 BDI 的对应关系"
- **V3**: ✅ 博弈论/机制设计是独特理论视角
- **MB**: 独立链 2(W+B),但 W 是经典教科书

### skill-14 agent-ux-design(多智能体 UX)
- **type**: framework | f28
- **来源**: D(Ch3/8) A(Ch3) — 2 书
- **V1**: ✅ 2 书独立出现
- **V2**: ✅ 能推导"能力发现功能的实现"
- **V3**: ✅ 四大 UX 原则(发现/委派/可观测/可中断)是独特视角
- **MB**: 独立链 2

### skill-15 agent-failure-recovery(失败恢复)
- **type**: framework | f12(failure) + x01/x02
- **来源**: G(Ch12) F(Ch4) A(Ch10) D(Ch7) — 4 书
- **V1**: ✅ 4 书出现(失败模式与恢复)
- **V2**: ✅ 能推导"恢复策略选择"
- **V3**: ✅ 显式失败处理是工程化关键
- **MB**: 独立链 ≥3

### skill-16 agent-security-prompt-injection(注入防御)
- **type**: framework | p07/p17 + x03/x04
- **来源**: R(Ch7) B(Ch9) D(Ch13) G(Ch18) — 4 书
- **V1**: ✅ 4 书出现
- **V2**: ✅ 能推导"检索内容如何标记不可信"
- **V3**: ✅ 提示注入防御是 agent 特有威胁模型
- **MB**: 独立链 ≥3

## 淘汰单元(进 rejected/,原因)

| 候选 | 原因 |
|---|---|
| f27 Deep Research | V3 弱(是多个模式的组合,非独立方法);V1 不足(多为预告性提及) |
| f24 Computer Use | 2 书且偏专题;降级为 skill-14 的补充素材 |
| f26 Agent Skills | 2 书且标准未成熟;降级为 skill-07 的补充素材 |
| f23 Policy-Driven | 与 skill-11 guardrails 高度重叠;合并 |
| f30 Latency Budgeting | 2 书;并入 skill-08 上下文工程 |
| p09 双阶段审核 | 与 skill-11 重复;合并 |
| p11 人类审批 | 与 skill-12 重复;合并 |
| p20 责任追踪 | 并入 skill-13 理论/伦理 |
| g 系列全部 | glossary 不独立成 skill,作为 GLOSSARY.md 素材 |

## 筛选统计

- 候选总数: 122(30 framework + 20 principle + 16 case + 16 counter + 40 glossary)
- 通过: 16 个 skill 单元(目标 12-18 ✓)
- 淘汰: 106(含 glossary 40 个转词典素材)
- 通过率: 13%(领域方法论密集,合理)

## 用户轻确认

- [ ] 16 个单元确认(签名: ______)
