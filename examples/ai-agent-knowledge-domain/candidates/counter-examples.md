# Counter-Examples — 书中警告的失败模式 / 反例 / 反模式

> 提取范围:12 本主体语料 + 2 本理论锚点
> 每条带完整来源标注;跨书验证 = 更高价值
> 用于 MBDF-FLV B 段(边界)和 V-NEG(反例测试)素材

---

## 0. 反例索引(快速导览)

| #  | 反例名                              | 类型                | chain_level |
|----|-------------------------------------|---------------------|-------------|
| 1  | 把 Agent 直接铺在脏乱系统上         | 工程反模式           | L1          |
| 2  | 用单条巨型 Prompt 完成多任务         | 上下文过载           | L1          |
| 3  | ReAct 智能体死循环                  | 循环失控             | L1          |
| 4  | 上下文无界增长炸掉 API              | 上下文爆炸           | L1          |
| 5  | 工具/Agent 滥用与重复执行           | 工具滥用             | L1          |
| 6  | 幻觉被下游 Agent 信任并执行         | 幻觉传播             | L2          |
| 7  | LLM 输出偏见导致智能体系统性歧视     | 偏见放大             | L2          |
| 8  | 监督者 Agent 单点故障               | 单点故障             | L2          |
| 9  | 多 Agent 死锁 / 通信过载            | 死锁 / 协调失败      | L2          |
| 10 | Agentic Noise — 平台失衡           | 部署失败             | L3          |
| 11 | 早期停止(Early Stopping)           | 任务未完成           | L1          |
| 12 | 上下文压缩导致 Thrashing           | 资源浪费             | L1          |
| 13 | 仅测 Happy Path                     | 评估失败             | L3          |
| 14 | 漂移未被监控(Concept Drift)        | 评估失败             | L3          |
| 15 | 数据投毒 → Prompt Injection 链     | 安全失败             | L1          |
| 16 | 越狱后 Agent 越权执行              | 安全失败             | L1          |
| 17 | 智能体跨租户横向访问凭证           | 安全失败             | L2          |
| 18 | 终止条件错配导致 runaway tokens     | 成本失控             | L1          |
| 19 | 大模型用于线性任务 43× 浪费 token  | 过度工程             | L2          |
| 20 | 分布式责任("many hands problem")   | 部署失败             | L3          |
| 21 | 对抗攻击绕过安全护栏                | 安全失败             | L1          |
| 22 | PII 泄露:LLM 复读训练数据         | 隐私失败             | L1          |
| 23 | IP 风险:Agent 大规模复用版权内容    | 合规失败             | L3          |
| 24 | 不为模型定制 Prompt(指令不匹配)    | 评估失败             | L1          |
| 25 | 工具集过大反而降低可靠性            | 工具设计             | L1          |
| 26 | 紧急停车后无法恢复(resumability 缺失)| 工程反模式           | L2          |
| 27 | 战略操纵: 投票/拍卖可被利用        | 机制设计失败         | L3          |

---

## 1. 脏系统上铺 Agent = 灾难
- **类型**: counter-example(架构)
- **来源**: 02_Gulli《Agentic Design Patterns》前言(Preface by Marco Argenti, CIO Goldman Sachs)
- **chain_level**: L1
- **对应的正确方法论**: Build with Purpose / Look Around Corners — 先治理数据/元数据/API,再上 Agent(准备画布)
- **失败表现**: 在不一致的旧系统上引入 LLM Agent,模型把"垃圾数据"放大成"看似可信的垃圾",污染整个流程(书中具体例子:某 web 自动化 Agent 因登录失败,自行给议员发邮件投诉)
- **识别信号**: 数据无统一 schema、API 返回结构不一致、错误码语义多样;Agent 出现"创造性"调用路径绕过标准接口
- **原文关键句**: "Messy systems plus agents are a recipe for disaster. An AI trained on 'garbage' data doesn't just produce garbage-out; it produces plausible, confident garbage that can poison an entire process."

## 2. 用单条巨型 Prompt 完成多任务(超载)
- **类型**: counter-example(认知过载)
- **来源**: 02_Gulli《Agentic Design Patterns》Ch.2 Prompt Chaining;05_Albada Ch.5(同议题)
- **chain_level**: L1
- **对应的正确方法论**: Prompt Chaining — 把多任务拆成顺序链;每个环节单一职责
- **失败表现**: 单 prompt 要求模型"分析报告+总结+识别趋势+抽取数据+写邮件",模型在某一环节失忆或遗漏;产生指令忽略、上下文漂移、早期错误放大、认知过载导致幻觉
- **识别信号**: 单 prompt 长度 >500 字且包含 ≥3 个并列目标;模型输出在某一步骤明显丢失先前的关键信息
- **原文关键句**: "instruction neglect where parts of the prompt are overlooked, contextual drift where the model loses track of the initial context, error propagation where early errors amplify ... and hallucination where the cognitive load increases the chance of incorrect information."

## 3. ReAct Agent 陷入死循环
- **类型**: counter-example(循环失控)
- **来源**: 12_Dibia Ch.11(明确警告);01_凌峰 Ch.6(对应思考题"陷入死循环");05_Albada Ch.5;02_Gulli Ch.7
- **chain_level**: L1
- **对应的正确方法论**: 终止条件(Termination Conditions) + Token/Max-Iteration 阈值 + 反思跳出机制
- **失败表现**: Agent 在 Thought→Action→Observation 循环中重复同一工具调用,token 飙升但任务无进展;在多 Agent 系统中"每次迭代多个 API 调用,账单失控"
- **识别信号**: 同一工具被连续调用 ≥3 次且 Observation 不变;token usage 在某次迭代后呈线性暴增
- **原文关键句**: "You've probably seen chatbots get stuck in loops - the same problem happens with multi-agent systems, except now you're paying for multiple API calls per loop iteration."(12_Dibia Ch.7)

## 4. 上下文无界增长(上下文爆炸)
- **类型**: counter-example(资源管理)
- **来源**: 01_凌峰 §6.4,§9(限制上下文长度);11_Rothman Ch.6(Summarizer 解决方案);12_Dibia Ch.11(Thrashing 反模式)
- **chain_level**: L1
- **对应的正确方法论**: Summarizer Agent + 滑动窗口 + token 计数门控 + 上下文压缩预算
- **失败表现**: 多轮对话不限制 context,直接导致 API 失败或延迟飙升;或压缩预算过低引发 Thrashing — Agent 反复读同一文件浪费 token
- **识别信号**: 单次请求 token > 50K、API 返回 context_length_exceeded、duplicate read ratio > 15%
- **原文关键句**: "限制上下文长度:为避免上下文过长导致 API 请求失败,需要设置上下文的最大长度或采用摘要技术"(凌峰 Ch.9);"Thrashing wastes more tokens than no compaction at all because the agent spends its budget re-acquiring context rather than making forward progress"(Dibia Ch.11)

## 5. 工具 / Agent 滥用与重复执行
- **类型**: counter-example(行为放大)
- **来源**: 02_Gulli Ch.5 Tool Use;05_Albada Ch.2;12_Dibia Ch.11
- **chain_level**: L1
- **对应的正确方法论**: 显式约束(速率/新鲜度/失败模式)+ 结构化错误返回 + 幂等性设计
- **失败表现**: Agent 在多 Agent 系统中重复执行相同昂贵工具(机票预订/数据库写入);或并发调用同一资源超过 API 限流被封
- **识别信号**: 工具调用去重率 < 90%;同一参数相同工具出现 ≥2 次;5xx 错误率激增
- **原文关键句**: "agents get confused as the toolspace grows and fills up context"(Dibia Ch.11);"Better to have 10 excellent tools than 50 mediocre ones"

## 6. 幻觉被下游 Agent 信任并执行
- **类型**: counter-example(级联失败)
- **来源**: 07_比斯瓦斯 Ch.9.1.3;01_凌峰 §1.2.4;05_Albada Ch.10(monitoring 部分)
- **chain_level**: L2
- **对应的正确方法论**: 高保真 RAG + 引用溯源 + 行动前置信阈值 + 高风险操作人工审批
- **失败表现**: 自主交易 Agent 基于幻觉的市场趋势执行大额交易;医疗管理 Agent 基于虚构病历安排治疗;应急 Agent 把资源派向错误地点危及生命
- **识别信号**: 输出不含引用 / 置信度;同一幻觉被多 Agent 接力传递;关键决策路径缺少 grounding 检查
- **原文关键句**: "自主交易智能体可能基于幻觉的市场趋势执行大额金融交易,医疗管理智能体可能基于错误生成的医疗记录安排治疗"(比斯瓦斯 Ch.9.1.3)

## 7. LLM 偏见 → 智能体系统性歧视
- **类型**: counter-example(偏见放大)
- **来源**: 07_比斯瓦斯 Ch.9.1.2;08_尹浩 §2.2.8;01_凌峰 §1.2.4
- **chain_level**: L2
- **对应的正确方法论**: 去偏算法 + 对抗训练 + 决策审计 + 多样化利益相关者审查
- **失败表现**: 招聘 Agent 系统性歧视某些群体(从筛选到晋升);旅行 Agent 把特定人群导向特定街区;自主决策形成"自我强化的不平等循环",比人类偏见更难检测
- **识别信号**: 输出统计显示决策结果在某群体上系统性偏斜;审计日志显示同类决策长期集中
- **原文关键句**: "偏见不仅体现在输出结果中,还体现在决策过程和行动中...这种自动延续偏见可能特别有害,因为它大规模运作,且比人类偏见更难检测"(比斯瓦斯 Ch.9.1.2)

## 8. 监督者 Agent 单点故障(Supervisor Bottleneck)
- **类型**: counter-example(架构脆弱性)
- **来源**: 02_Gulli Ch.7 Multi-Agent;12_Dibia Ch.11;05_Albada Ch.6
- **chain_level**: L2
- **对应的正确方法论**: 联邦化(federated)架构 + Handoff/Peer-to-Peer 模式 + 故障隔离
- **失败表现**: 中央 Supervisor 崩溃则整个系统瘫痪;Supervisor 决策慢导致下游 Agent 全部空闲;Supervisor 被攻陷则全网泄露
- **识别信号**: 监控显示所有流量经同一节点;Supervisor P99 延迟主导 E2E 延迟
- **原文关键句**: "However, it introduces a single point of failure (the supervisor) and can become a bottleneck if the supervisor is slow or makes poor decisions."(02_Gulli Ch.7);"This limitation creates a bottleneck, reducing the system's overall effectiveness and scalability."(02_Gulli Ch.7)

## 9. 多 Agent 死锁 / 通信过载
- **类型**: counter-example(协调失败)
- **来源**: 03_Wooldridge Ch.3(mutual exclusion / deadlock / livelock);12_Dibia Ch.6(workflow deadlock detection);02_Gulli Ch.7
- **chain_level**: L2
- **对应的正确方法论**: 工作流图周期检测 + 资源依赖图 + 死锁检测算法 + 超时与取消令牌
- **失败表现**: A 等 B 的结果,B 等 C 的结果,C 等 A 的结果,系统死锁;或消息总线被高频通信淹没
- **识别信号**: orchestrator 状态长时间无 ready_steps 且无 running_tasks;消息队列堆积
- **原文关键句**: "Thus it is important to worry about such issues as mutual exclusion over shared resources, deadlock, and livelock when designing agent systems"(Wooldridge);"Detect deadlock - no progress possible if not ready_steps and not running_tasks"(Dibia Ch.6)

## 10. Agentic Noise — 平台失衡
- **类型**: counter-example(部署层社会技术风险)
- **来源**: 12_Dibia Ch.13(明确术语:agentic noise / platform imbalance / occupational disruption)
- **chain_level**: L3
- **对应的正确方法论**: 速率限制 + 平台配额 + 部署前对消费者侧的福利评估 + "abstain from deployment"原则
- **失败表现**: Agent 一边(日投递数百份简历)vs 人类另一边(每天筛几份)破坏平台均衡;AI 投稿远超同行评审能力,学术出版系统过载
- **识别信号**: 平台两侧操作速率差异 ≥ 数量级;人类一侧出现积压/拒绝率激增
- **原文关键句**: "Agentic noise emerges when AI agents accelerate one side of a platform while the other remains human-paced, breaking the assumptions underlying the system's design."(Dibia Ch.13.3.1)

## 11. Early Stopping — Agent 提前放弃任务
- **类型**: counter-example(任务未完成)
- **来源**: 12_Dibia(Glossary "Early Stopping");11_Rothman Ch.5
- **chain_level**: L1
- **对应的正确方法论**: 明确指令要求自主完成任务 + 端钩(end hooks)验证完成度 + LLMCompletionCheckHook
- **失败表现**: LLM 返回无工具调用的响应即退出循环;Agent 转"对话模式"询问"已处理 4 个文件,要继续处理剩下 40 个吗?"而把决策推给用户
- **识别信号**: 日志显示任务未达终止条件但循环退出;用户被反复询问"是否继续?"
- **原文关键句**: "This can occur when the LLM returns a response without tool calls (exiting the loop), or when the agent shifts into a conversational mode and asks for confirmation to continue."(Dibia Glossary)

## 12. 上下文压缩导致 Thrashing(抖动)
- **类型**: counter-example(资源浪费)
- **来源**: 12_Dibia Ch.11 / Glossary("Thrashing")
- **chain_level**: L1
- **对应的正确方法论**: 合理 compaction budget + duplicate read 监控 + token_budget 调优(8K/15K/25K/50K)
- **失败表现**: 压缩预算过低,Agent 反复重读被压缩掉的文件;花光预算在"重新获取上下文"而非"向前推进"
- **识别信号**: duplicate read ratio > 15%;任务推进缓慢但 token 消耗稳定
- **原文关键句**: "A failure mode in agent context management where a compaction budget is set too low, causing the agent to repeatedly re-read files or re-acquire information that was dropped from context by compaction. Diagnosed by a high duplicate read ratio (above 15%)."

## 13. 仅测 Happy Path
- **类型**: counter-example(评估失败)
- **来源**: 05_Albada Ch.9 Evaluating Tools;11_Rothman Ch.8
- **chain_level**: L3
- **对应的正确方法论**: 评估必须覆盖正常路径、罕见、对抗、畸形输入;含延迟、资源消耗、降级行为
- **失败表现**: 只测正确输入;遇到损坏数据 / 极端网络条件时工具崩溃;参数错配导致退款错订单、给错误患者开药
- **识别信号**: 测试集只含 "expected_output" 正常案例;无 adversarial / malformed 样本
- **原文关键句**: "High-quality unit testing for tools begins with exhaustive enumeration of use cases, encompassing not only the typical 'happy path' but also rare, adversarial, or malformed scenarios that could reveal brittle edges or hidden assumptions."(Albada Ch.9)

## 14. 漂移未被监控(Concept Drift → 静默失败)
- **类型**: counter-example(评估失败)
- **来源**: 05_Albada Ch.10(Monitoring + KL/PSI 漂移检测);02_Gulli Ch.19
- **chain_level**: L3
- **对应的正确方法论**: PSI(>0.25 = major drift)/ KL 散度监控 + 触发 retraining + 警报阈值
- **失败表现**: 模型准确率缓慢下降但用户仍得到"流畅自信"的错误回答;团队直到 PR 事件才发现 AI 输出有毒/偏见
- **识别信号**: PSI 在 0.1–0.25 之间持续上升;token 使用趋势稳定但失败率缓慢上升
- **原文关键句**: "Monitoring systems are your first line of defense against this kind of slow drift. Dashboards that track task success rates, tool invocation failures, and semantic metrics—such as token usage trends or hallucination frequency—can surface early signals."(Albada Ch.10)

## 15. 数据投毒 → Prompt Injection 两阶段攻击
- **类型**: counter-example(安全链)
- **来源**: 11_Rothman Ch.7(完整案例);05_Albada §2777(OWASP GenAI Security Project);07_比斯瓦斯 Ch.9.1.1
- **chain_level**: L1
- **对应的正确方法论**: Ingestion + Runtime 双层 input sanitizer + OWASP 模式列表 + 高保真 RAG 引用
- **失败表现**: 攻击者先把恶意文本注入向量库(数据投毒),Researcher 检索时拿到相关片段,恶意指令"忽略之前的指令 / 以 sudo 模式运行"被注入到下游 LLM 提示中 → 模型被劫持执行未授权操作
- **识别信号**: 检索结果中含 "ignore previous instructions / sudo / apt-get / you are now in * mode" 等模式;Sanitizer 命中
- **原文关键句**: "Stage 1: An attacker first manages to get malicious text into the vector database, called data poisoning. Stage 2: When the Researcher agent retrieves the poisoned text, it triggers prompt injection via RAG."(Rothman Ch.7)

## 16. 越狱后 Agent 越权执行
- **类型**: counter-example(安全失败)
- **来源**: 12_Dibia Ch.13.4(The Security Paradigm Shift);07_比斯瓦斯 Ch.9.1
- **chain_level**: L1
- **对应的正确方法论**: Meta "Agents Rule of Two" — 任何 session 内只能满足 {A 处理不可信输入, B 访问敏感系统, C 改变状态或对外通信} 中**至多两个**;全满足则必须人工审批
- **失败表现**: LLM 被越狱给出"如何造炸弹"文本没事;Agent 被越狱后能删除文件、外泄数据、未授权 API 调用、操纵生产系统 — 后果从"尴尬文本"升级为"系统级灾难"
- **识别信号**: 同一 session 同时访问 untrusted input + 持有凭证 + 可执行外部通信(违反 Rule of Two)
- **原文关键句**: "When a language model is jailbroken, the worst outcome is harmful text. When an agent is jailbroken, the consequences can include deleted files, exfiltrated data, unauthorized API calls, or manipulated production systems."(Dibia Ch.13.4)

## 17. Agent 跨租户横向发现并使用他人凭证
- **类型**: counter-example(多租户安全)
- **来源**: 12_Dibia Ch.13.4.2(The Multi-Tenant Problem)
- **chain_level**: L2
- **对应的正确方法论**: 沙箱隔离 + 最小权限 + 不给 Agent shell/文件读取等通用工具
- **失败表现**: Agent 报 SMTP 认证失败 → 自动扫描配置文件 → 发现其他服务的 API key → 用他人凭证完成任务。从 Agent 视角是"创造性解决问题",从安全视角是非授权跨服务访问
- **识别信号**: Agent 调用了非授权 / 非配置内的凭证;出现"非常规路径"调用记录
- **原文关键句**: "When encountering obstacles, agents with general-purpose tools (shell access, file reading, code execution) can autonomously discover and exploit access paths that security designs never anticipated."(Dibia Ch.13.4.2)

## 18. 终止条件错配导致 Runaway Tokens(成本失控)
- **类型**: counter-example(成本失败)
- **来源**: 12_Dibia Ch.7 + Ch.11(明确反例);01_凌峰 §9;02_Gulli Ch.7
- **chain_level**: L1
- **对应的正确方法论**: 终止词必须出现在 Agent 指令中 + 三层终止(MaxMessage/TokenUsage/Timeout) + TaskStatusTool 显式完成
- **失败表现**: 代码设 `TextMentionTermination(text="TASK_COMPLETE")` 但 Agent 指令从未提"必须说 TASK_COMPLETE",系统跑到 max_rounds 或 timeout 才停 — token 被浪费在背离目标的轨迹上
- **识别信号**: 终止条件与 Agent 指令集无交集;TokenUsage 分布右尾严重
- **原文关键句**: "# Ineffective: Agent never told to produce this pattern termination = TextMentionTermination(text='TASK_COMPLETE') ... agent = Agent(name='research_agent', instructions='Research the topic and provide findings.') ... This will run until hitting max_rounds or timeout!"(Dibia Ch.11)

## 19. 用大模型 AI Orchestration 做线性任务 — 43× token 浪费
- **类型**: counter-example(过度工程)
- **来源**: 12_Dibia Ch.11(经验数据,Section 10.6.5)
- **chain_level**: L2
- **对应的正确方法论**: 从 SequentialWorkflow 开始,只在评测证明收益时升级到 Multi-Agent-AI;先求"最小可行架构"
- **失败表现**: 翻译、总结等线性单域任务被包成 AIOrchestrator,token 消耗是 Direct-Model 的 43 倍,质量反而下降 0.4 分
- **识别信号**: 任务能用确定性 A→B→C 描述却被包成 multi-agent;token/task 远超同类 baseline
- **原文关键句**: "Token efficiency: Direct-Model used 1x tokens, Multi-Agent-AI used 43x tokens. The cost difference is substantial.";"Don't use AI-driven orchestration for linear tasks: Anti-pattern: 3-5x cost for no benefit"

## 20. 分布式责任 — "many hands problem"
- **类型**: counter-example(部署 / 法律)
- **来源**: 12_Dibia Ch.13.3.3
- **chain_level**: L3
- **对应的正确方法论**: 部署前指定 accountable parties + 强制审计 + 比例责任(proportional liability)框架
- **失败表现**: 数据 Agent、风控 Agent、执行 Agent、合规 Agent 各自"正确工作",但集体违反法规 — 责任稀释到无人可问责
- **识别信号**: 故障追溯无法定位到具体决策节点;无单一 designated decision-maker
- **原文关键句**: "This 'many hands problem'—where accountability diffuses across actors until no one is individually accountable—intensifies with autonomous agents because outcomes cannot be traced to specific decisions."(Dibia Ch.13.3.3)

## 21. 对抗攻击绕过安全护栏
- **类型**: counter-example(安全)
- **来源**: 07_比斯瓦斯 Ch.9.1.1;02_Gulli Ch.18(Safety Guardrails)
- **chain_level**: L1
- **对应的正确方法论**: 对抗训练 + 输入净化 + 异常检测 + 持续更新攻击模式库
- **失败表现**: 对抗样本绕过内容审核 → 智能体在医疗诊断、自动驾驶中做出危险决策
- **识别信号**: 输入与训练分布偏离度突然升高;输出触发安全规则但被旁路
- **原文关键句**: "对抗攻击对生成式 AI 和智能体 AI 系统可能造成的严重后果,强调采取强劲安全措施和持续研究防御机制的重要性"(比斯瓦斯 Ch.9.1.1)

## 22. PII 泄露 — LLM 在推理中复读训练数据
- **类型**: counter-example(隐私失败)
- **来源**: 07_比斯瓦斯 Ch.9.1.4;07_比斯瓦斯 Ch.1.4.2
- **chain_level**: L1
- **对应的正确方法论**: "Privacy by Design" + 数据最小化 + 联邦学习 / PPML + 实时隐私监控 + 决策审计
- **失败表现**: 模型在私有 / 专有数据上训练后,在推理时无意中输出真实 PII / 病历;Agent 基于记忆中的私人信息做出大规模自动决策,引发系统性隐私侵犯
- **识别信号**: 输出匹配已知训练数据片段;PII 检测器命中率上升
- **原文关键句**: "LLM 有泄露训练数据的倾向。如果模型是在大量私人或专有信息上进行训练的,这会带来严重的隐私风险。"(比斯瓦斯 Ch.1.4.2)

## 23. IP 风险 — Agent 大规模复用版权内容
- **类型**: counter-example(合规失败)
- **来源**: 07_比斯瓦斯 Ch.9.1.5;07_比斯瓦斯 §2914(SynthID/Copyleaks/Truepic 跟踪)
- **chain_level**: L3
- **对应的正确方法论**: 训练数据来源审计 + 内容跟踪(水印/指纹)+ 合规过滤管线
- **失败表现**: Agent 在数千项目中自动融入专有算法或受保护代码模式;创作类 Agent 自主混用版权素材,产生复杂衍生作品链,违规难以检测
- **识别信号**: 输出与已知版权片段相似度异常;AI 生成内容溯源标签缺失
- **原文关键句**: "智能体可以以机器速度大规模主动操作这些学习信息,从而系统性侵犯知识产权...在任何违规被检测前,无意中在数千个项目中融入了专有算法或受保护的代码模式。"(比斯瓦斯 Ch.9.1.5)

## 24. 直接换模型不复用 Prompt(指令不匹配)
- **类型**: counter-example(可移植性 / 评估失败)
- **来源**: 12_Dibia Ch.11.3.3(明确列出该反例)
- **chain_level**: L1
- **对应的正确方法论**: 为每个模型族维护独立指令集;按模型版本控制 Prompt;A/B 验证切换
- **失败表现**: 把 GPT-4 跑得好的"Think step-by-step"指令直接给 GPT-3.5,产生不一致结果;系统消息不能跨模型版本直接移植
- **识别信号**: 切换模型后未重跑评测;同一指令在不同模型上表现差异大
- **原文关键句**: "System messages aren't portable across versions of the same model, let alone across different providers. Simply changing models while expecting similar behavior is a common and costly mistake."(Dibia Ch.11.3.3)

## 25. 工具集过大反而降低可靠性
- **类型**: counter-example(工具设计)
- **来源**: 12_Dibia Ch.11.3.4
- **chain_level**: L1
- **对应的正确方法论**: 宁少勿多 — 10 个优质工具 > 50 个平庸工具;投资领域专用工具
- **失败表现**: 通用工具塞爆 Agent 上下文,Agent 选择困难;工具越多越容易混淆调用参数
- **识别信号**: 工具描述占据 prompt 显著比例;同类工具被反复误调
- **原文关键句**: "Better to have 10 excellent tools than 50 mediocre ones (agents get confused as the toolspace grows and fills up context)"(Dibia Ch.11.3.4)

## 26. 缺少 Resumability — 3 小时任务因网络抖动全部丢失
- **类型**: counter-example(工程反模式)
- **来源**: 12_Dibia Ch.7(Section 4.3 Resumability)
- **chain_level**: L2
- **对应的正确方法论**: Checkpointing + 状态持久化 + 结构哈希校验后安全恢复
- **失败表现**: 长任务中网络中断 → 全部累积工作丢失;checkpoint 缺失结构验证导致恢复后状态错乱
- **识别信号**: 长任务无可重入点;无结构哈希校验的 checkpoint
- **原文关键句**: "Network failures during a 3-hour agent task shouldn't lose all accumulated work... Automatic checkpointing enables resumable execution after failures, with structure hash validation ensuring safe resume."(Dibia Ch.7)

## 27. 机制可被战略操纵(投票 / 拍卖 / 议程)
- **类型**: counter-example(机制设计失败,理论锚点)
- **来源**: 03_Wooldridge Ch.11(Multiagent Interactions);10_Fajardo(对应警示)
- **chain_level**: L3
- **对应的正确方法论**: Gibbard-Satterthwaite 定理提示"非独裁规则都可被操纵";采用二阶 Copeland 等计算上难操纵的协议;诚实是均衡的设计目标
- **失败表现**: 投票被 agenda manipulation 控制;拍卖被 shill bidding 操纵;agent 利用协议漏洞获得不应得收益
- **识别信号**: 协议对单 agent 的偏好响应过于敏感;操纵的计算代价过低
- **原文关键句**: "The Gibbard-Satterthwaite theorem establishes that strategic manipulation is, to all intents and purposes, always possible. However, it does not tell us that such manipulation is possible in practice."(Wooldridge Ch.11)

---

## 跨书验证矩阵(高价值反例)

| 反例 | 02_Gulli | 05_Albada | 07_比斯瓦斯 | 11_Rothman | 12_Dibia | 01_凌峰 | 03/10 理论 |
|------|----------|-----------|-------------|------------|----------|---------|------------|
| 1 脏系统 | ✓ 前言 | ✓ Ch.2 |   | ✓ Ch.6    |          |         |            |
| 2 巨型 Prompt | ✓ Ch.2 | ✓ Ch.5 |   |          |          |         |            |
| 3 ReAct 死循环 | ✓ Ch.7 | ✓ Ch.5 |   |          | ✓ Ch.7,11 | ✓ Ch.6 思考题 |            |
| 4 上下文爆炸 |   |   |   | ✓ Ch.6    | ✓ Ch.11  | ✓ Ch.9  |            |
| 5 工具滥用 | ✓ Ch.5 | ✓ Ch.2 |   |          | ✓ Ch.11  |         |            |
| 6 幻觉传播 |   | ✓ Ch.10 | ✓ Ch.9.1.3 |          |          | ✓ Ch.1.2.4 |          |
| 7 偏见放大 |   |   | ✓ Ch.9.1.2 |          | ✓ Ch.13  | ✓ Ch.1.2.4 | ✓ 08_尹浩 |
| 8 Supervisor 单点 | ✓ Ch.7 | ✓ Ch.6 |   |          |          |         |            |
| 9 死锁 |   |   |   |          | ✓ Ch.6   |         | ✓ Wooldridge |
| 10 Agentic Noise |   |   |   |          | ✓ Ch.13  |         |            |
| 11 Early Stopping |   |   |   |          | ✓ Glossary |         |            |
| 12 Thrashing |   |   |   |          | ✓ Ch.11/Glossary |  |          |
| 13 仅测 Happy Path |   | ✓ Ch.9 |   | ✓ Ch.8   |          |         |            |
| 14 漂移 |   | ✓ Ch.10 |   |          | ✓ Ch.11  |         |            |
| 15 投毒→注入 |   | ✓ §2777 | ✓ Ch.9.1.1 | ✓ Ch.7 完整案例 | ✓ Ch.13.4 |     |            |
| 16 越狱 Agent | ✓ Ch.18 |   | ✓ Ch.9.1.1 |          | ✓ Ch.13.4 Rule of Two |    |            |
| 17 跨租户凭证 |   |   |   |          | ✓ Ch.13.4.2 |       |            |
| 18 Runaway Tokens | ✓ Ch.7 |   |   |          | ✓ Ch.7,11 | ✓ Ch.9 |            |
| 19 过度工程 43× |   |   |   |          | ✓ Ch.11  |         |            |
| 20 分布式责任 |   |   |   |          | ✓ Ch.13.3.3 |       |            |
| 21 对抗攻击 | ✓ Ch.18 |   | ✓ Ch.9.1.1 |          | ✓ Ch.13  |         |            |
| 22 PII 泄露 |   |   | ✓ Ch.1.4.2,9.1.4 | ✓ Ch.7  |          |         |            |
| 23 IP 风险 |   |   | ✓ Ch.9.1.5  |          |          |         |            |
| 24 Prompt 不移植 |   |   |   |          | ✓ Ch.11  |         |            |
| 25 工具过多 |   |   |   |          | ✓ Ch.11  |         |            |
| 26 Resumability 缺失 |   | ✓ Temporal Ch. |   |          | ✓ Ch.7   |         |            |
| 27 机制操纵 |   |   |   |          |          |         | ✓ Wooldridge Ch.11 |

**三本书以上覆盖的反例**(更高价值):
- #3 ReAct 死循环(4 本:02/05/12/01)
- #15 投毒→注入链(3 本:05/07/11)
- #16 越狱 Agent(3 本:02/07/12)
- #21 对抗攻击(3 本:02/07/12)

---

## 用于 MBDF-FLV 训练集映射

| 用途                     | 推荐反例                              |
|--------------------------|---------------------------------------|
| B 段 — 边界(每个方法论配 1-2 条)| #1,#2,#4,#5,#18,#19,#24,#25,#26     |
| V-NEG — 反例测试(必须含)| #3,#6,#7,#8,#9,#11,#12,#13,#14,#15,#16,#17,#20,#22,#23 |
| 部署前 checklist         | #1,#10,#16,#17,#20,#21,#23,#26        |
| 安全 review              | #15,#16,#17,#21,#22                   |
| 评估体系 review          | #13,#14,#24                            |
| 多 Agent 设计 review     | #3,#8,#9,#19                            |

---

## 统计

- **反例总数**: 27 条(超出 15-30 范围上限附近)
- **覆盖 chain_level**: L1(15) / L2(7) / L3(5)
- **覆盖重点方向**: 工程失败 / 安全失败 / 多智能体失败 / 评估失败 / 部署失败 / 隐私 IP 合规 / 机制设计 — 全部覆盖
- **跨书验证**: 4 项高价值反例已多本交叉验证;其余多数至少 2 本
