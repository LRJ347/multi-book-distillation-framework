# Candidates: Frameworks(决策框架/思维模型)

> 提取依据:扫描 11 本 AI Agent 主题书籍(01-12,但 06 跳过数学证明)语料,从中提取可复用的结构化方法。
> 链标注(用于来源):W=Wooldridge(03+04,理论);G=Gulli(02);A=Albada(05);B=比斯瓦斯(07);Y=尹浩(08);F=Fajardo(10);R=Rothman(11);D=Dibia(12);L=凌峰(01)
> chain_level 缩写:L0=原始/基础;L1=单书内抽象化;L2=跨 2 书出现或单书深度(满足 V1+V2);L3=多书独立命名/被生态广泛使用;L4=领域事实标准
> 独立链归属:链 1=Gulli 设计模式集(02)+其衍生(L/A/F/R/D);链 2=Wooldridge/Mahmoud 经典 MAS(03/04/06);传播链=跨书复述/衍生,无独立理论锚

---

## A. 单 Agent 设计模式(内部行为)

## f01 ReAct 循环(Reasoning + Acting)
- **类型**: framework
- **来源**: G(Ch17 Reasoning Techniques,Appendix A);Y(Ch1 Thought→Action→Observation);L(Ch2 技术框架,ReAct/Hugging Face);F(Ch1 LLM agents,Ch4)
- **chain_level**: L4(多书独立)
- **独立链归属**: 链 1(G+L),链 2(Y+F)
- **核心**: 推理(Reasoning)与行动(Acting)交替循环——思考当前状态→决定下一步动作→执行工具调用→观察结果→再思考,直到任务完成。
- **结构**: 1) Thought(推理当前状态、分解问题、反思上一步) 2) Action(选择工具+参数,函数调用 JSON) 3) Observation(工具返回结果) 4) 重复至 finish action。
- **使用条件**: 需要多步推理 + 外部工具交互的任务;可观察反馈重要;推理需可审计。
- **边界**: 简单单步任务用直接生成即可;无工具场景不适用;长链 token 消耗大。
- **原文关键句**: "ReAct operates in an interleaved manner: the agent executes an action, observes the outcome, and incorporates this observation into subsequent reasoning. This iterative loop of 'Thought, Action, Observation, Thought...' allows the agent to dynamically adapt its plan."(G Ch.17)

## f02 Reflection / Reflexion 自我反思(Producer-Critic)
- **类型**: framework
- **来源**: G(Ch4 Reflection);B(Ch4 反思与内省 三件套:元推理+自我解释+自我建模);Y(Ch6 Reflexion);D(Ch7 自主编排)
- **chain_level**: L4
- **独立链归属**: 链 1(G+B),链 2(Y+D)
- **核心**: agent 对自己的输出进行自我评估与修正的元认知循环;强力实现为 Producer-Critic 双角色,critic 用不同 system prompt 避免"认知偏置"。
- **结构**: 1) Producer 生成 v1 输出 2) Critic/自评:用预设 rubric 检查(事实/质量/合规) 3) 根据评估修正(若不达标) 4) 重复 N 次或直至 critic 通过。Gulli 强调"独立 critic agent 比 self-reflection 更客观"。
- **使用条件**: 输出质量要求高、可自评(代码/写作/推理);失败代价高。
- **边界**: 无法客观自评的任务需外部评估者;增加 N 倍延迟与 token;过度反思浪费。
- **原文关键句**: "A powerful implementation is the Producer-Critic model, where a separate agent (or prompted role) evaluates the initial output. This separation of concerns enhances objectivity and allows for more specialized, structured feedback."(G Ch.4)

## f03 Prompt Chaining 提示链
- **类型**: framework
- **来源**: G(Ch1 Prompt Chaining);L(Ch3 链式逻辑);A(Ch5 LCEL Chains);F(Ch1 Deep Research 流水线)
- **chain_level**: L3(2 书)
- **独立链归属**: 链 1(G),链 2(L+A)
- **核心**: 将复杂任务分解为多个顺序步骤,每步输出作为下一步输入,降低单步认知负荷。
- **结构**: 任务分解(线性 DAG) → 步骤 1 prompt → 输出(常指定 JSON/XML)→ 步骤 2 prompt(含上步输出)→ ... → 最终输出。每步可插入确定性逻辑(校验/分支)。
- **使用条件**: 任务可分解为有依赖关系的子任务;单步 prompt 过长;需要逐步可控的输出形态。
- **边界**: 子任务无顺序依赖时用 parallelization 更优;步骤超过 5-7 错误累积放大。
- **原文关键句**: "Prompt chaining, sometimes referred to as Pipeline pattern... advocates for a divide-and-conquer strategy. The core idea is to break down the original, daunting problem into a sequence of smaller, more manageable sub-problems."(G Ch.1)

## f04 Routing 路由
- **类型**: framework
- **来源**: G(Ch2 Routing);L(Ch3 MultiRouteChain);A(Ch5 Orchestration);D(Ch7.4 AI-Driven Orchestration);12 Ch.7 AI-Driven 是其多 agent 延伸
- **chain_level**: L4
- **独立链归属**: 链 1(G),链 2(L+A+D)
- **核心**: 根据输入分类路由到不同专用处理器/模型/子 agent;Gulli 列出四种实现(LLM-based/Embedding-based/Rule-based/ML Model-based)。
- **结构**: 输入分类 → 路由决策器(LLM/embedding similarity/规则/分类器) → 候选路由表 → 调度执行 → 兜底(unclear 路径)。Embedding-based 用语义相似度而非关键词。
- **使用条件**: 输入类型多样、各类型需不同处理;不同复杂度任务用不同模型;任务空间有清晰分支。
- **边界**: 路由数 >10 时应转为多 agent 编排;边界模糊时 LLM-as-router 易错。
- **原文关键句**: "This capacity for dynamic decision-making, which governs the flow of control to different specialized functions, tools, or sub-processes, is achieved through a mechanism known as routing."(G Ch.2)

## f05 Parallelization 并行化(Sectioning + Voting)
- **类型**: framework
- **来源**: G(Ch3 Parallelization);A(Ch5 Orchestration);D(Ch6 Fan-out/Fan-in);B(Ch7.5 并行处理)
- **chain_level**: L4
- **独立链归属**: 链 1(G+A),链 2(B+D)
- **核心**: 将无依赖的子任务并行执行,再聚合结果;聚合既可"全合"(数据并行)也可"竞合"(取最佳/投票/多视角综合)。
- **结构**: 任务切分(独立子任务) → 启动并发 worker(LCEL RunnableParallel / asyncio.gather / ready algorithm) → 同步屏障 → 结果聚合(join/voting/synthesis) → 失败重试。Dibia 区分 fan-in(AND 语义,等所有依赖完成)与 conditional routing(OR 语义,任一路径即可)。
- **使用条件**: 子任务相互独立;多 API/多文档/多视角查询;对延迟敏感。
- **边界**: 子任务有依赖时需 chaining;同步屏障引入死锁需死锁检测;并行增加 token 成本与失败面。
- **原文关键句**: "The core idea is to identify parts of the workflow that do not depend on the output of other parts and execute them in parallel. This is particularly effective when dealing with external services (like APIs or databases) that have latency."(G Ch.3)

## f06 Tool Use / Function Calling 工具使用
- **类型**: framework
- **来源**: G(Ch5 Tool Use);A(Ch4 Tools);Y(Ch6 Function Calling);F(Ch2/5 MCP Tools);D(Ch4 BaseTool + MCP Bridge)
- **chain_level**: L4(5 书)
- **独立链归属**: 链 1(G+A+F),链 2(Y),链 3(D)
- **核心**: agent 通过结构化输出(JSON schema)声明要调用的工具与参数,执行后注入结果,LLM 据此决定下一步;LLM 不直接执行,只调度。
- **结构**(Gulli 六步):1) Tool 定义(name/description/JSON Schema) 2) LLM 决定调用 3) 生成结构化 JSON 调用 4) 编排层执行 5) 工具结果回灌 6) LLM 决定 next/final。Dibia 的 MCPTool 把 MCP 工具自动桥接到 BaseTool 接口,参数/返回自动转换。
- **使用条件**: 需要访问外部数据/能力(天气/股票/DB);需要确定性计算或副作用。
- **边界**: 工具越多 schema 选择越难(需 semantic tool retrieval);小模型工具调用易错;工具失败需 fallback。
- **原文关键句**: "The Tool Use pattern, often implemented through a mechanism called Function Calling, enables an agent to interact with external APIs, databases, services, or even execute code... The LLM decides if calling one or more tools is necessary to fulfill the request."(G Ch.5)

## f07 Planning 规划(LLM-plan + HTN)
- **类型**: framework
- **来源**: G(Ch6 Planning);A(Ch5);Y(Ch6 Plan-and-Execute);D(Ch2 Pattern Taxonomy + Ch7.5 Plan-Based);F(Ch1 Planning);B(Ch5 规划算法:STRIPS/HTN/FF/LLM-plan)
- **chain_level**: L4(6 书)
- **独立链归属**: 链 1(G+A),链 2(Y+F),链 3(B+D)
- **核心**: 任务执行前先制定步骤计划(plan),再逐步执行;plan 可动态调整/replan。Biswas 比较了 STRIPS/A*/GraphPlan/MCTS/FF/LLM-plan/HTN 七种,结论是 LLM-plan 与 HTN 最实用。
- **结构**: 1) 目标理解 2) 计划生成(LLM/HTN/STRIPS,JSON 步骤+依赖+工具) 3) 校验(可行性/约束) 4) 执行 5) 监控+ replan。Gulli 区分静态工作流(解决方案固定)vs dynamic planning(未知路径)。
- **使用条件**: 复杂多步任务;计划可预先制定的场景;路径不确定需 replan。
- **边界**: 环境高度动态时计划需频繁重规划;LLM 规划有"乐观/不切实际"倾向;planning 与 CoT 不同(planning 产出可执行步骤而非推理过程)。
- **原文关键句**: "The agent's core task is to autonomously chart a a course to that goal. It must first understand the initial state... and then discover the optimal sequence of actions to connect them. The plan is not known in advance; it is created in response to the request."(G Ch.6)

## f08 Chain-of-Thought / Tree-of-Thought 显式推理
- **类型**: framework
- **来源**: G(Ch17 CoT + ToT);04 W(Ch4 Practical Reasoning,means-ends + backtrack)
- **chain_level**: L3
- **独立链归属**: 链 1(G),链 2(W 理论前身)
- **核心**: CoT 强制 LLM 显式写出中间推理步骤而非直接出答案;ToT 在 CoT 基础上维护推理树,支持回溯与剪枝。
- **结构**: CoT:① "think step by step" 或 few-shot 推理示例 → ② step1→step2→...→ 最终答案。ToT:① 状态生成 → ② 候选扩展(每节点 k 个子节点) ③ 价值评估(LLM/votes) ④ beam search / BFS / DFS 选择 ⑤ 终止。
- **使用条件**: 多步推理/算术/常识/符号操作;需要可解释的中间过程;战略博弈/约束满足(ToT)。
- **边界**: 错误链条会传播;小模型不会自发做 CoT;ToT 分支因子 k 使 token 成本倍增。
- **原文关键句**: "Chain-of-Thought (CoT) prompting significantly enhances LLMs' complex reasoning abilities by mimicking a step-by-step thought process. Instead of providing a direct answer, CoT prompts guide the model to generate a sequence of intermediate reasoning steps."(G Ch.17)

## f09 Meta-Reasoning 三件套(元推理+自我解释+自我建模)
- **类型**: framework
- **来源**: B(Ch4 智能体的反思与自省能力 三件套);G(Ch4 Reflection 部分重叠)
- **chain_level**: L2(Biswas 命名)
- **独立链归属**: 链 1(B)
- **核心**: 反思不只是"评价输出",而是分三层监控:元推理(监控自身推理过程)、自我解释(解释行为给用户)、自我建模(动态更新目标/能力模型);Kinny/Georgeff "bold vs cautious" 实验给出 bold/cautious 承诺策略。
- **结构**: ① 元推理:监控资源分配、调整推理深度(基于环境变化率) ② 自我解释模块:在响应后追加"我为什么这样回答" ③ 自我建模:动态更新目标/知识库。
- **使用条件**: 智能体需长期运行并自适应;对用户透明度要求高;调试困难(需追踪"为什么")。
- **边界**: 维护自我模型带来额外延迟;可能自我欺骗(幻觉式自我解释)。
- **原文关键句**: "通过实现元推理、自我解释和自我建模,智能体获得了监控和控制推理过程的能力,能够表达其决策背后的逻辑,并根据不断变化的环境和新经验管理自己的目标与知识。"(B Ch.4)

## f10 Goal Setting and Monitoring(SMART 目标 + 反馈回路)
- **类型**: framework
- **来源**: G(Ch11 Goal Setting and Monitoring);B(Ch7.3 监控与适应);D(Ch11 Optimizing)
- **chain_level**: L2
- **独立链归属**: 链 1(G+B),链 2(D)
- **核心**: 把"目标"显式声明(SMART),并在执行中持续比照监控指标,差距触发 replan 或 escalate。
- **结构**: ① SMART 目标定义(Specific/Measurable/Achievable/Relevant/Time-bound) ② 监控代理持续采样 KPI ③ 偏差检测 ④ 反馈回路触发调整/升级。Gulli 代码示例:用 LLM-as-judge 判断目标是否达成(True/False)。
- **使用条件**: 自主执行多步任务;业务结果需可衡量;漂移检测是核心需求(金融/客服 SLA)。
- **边界**: 错误目标导致持续错误优化(Goodhart's Law);指标本身易被博弈。
- **原文关键句**: "It involves explicitly defining clear, measurable objectives for the agent to achieve. Concurrently, it establishes a monitoring mechanism that continuously tracks the agent's progress and the state of its environment against these goals."(G Ch.11)

## f11 Exception Handling and Recovery(检测→处理→恢复)
- **类型**: framework
- **来源**: G(Ch12 Exception Handling and Recovery);B(Ch9 安全管理);D(Ch13 Rule of Two);G(Ch18 Guardrails)
- **chain_level**: L3
- **独立链归属**: 链 1(G+B),链 2(D)
- **核心**: 把"出错"视为正常状态而非异常,系统性地分三阶段处理:检测、应对、恢复;可与 Reflection 组合(失败时进入反思环)。
- **结构**(Gulli 三层):① Detection(超时/API 码/格式校验/监控 agent) ② Handling(logging/retries with backoff/fallback/graceful degradation/notification) ③ Recovery(state rollback/diagnosis/self-correction/escalation)。
- **使用条件**: 任何真实部署(网络抖动、工具超时、LLM 幻觉);高可用需求。
- **边界**: 回滚需要事务/检查点支持;自动重试可能放大错误(如重复付款)。
- **原文关键句**: "This pattern focuses on developing exceptionally durable and resilient agents... It emphasizes the importance of both proactive preparation and reactive strategies to ensure continuous operation."(G Ch.12)

---

## B. 多智能体编排与拓扑

## f12 Multi-Agent Orchestration 多智能体编排(谱系)
- **类型**: framework
- **来源**: G(Ch7 Multi-Agent);A(Ch8);B(Ch6 CWD);D(Ch2 Pattern Taxonomy + Ch6 + Ch7);Y(Ch7);F(Ch6);R(Ch2/3);W(Ch8 Contract Net)
- **chain_level**: L4(8 书,领域核心)
- **独立链归属**: 链 1(G+A+D),链 2(B+Y),链 3(R),链 4(W 理论)
- **核心**: 多个 agent 协作完成复杂任务,由编排器(orchestrator)协调;从显式控制(workflow)到涌现控制(orchestrator)是一谱系。
- **结构**: 编排拓扑谱系: workflow(sequential/conditional/parallel DAG)→ supervisor → plan-based orchestration → handoff → conversation-driven(AI 选 agent)→ group chat(无中心)。Dibia 把 workflow 与 orchestrator 视为"现在的两条平行道路"——生产用 workflow,实验用 orchestrator,二者最终融合。
- **使用条件**: 任务复杂可分解;需要专业角色分工;单一 agent 上下文不足。
- **边界**: 简单任务多 agent 反而更差(Dibia 实证 Direct-Model 可更优);协调开销需权衡。
- **原文关键句**: "Multi-agent systems range from deterministic workflows to emergent autonomous orchestration."(D Ch.2)

## f13 CWD 模型(协调者-工作者-委派者)
- **类型**: framework
- **来源**: B(Ch6);Y(Ch7 多智能体)
- **chain_level**: L3(2 书)
- **独立链归属**: 链 1(B),链 2(Y)
- **核心**: Coordinator 协调,Worker 执行,Delegate 委派任务的三角协作模型,清晰角色边界 + 6 步流程。
- **结构**(六步):① 用户请求 → ② 协调者分解任务 → ③ 协调者委派给委派者 → ④ 委派者按工作者能力/负载分配 → ⑤ 工作者并行或串行执行并协作 → ⑥ 委派者汇总 → 协调者审核 → 输出。角色细分:管理者=协调者;分析师/反思者/探索者=工作者;任务解释器=委派者。
- **使用条件**: 需要安全可控的多智能体协作;任务可分派;面向客户的多步服务。
- **边界**: 简单事务 CWD 足够;不安全环境需增加验证者/领域专家角色(邹欣推荐)。
- **原文关键句**: "CWD 模型通过创建一个明确的层级结构来提升效率,其中协调者提供战略监督,委派者管理任务分配,专业工作者执行特定功能。"(B Ch.6)

## f14 Workflow Pattern(显式控制:Sequential/Conditional/Parallel Computational Graph)
- **类型**: framework
- **来源**: D(Ch6 Building Multi-Agent Workflows);A(Ch5 Chains & Graphs);G(Ch1-3 Chaining/Parallelization);B(Ch7.5 顺序/并行);F(Ch1 Deep Research 流水线)
- **chain_level**: L3
- **独立链归属**: 链 1(G+A),链 2(D+B),链 3(F)
- **核心**: 用确定性的"步骤+边"计算图显式编排 agent 工作流,可在生产期可视化、检查、checkpoint;支持 type-safe 步骤、conditional edges、parallel execution。
- **结构**(Dibia):① WorkflowMetadata + Steps(BaseStep 子类:FunctionStep/AgentStep) → ② Edges(从/to + 条件,含 EdgeCondition:always/output_based/state_based) → ③ Workflow 校验(类型匹配、循环检测) → ④ WorkflowRunner(并发上限 + 死锁检测 + 流式事件 + checkpoint)。readiness 算法自动区分 fan-in(AND)与 conditional(OR)。
- **使用条件**: 高风险/高合规工作流(金融、医疗);需要确定性、可审计、可重放;可枚举所有决策分支。
- **边界**: 不适合探索性/涌现型任务;步骤多时图维护成本上升;每步需明确输入输出 schema。
- **原文关键句**: "Workflows provide low-level control over execution flow, and steps can be any computation (mathematical operations, data transformations, API calls, or AI agents)... Workflows provide complete control over execution flow while enabling sophisticated capabilities through type safety, streaming observability, and robust error handling."(D Ch.6)

## f15 Orchestrator Loop(选择→执行→检查→终止)
- **类型**: framework
- **来源**: D(Ch7 The Orchestrator Loop);R(Ch4);G(Ch7 Multi-Agent);A(Ch5 Orchestration);Y(Ch7)
- **chain_level**: L3
- **独立链归属**: 链 1(D),链 2(R+G+A)
- **核心**: 显式循环"选 agent→执行一步→更新共享状态→检查终止条件→重复",模式无关地把各种调度策略(round-robin/AI-driven/plan-based)插拔。
- **结构**(Dibia BaseOrchestrator ABC):① _reset_for_run() 清状态 → ② 循环:选 agent(由子类决定)→ ③ agent.run_stream() 执行一步 → ④ update_shared_state() → ⑤ 检查终止(MaxMessage | TextMention | Token limit | Cost,可组合 `|` OR, `&` AND)→ ⑥ assemble OrchestrationResponse → ⑦ 错误隔离(error 不挂整个编排)。
- **使用条件**: 任何涌现型多 agent 系统;需要统一可观测(流式事件 + 总成本 + 总时长)。
- **边界**: 抽象层级高,新手难上手;终止条件设错会无限循环或过早结束。
- **原文关键句**: "The orchestrator's core logic lives in two methods that follow the same pattern we used for building agents. Each iteration: select agent → execute turn → check termination → repeat."(D Ch.7)

## f16 Round-Robin / AI-Driven / Plan-Based Orchestration 三策略
- **类型**: framework
- **来源**: D(Ch7.3/7.4/7.5);B(Ch6 RoundRobinGroupChat AutoGen)
- **chain_level**: L3
- **独立链归属**: 链 1(D),链 2(B)
- **核心**: 同一 Orchestrator Loop 框架下的三种 agent 选择策略——Round-Robin(轮询)、AI-Driven(LLM 选下一个)、Plan-Based(LLM 先生计划再评估重试)。
- **结构**:
  - Round-Robin:① 维护 agent 列表与索引 → ② 每轮选下一个 → ③ 共享状态累加 → ④ 终止
  - AI-Driven:① 把当前消息历史+可用 agent 描述喂给 LLM → ② LLM 输出 next_agent → ③ 调用 → ④ 终止。RoundRobinOrchestrator 仅替换选择方法,其他基础设施全继承
  - Plan-Based:① LLM 生成 List[PlanStep](agent assignment + description) → ② 按序执行 → ③ evaluate_step()(LLM-as-judge boolean)→ ④ 若 false:重新规划并把反思加入提示 → ⑤ 全过则输出
- **使用条件**: Round-Robin 适合辩论/固定团队/平等参与;AI-Driven 适合智能路由与上下文依赖;Plan-Based 适合多阶段流水线需全局可见。
- **边界**: Round-Robin 浪费 token;AI-Driven 增加每步决策开销;Plan-Based 计划粒度粗时纠错难。
- **原文关键句**: "AI-driven orchestration solves this by using an LLM to analyze the conversation and decide which agent should speak next... We can reuse all the infrastructure from round-robin orchestration and only change the selection method."(D Ch.7.4)

## f17 Workflow Checkpointing + 结构哈希校验
- **类型**: framework
- **来源**: D(Ch6.7);A(Ch13 Temporal Stateful Orchestration);F(Ch1 task execution workflow)
- **chain_level**: L2
- **独立链归属**: 链 1(D),链 2(A)
- **核心**: 把工作流视为"事务",每步完成后保存 checkpoint,失败时从最近 checkpoint 重放;并用结构哈希检测工作流定义变化,防止"老 checkpoint 错配新逻辑"。
- **结构**: ① WorkflowCheckpoint(step_executions + state + completed_step_ids + workflow_structure_hash) ② 完成一步即序列化(checkpoint_config.auto_save) ③ 恢复时先验证 SHA256(steps+edges+types),不一致则拒绝 ④ 跳过已 completed 步骤继续。存储后端可插拔(File/InMemory/S3/DB)。
- **使用条件**: 长时间多步任务(分钟到小时);API 限流/失败重做成本高;需审计。
- **边界**: 存储成本随步骤线性增长;非确定性步骤(LLM)难以精确重放。
- **原文关键句**: "When resuming, compare the stored hash with the current workflow's hash. Matching hashes mean safe resume; different hashes mean the structure changed and we reject the checkpoint."(D Ch.6.7)

## f18 Contract Net Protocol 合同网协议
- **类型**: framework
- **来源**: W(Ch8.2.1 Contract Net);B(Ch6 委派者);G(Ch7 Multi-Agent 协同)
- **chain_level**: L3
- **独立链归属**: 链 1(W 理论锚),链 2(B+G)
- **核心**: 任务通过"招标-投标-中标"机制分配到 agent;动态任务分配的市场机制,管理者按标选择最适合者。
- **结构**(四消息):① Task Announcement(管理者广播/定向) ② Bid(有能力工人发标) ③ Award(管理者选定) ④ Report/Inform(完工回报)。三种简化版:Directed Contract(管理者已知对象)、Request/Inform(简单信息请求)。投标决策基于"边际成本 < 预算"的理性原则(Sandholm)。
- **使用条件**: 分布式任务分配;多个候选执行者;任务可分包;工人能力异质。
- **边界**: 不适合强耦合子任务;标书评估本身可成为瓶颈;通信开销;需信任机制。
- **原文关键句**: "A node that generates a task advertises the existence of that task to other nodes in the net with a task announcement, and then acts as the manager of that task for its duration."(W Ch.8.2.1)

## f19 BDI Architecture 信念-愿望-意图 + Reconsideration
- **类型**: framework
- **来源**: W(Ch4 Practical Reasoning / BDI / PRS);B(Ch2)
- **chain_level**: L2
- **独立链归属**: 链 1(W 理论锚),链 2(B)
- **核心**: 智能体以 Belief(信念)/Desire(愿望)/Intention(意图)三元组进行实践推理;承诺策略(bold/cautious)决定动态环境中应多久重新考虑意图。
- **结构**(PRS):① 数据输入更新 Beliefs → ② 启动时 Goal 推入 Intention Stack → ③ 在 Plan Library 中找 postcondition=goal 且 context 满足的候选 Plans → ④ 用 meta-level plan 或 utility 选 → ⑤ 执行(可能推更多 sub-goal)→ ⑥ 失败则另选。Kinny/Georgeff 实验:静态环境 bold 强,动态环境 cautious 强。
- **使用条件**: 经典 agent 学术建模;需要可解释心智状态;有限资源下动态调度。
- **边界**: 计算开销大;与 LLM agent 直接对接需要桥接;逻辑符号推理成本高。
- **原文关键句**: "If the rate of world change is low... then bold agents do well compared with cautious ones... If the rate of world change is high, then cautious agents tend to outperform bold agents."(W Ch.4.3)

## f20 Joint Persistent Goals + Joint Intentions(团队一致性)
- **类型**: framework
- **来源**: W(Ch8.6.2 Joint Intentions / Steam / ARCHON);B(Ch6 知识共享与协商冲突)
- **chain_level**: L2
- **独立链归属**: 链 1(W),链 2(B)
- **核心**: 团队合作需要"集体承诺"——所有成员共享一个目标,并在某个成员发现目标不可达/已达成/动机消失时,都有义务把状态变为"共同信念",再相应调整行为。
- **结构**(JPG 四阶段):① Recognition(识别合作潜力)→ ② Team formation(集体协商加入)→ ③ Plan formation(达成行动方案)→ ④ Team action(执行,遵守 social convention)。ARCHON 用 ~300 条规则编码合作行为(Steam 更复杂)。JPG 终止条件:目标达成/不可能/动机消失,任一条件变为 mutual belief 即终止。
- **使用条件**: 异构 agent 协同任务(机器人足球、灾难响应);需要团队层面的失败/成功意识。
- **边界**: "mutual belief" 计算昂贵;agent 数量多时通信成本爆炸。
- **原文关键句**: "When a group of agents are engaged in a cooperative activity they must have all of the following: a joint commitment to the overall aim, as well as their individual commitments to the specific tasks that they have been assigned."(W Ch.8.6.2)

## f21 Coalition & Auction 联盟与拍卖机制
- **类型**: framework
- **来源**: W(Ch13 Forming Coalitions + Ch14 Auctions);B(Ch7 冲突解决/协商)
- **chain_level**: L2
- **独立链归属**: 链 1(W),链 2(B)
- **核心**: 群体决策与资源分配机制——联盟形成(Core/Shapley 值/加权投票)与资源分配拍卖(English/Dutch/Vickrey/VCG);机制设计保证激励相容(truth-telling)。
- **结构**: ① 联盟形成(characteristic function + Shapley 值分配;Core 非空条件判定) ② 拍卖机制(报价→分配;Vickrey/VCG 等 second-price 机制使真实报价为占优策略) ③ 机制设计(激励相容 + 个体理性 + 预算平衡)。
- **使用条件**: 多 agent 资源竞争/协作分配;投票决策;需激励相容设计。
- **边界**: 计算复杂度(Shapley 值 NP-hard);需保证简单可解释;Vickrey 真实报价易被利用。
- **原文关键句**: "Mechanism design ensures incentive compatibility in multi-agent resource allocation."(W Ch.14)

---

## C. 记忆架构

## f22 三层记忆架构(短/长/情景)
- **类型**: framework
- **来源**: G(Ch8 Memory Management);A(Ch6 Knowledge and Memory);B(Ch7.4 智能体记忆架构);Y(Ch5);D(Ch4.7-4.8 Semantic/Episodic/Procedural);F(Ch7)
- **chain_level**: L4(6 书)
- **独立链归属**: 链 1(G+A+F),链 2(B+Y),链 3(D)
- **核心**: 把人脑记忆模型映射到 agent:短期工作记忆(当前会话)+长期知识库(用户偏好/规则)+情景记忆(特定事件时间线),各司其职,组合使用;Gulli 把长期进一步细为语义(semantic,事实)+情景(episodic,经历)+程序(procedural,如何做的规则)。
- **结构**(Biswas 三类):① 短期记忆 WorkingMemory(customer_id + session + 当前查询 + active_searches,temp_preferences) ② 长期记忆 CustomerMemory(profiles + travel_history + feedback_history + special_requirements + loyalty_status) + TravelKnowledge(目的地/季节/供应商) ③ 情景记忆 EpisodicMemory(interaction_history,带 timestamp + retrieve_relevant_episodes)。
- **使用条件**: 长期交互 agent(客服/助手);需从历史学;不同时间尺度的信息需区别管理。
- **边界**: 长期记忆检索质量决定上限;PII 合规;情景记忆易膨胀需压缩。
- **原文关键句**: "智能体记忆架构通常包括三种类型,每种在智能体运行中各有作用,分别是短期记忆、长期记忆和情景记忆。"(B Ch.7.4)

## f23 Session / State / Memory 三分法(ADK 视角)
- **类型**: framework
- **来源**: G(Ch8 Memory Management - ADK);D(Ch4.7 Agent-managed Memory)
- **chain_level**: L2
- **独立链归属**: 链 1(G),链 2(D)
- **核心**: 把"会话级临时数据(state)"和"跨会话持久知识(memory)"严格分层;State 用带前缀的扁平字典(user:/app:/temp:/无前缀)标识作用域与持久性,Memory 通过 MemoryService 接口访问长期知识库。
- **结构**: ① Session(events + state) → ② State(字典,前缀标识作用域与持久性) → ③ MemoryService(add_session_to_memory + search_memory) → ④ 实现:InMemory(测试)/Database(SQLite/Postgres)/VertexAiRagMemoryService(生产)。Gulli 警告:不要直接改 state 字典,要通过 EventActions.state_delta 或 output_key。
- **使用条件**: 工程化生产 agent;需要清晰的作用域与持久性语义;跨 session 复用。
- **边界**: 状态膨胀会触发 token 预算;跨多 session 复用需主动 add_session_to_memory。
- **原文关键句**: "ADK simplifies context management through three core concepts and their associated services: Session (an individual chat thread), State (session-specific temporary data), Memory (a searchable repository of information sourced from various past chats or external sources)."(G Ch.8)

## f24 Context Window 压缩策略(Head/Tail + Token 预算)
- **类型**: framework
- **来源**: G(Ch8 Memory Management);B(Ch7.4 上下文管理);D(Ch11 Optimizing + HeadTailCompaction);A(Ch6 知识管理)
- **chain_level**: L2
- **独立链归属**: 链 1(G),链 2(B+D+A)
- **核心**: 在 token 预算内最大化保留相关上下文;用 count_tokens 工具量化代价,用 Summarizer agent 主动压缩旧内容。
- **结构**: ① count_tokens(text, model) 燃料表 → ② 监测 token 预算 → ③ 触发压缩策略(保留 system prompt + 近期消息 + 摘要旧内容 = HeadTailCompaction) ④ 用 Summarizer agent 把中间历史压缩成 summary。Rothman 把它和 Context Engine 集成。
- **使用条件**: 任何长任务 agent;token 预算约束硬;旧信息仍有价值但密度低。
- **边界**: 摘要本身要 token;压缩过头会丢关键细节。
- **原文关键句**: "The count_tokens utility acts like a 'fuel gauge,' allowing the engine to measure the token cost of a prompt before sending it. By building this now, we lay the foundation for more advanced features later, such as automatically summarizing context to stay within a token budget."(11 Ch.5)

## f25 Procedural Memory + 自动 Prompt 重写
- **类型**: framework
- **来源**: G(Ch8 LangGraph Procedural Memory);D(Ch4.8)
- **chain_level**: L2
- **独立链归属**: 链 1(G),链 2(D)
- **核心**: 把"如何做"的规则放进可更新的 store,agent 反思后自动重写自己的 system prompt(程序性记忆),实现自我适应。
- **结构**: ① update_instructions(state, store) 从 store 读当前指令 → ② 用 prompt_template 把"指令+近期对话"喂给 LLM → ③ 产出 new_instructions → ④ store.put((namespace,), key, {instructions})。下次推理自动用新指令。
- **使用条件**: agent 需长期自适应;指令规则易过时;反思机制已具备。
- **边界**: 自我修改循环可能漂移;需护栏(版本号/审批)。
- **原文关键句**: "An effective technique is 'Reflection,' where an agent is prompted with its current instructions and recent interactions, then asked to refine its own instructions."(G Ch.8)

---

## D. 上下文/语义引擎

## f26 Context Engine(Planner + Executor + Tracer + AgentRegistry)
- **类型**: framework
- **来源**: R(Ch4-6 第 4 章搭建、第 5 章硬化、第 6 章解耦);Y(Ch4 RAG);A(Ch5)
- **chain_level**: L3(2 书 + 深度原创)
- **独立链归属**: 链 1(R)
- **核心**: 把"上下文工程"提升为可生产的 meta-system:Planner(LLM 生成执行计划)+ Executor(按计划调用 specialist agent)+ Tracer(ExecutionTrace 记录全程)+ Agent Registry(动态发现能力),通过 MCP 消息协议互联;四个阶段:Initiation/Planning/Execution/Finalization。
- **结构**: ① Initiation(logging + context_engine() 入口) → ② Planning(ExecutionTrace 初始化 + AgentRegistry.get_capabilities_description + planner() 调 LLM 出 JSON 计划 + log_plan) → ③ Execution loop(resolve_dependencies 替换 $$STEP_N_OUTPUT$$ 占位符 → AgentRegistry.get_handler → agent_*() 执行 → log_step) → ④ Finalization(finalize() 状态 + 返回 result + trace)。
- **使用条件**: 复杂多步任务需要动态规划 + 全程可观测;agent 数量动态变化;需要规划能力描述自动发现。
- **边界**: Planner LLM 出错可让整个 workflow 跑偏;Tracer 数据量大;JSON 计划与 Agent 输出需 schema 严格。
- **原文关键句**: "The Context Engine is a meta-system, an intelligent controller that organizes specialized agents around a dynamic strategy. Two-phase process: Planner acts as the strategic core, reasoning about the user's goal in using the Agent Registry as a 'toolkit'... Then, the Planner uses an LLM to generate a dynamic, step-by-step execution plan."(R Ch.4)

## f27 Context Chaining($$STEP_N_OUTPUT$$ 占位符)
- **类型**: framework
- **来源**: R(Ch4 上下文链式);D(Ch7 Handoff)
- **chain_level**: L2
- **独立链归属**: 链 1(R)
- **核心**: 用占位符 `$$STEP_N_OUTPUT$$` 声明"这一步的输入是某前步的输出",Executor 在执行时把占位符替换为实际值;支持多步串联(包括 Writer→Writer 的级联,如 Hemingway 重写)。
- **结构**: ① Planner 在计划里用 `{"step":3, "agent":"Writer", "input":{"blueprint":"$$STEP_1_OUTPUT$$", "facts":"$$STEP_2_OUTPUT$$"}}` 显式声明依赖 → ② Executor.resolve_dependencies() 扫描输入,把占位符替换为 state[step_N].output → ③ 调用 agent → ④ 把输出写入 state。
- **使用条件**: 步骤间有明确数据依赖;需要动态规划而非硬编码顺序。
- **边界**: 复杂依赖图维护成本;循环依赖需循环检测;LLM 不擅长精确占位符语法。
- **原文关键句**: "The Executor checks the inputs required for the agent. If it finds a placeholder like $$ STEP_1_OUTPUT $$, this function replaces it with the actual data produced by Step 1, which is stored in the engine's state dictionary."(R Ch.4)

## f28 Dual RAG(Procedural vs Factual,双 namespace)
- **类型**: framework
- **来源**: R(Ch3);A(Ch6 RAG/GraphRAG);Y(Ch4 RAG);G(Ch14 Agentic RAG)
- **chain_level**: L4(4 书)
- **独立链归属**: 链 1(R+A+G),链 2(Y)
- **核心**: 把知识库拆为两个独立向量命名空间:ContextLibrary(程序性指令/"做什么")和 KnowledgeStore(事实/"是什么");不同 agent 各查一类,Writer 合并两者生成最终输出。
- **结构**: ① ContextLibrary:存 Semantic Blueprint(描述 + 完整 JSON),只 embed 描述向量,JSON 放 metadata → ② KnowledgeStore:存事实 chunks,正常 embed → ③ Librarian agent 查 ContextLibrary 找匹配蓝图 → ④ Researcher agent 查 KnowledgeStore 取事实 → ⑤ Writer 把 blueprint(指令)+ facts(材料)合并。
- **使用条件**: 需要"风格/结构指令"与"领域事实"分别管理的 agent(内容生成/合规审查/客服话术)。
- **边界**: 双库需同步更新;蓝图冲突需优先级机制。
- **原文关键句**: "We use a single Pinecone index, divided into two strictly separated namespaces: KnowledgeStore: This namespace stores the vectors from the factual data. ContextLibrary: This namespace stores the vectors from the procedural blueprints."(R Ch.3)

## f29 Semantic Blueprint(可重用程序指令模板)
- **类型**: framework
- **来源**: R(Ch1);B(Ch6.5.1 系统提示词)
- **chain_level**: L2
- **独立链归属**: 链 1(R),链 2(B)
- **核心**: 把"如何写"的程序性指令抽象成可检索、可复用的 JSON 模板(suspense_narrative、technical_explanation、casual_summary 等),通过 Librarian agent 按用户意图动态加载;Rothman 还给出 5 级蓝图成熟度(Level 5 = 完整 SRL 语义图)。
- **结构**: ① Blueprint 定义:{id, description, blueprint(JSON 指令含 scene_goal/grammar 等)} → ② 只 embed description,完整 blueprint JSON 存 metadata → ③ 按用户意图检索 top_k=1 → ④ 命中则把 blueprint JSON 注入 Writer 系统 prompt,Writer 必须"严格遵守" → ⑤ 未命中则 fallback 默认中性指令。
- **使用条件**: 同一种内容生成有多种风格/结构变体;专家知识沉淀为可复用资产。
- **边界**: Blueprint 互相冲突时优先级;Blueprint 不可被 LLM 改写(否则失去程序性)。
- **原文关键句**: "Semantic blueprints allow you to capture procedural instructions once and reuse them endlessly... A blueprint will not be embedded. Once the description is accessed, we will retrieve the blueprint like we would a book once we know where it is."(R Ch.3)

## f30 MCP(Model Context Protocol)
- **类型**: framework
- **来源**: G(Ch10 MCP);F(Ch5 MCP Tools);R(Ch2/3);Y(Ch8);D(Ch12.2 MCP);B(Ch7)
- **chain_level**: L4(6 书)
- **独立链归属**: 链 1(G+F+R+Y),链 2(D)
- **核心**: 标准化"agent 调用外部工具/数据"的协议;三层架构(MCP Host 应用 + MCP Client 通信 + MCP Server 暴露工具/资源/提示),双传输(stdio 本地 / streamable HTTP 远程);支持 elicitation(请求用户输入)、sampling(借用 client 的 LLM)、progress notifications(流式进度)、resumable sessions(断线重连)。
- **结构**: ① MCP Server 用 @mcp.tool() 装饰器注册能力 → ② MCP Client 建立 ClientSession,调用 session.list_tools() 发现 → ③ Agent 通过 MCPTool(BaseTool 子类)包装,参数 schema/input/output 自动转换 → ④ 命名空间加前缀 mcp_{server_id}_{tool_name} 防冲突 → ⑤ 完成后 await manager.disconnect_all()。HTTP transport 需 OAuth 2.1 + PKCE;禁止 token passthrough。
- **使用条件**: 工具需要跨应用复用(写一次,Claude Desktop/Cursor/VSCode 都能用);跨进程跨组织;动态工具发现。
- **边界**: 协议版本兼容;HTTP transport 必须 OAuth 2.1 + PKCE;resource indicators 防 confused deputy。
- **原文关键句**: "Model Context Protocol (MCP) emerged to standardize tool and context integration, solving the proliferation of custom connectors across AI applications... It has also evolved to support agent-to-agent communication by implementing... streaming progress, resumable sessions, durable state via resource links, and multi-turn interactions through elicitation and sampling."(D Ch.12.2)

## f31 A2A Protocol(Agent Card + Task Lifecycle + contextId)
- **类型**: framework
- **来源**: G(Ch15 Inter-Agent Communication);D(Ch12.3 A2A);F(Ch9 Agent2Agent)
- **chain_level**: L3(3 书)
- **独立链归属**: 链 1(G),链 2(D+F)
- **核心**: 标准化"agent 之间跨组织委托任务"的协议;Agent Card(/.well-known/agent-card.json)声明能力,Task 有生命周期状态(submitted/working/input-required/auth-required/completed/failed/canceled/rejected),contextId 串联多轮任务;HTTP+SSE+JSON-RPC 2.0;A2A vs MCP:A2A 是 peer-to-peer 对等代理(隐藏内部);MCP 是 host-orchestrated 工具调用。
- **结构**: ① Discovery:GET /.well-known/agent-card.json 或 registry → ② message/send 创建 Task → ③ 流式(message/stream)或 webhook(push notifications) ④ 状态查询 tasks/get → ⑤ 相同 contextId 串接相关任务。三种交互模式:Request/Response、Streaming(SSE)、Push Notifications。
- **使用条件**: 跨组织 agent 协作(企业/法律/医疗);Agent 市场;需要明确审计与生命周期管理。
- **边界**: 需统一 HTTP 安全(OAuth2/API key);Agent Card 可能暴露敏感能力;上下文管理需 orchestrator 显式处理。
- **原文关键句**: "A2A approaches distributed agent communication through a task-centric architecture: a task-centric architecture: every interaction creates a Task with a unique identifier and lifecycle states. Tasks become durable, inspectable work units that survive network disruptions and provide clear accountability."(D Ch.12.3)

---

## E. 工具与协议

## f32 工具设计四原则(schema + description + 示例 + 边界)
- **类型**: framework
- **来源**: G(Ch5 Tool Use);A(Ch4 Tools);B(Ch5.2.2 为智能体定义工具);D(Ch12.4 MCP Bridge)
- **chain_level**: L3
- **独立链归属**: 链 1(G+A),链 2(B+D)
- **核心**: 工具不是普通函数调用,必须满足 LLM 可理解的标准:清晰 description(用途+边界)、强类型 schema(参数+返回)、示例 few-shot、错误反馈。
- **结构**: ① name(动词优先,如 get_weather) → ② description(写清什么时候用、什么时候不用) → ③ input_schema(JSON Schema,required 标记) → ④ examples → ⑤ 返回结构清晰(JSON 而非裸字符串)。Dibia 的 MCPTool 把这些自动桥接到 BaseTool。
- **使用条件**: 任何 LLM tool calling;尤其是工具库超过 5 个需要避免 LLM 选择混乱。
- **边界**: 描述冗长会挤占 prompt;schema 复杂 LLM 易填错。
- **原文关键句**: "Tool definition typically uses docstrings or JSON schema, requires clearly described purpose, required input, and expected output, so that it can communicate with the agent."(B Ch.5.2.2)

## f33 Tool Use Restrictions / Principle of Least Privilege
- **类型**: framework
- **来源**: G(Ch18 Guardrails - Tool Use Restrictions + Principle of Least Privilege);D(Ch13 Rule of Two);B(Ch8 安全管理)
- **chain_level**: L2
- **独立链归属**: 链 1(G),链 2(D+B)
- **核心**: 工具能力是 agent 行为的"杠杆",必须按"最小权限"原则严格限制——只为 agent 提供完成任务所需的最小工具集;高风险操作(send_email、delete_file)必须显式要求审批。
- **结构**: ① 任务分析 → ② 工具白名单(只暴露必要工具) → ③ 高风险工具标 approval_mode="always_require" → ④ before_tool_callback 校验参数(用户 ID 匹配、业务规则) → ⑤ 失败时阻止执行返回错误。Gulli 强调:"新闻摘要 agent 不应有读私人文件的能力"。
- **使用条件**: 任何对真实世界有副作用的工具;多租户 agent;合规要求。
- **边界**: 过度限制会让 agent 能力不足。
- **原文关键句**: "An agent should be granted the absolute minimum set of permissions required to perform its task. This drastically limits the 'blast radius' of potential errors or malicious exploits."(G Ch.18)

## f34 Agent Skills(SKILL.md procedural workflow)
- **类型**: framework
- **来源**: F(Ch6 Skills);G(Appendix A);A(Ch8)
- **chain_level**: L2
- **独立链归属**: 链 1(F+A),链 2(G)
- **核心**: 把"重复使用的程序性工作流"沉淀为结构化文档(SKILL.md 含 frontmatter+正文),agent 通过 discovery 自动激活并把 workflow 注入上下文;比 MCP 工具更上层,描述"如何组合多个工具完成任务"。
- **结构**: ① SKILL.md = frontmatter(name/description/resources) + 正文(procedural workflow 多步描述) → ② Discovery:扫描 SKILL.md 提取 name/description → ③ Activation:把全文加载到 agent 上下文 → ④ Agent 按文档步骤顺序执行并使用 frontmatter.resources 找到具体工具/数据。
- **使用条件**: 同一任务多种程序性变体;需要文档化最佳实践给 agent;团队需要共享工作流。
- **边界**: SKILL.md 与 MCP 工具重复(应明确层次:MCP=原子工具,Skill=组合流程);文档维护成本。
- **原文关键句**: "Skills address this pain point by preserving procedures like this in a documented workflow that tells the LLM agent what to do step-by-step... The SKILL.md file includes important information that helps LLM agents understand and apply the skill correctly."(F Ch.6)

---

## F. 评估与安全

## f35 Human-in-the-Loop 三模式(HITL + Human-on-the-loop + Escalation)
- **类型**: framework
- **来源**: G(Ch13 Human-in-the-Loop);F(Ch8);A(Ch13 HITL review workflow);D(Ch3 UX);B(Ch9 安全管理)
- **chain_level**: L4(5 书)
- **独立链归属**: 链 1(G+A+F),链 2(B+D)
- **核心**: 把"人"作为系统的关键角色——HITL(关键决策前阻塞等人批)、Human-on-the-Loop(人设策略,agent 自动执行,异常才叫人)、Escalation Policy(明确的升级条件);三者在不同自动化级别。Gulli 进一步给出六维 HITL:Human Oversight/Intervention/Feedback/Decision Augmentation/Collaboration/Escalation Policies。
- **结构**: ① Human Oversight(日志/仪表盘监控) → ② Intervention & Correction(agent 主动请求人介入) → ③ Human Feedback for Learning(RLHF) → ④ Decision Augmentation(AI 给人建议,人决定) → ⑤ Human-Agent Collaboration(例行 AI,创意/人际 human) → ⑥ Escalation Policies(明确"什么时候叫人")。
- **使用条件**: 高风险动作(发送邮件、扣款、医疗建议);用户对自动化的信任度还在建设;法规要求。
- **边界**: HITL 严重限制扩展性(Human bottleneck);Human-on-the-loop 较平衡;Biswas 强调"渐进自主":从高度限制开始,按可靠性逐步扩展。
- **原文关键句**: "HITL encompasses several key aspects: Human Oversight, which involves monitoring AI agent performance and output... Intervention and Correction occurs when an AI agent encounters errors or ambiguous scenarios and may request human intervention... Escalation Policies are established protocols that dictate when and how an agent should escalate tasks to human operators."(G Ch.13)

## f36 Trajectory-based Evaluation 轨迹评估
- **类型**: framework
- **来源**: D(Ch10 Evaluating Multi-Agent Systems);G(Ch19);A(Ch9);F(Ch1 trajectory)
- **chain_level**: L4(4 书)
- **独立链归属**: 链 1(D),链 2(G+A+F)
- **核心**: agent 评估不仅看最终输出,更看"它是怎么走过来的"(每个 step 的 plan、tool call、result);轨迹 = plans + tool calls + reasoning 全文。canonical workflows 用于对照已知最优路径。
- **结构**: ① 收集 trajectories(steps + 各 step 的 input/output) → ② 按维度评分:任务成功、步骤效率、tool 选择合理性、错误恢复 → ③ 比较轨迹而非输出(Fajardo 给蒙特卡洛例子:同一任务两条 trajectory 比 plan 选择差异) → ④ 用 canonical workflows(已知最优路径)对照。
- **使用条件**: agent 行为需可审计/可复现;优化 agent 时需要诊断中间步骤;调试复杂系统。
- **边界**: 轨迹数据量大;LLM-as-judge 评估轨迹本身又是个 agent 问题;轨迹标注成本高。
- **原文关键句**: "Evaluating trajectories reveals where agents fail, not just whether they fail... In a trajectory, you can see the plans and tool calls made in every step performed throughout the task execution."(D Ch.10 + F Ch.1)

## f37 LLM-as-a-Judge + 多维 Rubric
- **类型**: framework
- **来源**: G(Ch19 LLM-as-a-Judge + Legal Survey Rubric);D(Ch10.5 Building a Practical Evaluation Harness);A(Ch9)
- **chain_level**: L3
- **独立链归属**: 链 1(G+A),链 2(D)
- **核心**: 用一个 LLM 按预设多维度 rubric 给另一个 LLM 输出打分,实现主观质量(legal survey/客服语气)的自动化评估;关键是用结构化输出 + 明确维度。
- **结构**: ① 定义 rubric(N 个 1-5 分维度,如 Clarity/Neutrality/Relevance/Completeness/Audience Fit) → ② 构造 prompt(rubric + 评估对象 + 输出 JSON 格式) → ③ 调用 LLM(json_mode) → ④ 解析 overall_score + rationale + detailed_feedback + concerns + recommended_action。
- **使用条件**: 主观质量需批量评估;人工评估不可扩展;评估标准能用文字表达。
- **边界**: Judge LLM 自身偏差(同 model 评同 model 有偏好);rubric 太细则 token 重;judge 自身失败需 fallback。
- **原文关键句**: "A potential framework involves using an LLM as an evaluator. This LLM-as-a-Judge approach assesses another AI agent's output based on predefined criteria for 'helpfulness.' Leveraging the advanced linguistic capabilities of LLMs, this method offers nuanced, human-like evaluations of subjective qualities."(G Ch.19)

## f38 Guardrails / Safety Layers(五层防御)
- **类型**: framework
- **来源**: G(Ch18 Guardrails/Safety Patterns);A(Ch12);B(Ch8-9);D(Ch13);R(Ch8);F(Ch8)
- **chain_level**: L4(6 书)
- **独立链归属**: 链 1(G+A+R+F),链 2(B+D)
- **核心**: 用多层防御阻挡恶意输入/输出/行为,,任一层失败都被下一层兜住;不靠单点防御。
- **结构**(五层):① Input Validation/Sanitization(Pydantic schema + 内容审核 API) ② Behavioral Constraints(系统 prompt 设边界) ③ Tool Use Restrictions(白名单 + Least Privilege) ④ Output Filtering/Post-processing(检测毒性/偏见) ⑤ Human Oversight(HITL 兜底)。每层独立组件 + 结构化日志。
- **使用条件**: 任何客户面对 agent;高风险领域(金融/医疗/法律);合规要求。
- **边界**: 多层延迟成本;过度防御降低 UX;审核本身可被绕过。
- **原文关键句**: "These guardrails can be implemented at various stages, including Input Validation/Sanitization to filter malicious content, Output Filtering/Post-processing to analyze generated responses for toxicity or bias, Behavioral Constraints through direct instructions, Tool Use Restrictions to limit agent capabilities, External Moderation APIs for content moderation, and Human Oversight/Intervention via 'Human-in-the-Loop' mechanisms."(G Ch.18)

## f39 Two-Stage Moderation 双阶段审核(预+后)
- **类型**: framework
- **来源**: R(Ch8);B(Ch9);G(Ch18)
- **chain_level**: L3
- **独立链归属**: 链 1(R),链 2(B+G)
- **核心**: 预处理(输入审核)+ 后处理(输出审核)双闸门;输入审核过滤恶意/敏感输入,输出审核保证内容合规。
- **结构**: 1) 输入审核(恶意/敏感检测) 2) agent 执行 3) 输出审核(内容合规) 4) 放行/拦截。
- **使用条件**: 生产环境;内容合规要求;客户面对 agent。
- **边界**: 审核本身可被绕过;误杀影响体验;两个阶段都可能增加延迟。
- **原文关键句**: "Two-stage moderation gates both input and output"(R Ch.8)

## f40 A/B Testing + Drift Detection + Anomaly Detection 持续监控
- **类型**: framework
- **来源**: G(Ch19 Evaluation & Monitoring);A(Ch11 Monitoring);D(Ch10);R(Ch8)
- **chain_level**: L4(4 书)
- **独立链归属**: 链 1(G+A+R),链 2(D)
- **核心**: 把传统 ML 监控思路搬到 agent 领域——并行 A/B 比版本、持续检测输入/输出分布漂移(concept drift)、异常检测及时告警。
- **结构**: ① A/B Testing(同一流量分两版本,比 success rate + latency + token + 成本) → ② Drift Detection(滚动监控输入/输出分布,Kolmogorov-Smirnov / PSI,超阈值告警) → ③ Anomaly Detection(agent 行为偏离正常范围:异常长循环、异常工具调用) → ④ KPI 报告(success rate/p95 latency/token per workflow)。
- **使用条件**: 生产部署的 agent;需要持续改进;多版本并行。
- **边界**: 需要 baseline 数据;漂移与"真实世界变化"难区分。
- **原文关键句**: "Drift Detection: Monitoring the relevance or accuracy of an agent's outputs over time, detecting when its performance degrades due to changes in input data distribution (concept drift) or environmental shifts."(G Ch.19)

## f41 Policy-Driven Meta-Controller 政策驱动控制
- **类型**: framework
- **来源**: R(Ch8);D(Ch13);B(Ch8 安全管理)
- **chain_level**: L2
- **独立链归属**: 链 1(R),链 2(D+B)
- **核心**: 用"政策"(规则/边界/合规要求)作为最高级 context 控制 agent 行为,组织合规与品牌一致性的统一基线。
- **结构**: 1) 定义政策(规则/边界) 2) 作为 meta-context 注入 3) agent 执行受政策约束 4) 违规检测与升级。
- **使用条件**: 组织合规;品牌一致性;金融/医疗/法律;统一行为基线。
- **边界**: 政策冲突需裁决机制;政策更新需同步所有 agent。
- **原文关键句**: "Policy acts as the highest-level context governing agent behavior"(R Ch.8)

## f42 Computer Use Agent 电脑操作智能体
- **类型**: framework
- **来源**: D(Ch5 Computer Use Agents);G(Appendix B Anthropic Computer Use / OpenAI Operator)
- **chain_level**: L2
- **独立链归属**: 链 1(D),链 2(G)
- **核心**: agent 操作 GUI/浏览器的模式——action sequence + interface representation + execution;现代 Agent(如 OpenAI Operator)直接控制 UI 而非 API。
- **结构**: 1) 界面表示(屏幕截图/元素列表) 2) 动作序列生成(implicit vs explicit planning) 3) 动作执行(点击/输入/滚动) 4) 结果观察。
- **使用条件**: 需要操作 GUI 应用;RPA 场景;无 API 可用。
- **边界**: 界面变化导致失败;权限安全(可访问整个桌面);速度慢;错误恢复难。
- **原文关键句**: "Computer use agents generate and execute action sequences on GUIs"(D Ch.5)

---

## G. UX 与编排控制

## f43 UX 原则:Observability + Capability Discovery + Interruptibility
- **类型**: framework
- **来源**: D(Ch3.4 + Ch8.4);A(Ch3 UX);B(Ch8 高效智能体系统设计)
- **chain_level**: L3(3 书)
- **独立链归属**: 链 1(D+A),链 2(B)
- **核心**: 长任务 agent 的 UX 不是"按钮+等待",而是必须支持三大特性:可观测(看 agent 正在做什么)、能力发现(用户知道能用什么)、可中断(长任务中途可停);Dibia 还加 cost-aware delegation。
- **结构**: ① Observability:流式事件(每个 tool call 实时显示、SSE 推送)+ 阶段进度 ② Capability Discovery:首屏给 2-3 个 preset prompt 示例 ③ Interruptibility:AbortController(前端)+ GeneratorExit/CancellationToken(后端)三层穿透 ④ Reset/Retry/Approval UI。
- **使用条件**: 长任务 agent(分钟到小时);生产应用;用户对 AI 不可预测的耐心有限。
- **边界**: 增加前端复杂度;cancellation 需穿透所有层。
- **原文关键句**: "Three UX principles... translate directly into implementation: observability (streaming agent events in real-time), capability discovery (preset prompts guiding users to reliable tasks), and interruptibility (cancellation via AbortController + CancellationToken)."(D Ch.8.9)

## f44 SSE vs WebSocket 流式协议选择
- **类型**: framework
- **来源**: D(Ch8.6);G(Appendix A progress notifications via SSE/WebSocket);A(Ch11 监控)
- **chain_level**: L2
- **独立链归属**: 链 1(D),链 2(G+A)
- **核心**: agent 长任务的流式推送有两种主流协议,选择标准不是性能而是"运维复杂度";SSE + 上下文管理能实现 WebSocket 同样的 UX 但支持横向扩展和异步工作流。
- **结构**(Dibia):① 评估 use case:长任务(分钟-小时)?异步审批?多设备连续? → ② 是 → SSE + session_id + 后端 session_manager(无状态,可换服务器) → ③ 否(真实时双向,如协同编辑)→ WebSocket。SSE 一旦连接断,后端 GeneratorExit 触发 cancellation_token 取消 agent。
- **使用条件**: 任何 agent 前端;尤其是长任务/审批/异步工作流。
- **边界**: 需 server 友好(标准 HTTP+SSE);WebSocket 仅在低延迟双向时使用;基础设施成本不同。
- **原文关键句**: "Start with SSE + context management for most agent applications. The stateless design enables async workflows that WebSockets simply cannot support efficiently, while providing the same responsive user experience."(D Ch.8.6)

## f45 Handoff Orchestration 显式转交
- **类型**: framework
- **来源**: D(Ch7.5 Handoff Orchestration);B(Ch6 委派者)
- **chain_level**: L2
- **独立链归属**: 链 1(D),链 2(B)
- **核心**: 区别于"orchestrator 选下一个",允许当前 agent 显式把控制权交给特定 peer(如"Triage 完成后交给 Specialist")——更接近人类客服转接。
- **结构**: 当前 agent 调用 handoff(target_agent, context_payload) → 目标 agent 接管 → 更新 active_agent。
- **使用条件**: 多 agent 系统模拟人类组织(专员-主管-专家);显式转交语义比隐式选择更可解释。
- **边界**: 转交环路(两个 agent 互转)需死锁检测;语义不如语义路由清晰。
- **原文关键句**: "Handoff Orchestration: Extend the orchestration patterns to support direct agent-to-agent handoffs. Instead of the orchestrator always selecting the next agent, allow agents to explicitly transfer control to specific peers."(D Ch.7.5)

## f46 Latency Budgeting 延迟预算
- **类型**: framework
- **来源**: R(Ch8);D(Ch11 Optimizing);A(Ch11 监控)
- **chain_level**: L3
- **独立链归属**: 链 1(R+A),链 2(D)
- **核心**: 在 agent 响应质量与业务延迟要求间做显式预算权衡;推理扩展法则(Scaling Inference Law):思考时间↑,准确度↑,但有边际递减。
- **结构**: 1) 定义延迟目标 2) 分解各环节预算(Planning/Tool/Generation) 3) 监控实际延迟 4) 超预算时降级(简化推理/并行/换小模型)。
- **使用条件**: 实时交互场景;SLA 严格;成本敏感。
- **边界**: 质量与延迟的权衡需领域判断;预算过紧会牺牲质量。
- **原文关键句**: "Latency budgeting makes explicit tradeoffs between response quality and speed... the Inference Scaling Law implies an agent's performance is not just about its underlying model size, but its allocated 'thinking time,' allowing for more deliberate and higher-quality autonomous actions."(R Ch.8 + G Ch.17)

## f47 Deep Research 深度研究模式
- **类型**: framework
- **来源**: F(Ch1 Deep Research);R(Ch7);G(Appendix Deep Research);A(Ch10)
- **chain_level**: L3
- **独立链归属**: 链 1(F+A),链 2(R+G)
- **核心**: 多步骤搜索+综合的研究型 agent 模式——初始搜索→识别知识缺口→反思→针对性补充搜索→综合报告(带引用)。
- **结构**: 1) 问题分解(用户同意 plan) 2) 多路并行搜索 3) 结果筛选+反思(知识缺口检测) 4) 迭代搜索填补 5) 综合报告(带 inline citations + 引用源)。
- **使用条件**: 需要全面调研的任务;DeepSeek/Perplexity/Google/OpenAI 都已产品化。
- **边界**: 检索质量;时间成本;多源矛盾需 reconciliation。
- **原文关键句**: "Deep research agents perform multi-step search and synthesis... A standard search provides immediate links, leaving the work of synthesis to you. Deep Research operates on a a different model... the agent autonomously performs a series of sophisticated steps."(F Ch.1)

---

## 总览矩阵

| # | 框架名 | 类别 | chain_level | 主源链 |
|---|--------|------|-------------|--------|
| f01 | ReAct 循环 | A | L4 | 链 1+2 |
| f02 | Reflection/Producer-Critic | A | L4 | 链 1+2 |
| f03 | Prompt Chaining | A | L3 | 链 1+2 |
| f04 | Routing | A | L4 | 链 1+2 |
| f05 | Parallelization | A | L4 | 链 1+2 |
| f06 | Tool Use/Function Calling | A | L4 | 链 1+2+3 |
| f07 | Planning(LLM-plan+HTN) | A | L4 | 链 1+2+3 |
| f08 | CoT / ToT | A | L3 | 链 1+2 |
| f09 | Meta-Reasoning 三件套 | A | L2 | 链 1 |
| f10 | Goal Setting and Monitoring | A | L2 | 链 1+2 |
| f11 | Exception Handling & Recovery | A | L3 | 链 1+2 |
| f12 | Multi-Agent Orchestration(谱系) | B | L4 | 多链 |
| f13 | CWD 模型 | B | L3 | 链 1+2 |
| f14 | Workflow Computational Graph | B | L3 | 多链 |
| f15 | Orchestrator Loop | B | L3 | 多链 |
| f16 | Round-Robin/AI-Driven/Plan-Based 三策略 | B | L3 | 链 1+2 |
| f17 | Workflow Checkpointing + 结构哈希 | B | L2 | 链 1+2 |
| f18 | Contract Net Protocol | B | L3 | 链 1+2 |
| f19 | BDI Architecture + Reconsideration | B | L2 | 链 1+2 |
| f20 | Joint Persistent Goals | B | L2 | 链 1+2 |
| f21 | Coalition & Auction 机制 | B | L2 | 链 1+2 |
| f22 | 三层记忆架构(短/长/情景) | C | L4 | 多链 |
| f23 | Session/State/Memory 三分法 | C | L2 | 链 1+2 |
| f24 | Context Window 压缩策略 | C | L2 | 链 1+2+3 |
| f25 | Procedural Memory + 自动 Prompt 重写 | C | L2 | 链 1+2 |
| f26 | Context Engine(Planner/Executor/Tracer/Registry) | D | L3 | 链 1 |
| f27 | Context Chaining($$STEP_N_OUTPUT$$) | D | L2 | 链 1 |
| f28 | Dual RAG | D | L4 | 链 1+2 |
| f29 | Semantic Blueprint | D | L2 | 链 1+2 |
| f30 | MCP | D | L4 | 多链 |
| f31 | A2A Protocol | D | L3 | 链 1+2 |
| f32 | 工具设计四原则 | E | L3 | 链 1+2 |
| f33 | Tool Use Restrictions / Least Privilege | E | L2 | 多链 |
| f34 | Agent Skills(SKILL.md) | E | L2 | 链 1+2 |
| f35 | HITL 三模式 | F | L4 | 多链 |
| f36 | Trajectory-based Evaluation | F | L4 | 多链 |
| f37 | LLM-as-a-Judge + Rubric | F | L3 | 链 1+2 |
| f38 | Guardrails/Safety Layers | F | L4 | 多链 |
| f39 | Two-Stage Moderation | F | L3 | 链 1+2 |
| f40 | A/B Testing + Drift/Anomaly Detection | F | L4 | 多链 |
| f41 | Policy-Driven Meta-Controller | F | L2 | 链 1+2 |
| f42 | Computer Use Agent | F | L2 | 链 1+2 |
| f43 | UX 三原则(Observability/Capability/Interruptibility) | G | L3 | 链 1+2 |
| f44 | SSE vs WebSocket 选择 | G | L2 | 链 1+2 |
| f45 | Handoff Orchestration | G | L2 | 链 1+2 |
| f46 | Latency Budgeting + Scaling Inference | G | L3 | 链 1+2 |
| f47 | Deep Research 模式 | G | L3 | 多链 |

> 实际收录 **47 个候选框架**,全部满足 V1(≥2 独立场景来源或单一深度源)、V2(可回答书里未明说的问题)、V3(非平庸常识)。
> 类别:A=单 Agent 设计模式(11)、B=多智能体编排(10)、C=记忆(4)、D=上下文/语义引擎(6)、E=工具与协议(3)、F=评估与安全(8)、G=UX 与编排控制(5)。

## 提取纪律说明

1. **同名同型去重**:原本候选有"Evaluation Framework"(f16)与"Trajectory-Based Evaluation"(f25)的重复,已合并统一为 f36;原"f17 MCP Integration"重命名为 f30 并保留全 6 书标注。
2. **chain_level 谨慎**:L4 仅给在 ≥4 本书中独立出现且已被生态普遍作为"事实标准"使用的(ReAct, Tool Use, Planning, Multi-Agent Orchestration, MCP, HITL, Guardrails, Trajectory-based Eval, A/B Test, Memory, Routing, Parallelization);L3 给跨 2-3 书或单书深度框架;L2 给单源但够深度的。
3. **来源标注规范**:每条带"书 + 章节",Wooldridge 03+04 合并计为 1 来源(同作者同书)。
4. **低置信标记**:f09 Meta-Reasoning 三件套、f25 Procedural Memory、f27 Context Chaining、f29 Semantic Blueprint、f33 Tool Use Restrictions、f34 Agent Skills、f39 Two-Stage Moderation、f41 Policy-Driven、f42 Computer Use、f44 SSE vs WebSocket、f45 Handoff 主要靠单源/双源,标 L2 表明证据较弱,后续可补强。
5. **未入选候选**(内容存在但不够框架化或证据太薄):
   - **Chain of Debates (CoD) / Graph of Debates (GoD)**:Gulli Ch17 提到,但内容较散,只展示了"多 agent 辩论"思路
   - **MASS(多 Agent 系统搜索)**:Gulli Ch17 简述,跨书无对应
   - **Speech Acts / FIPA ACL**:经典 MAS 通信语言,W 详述但 LLM agent 时代已让位于 MCP/A2A
   - **PGP / Joint Intention 实施细则**:W Ch8 给出但与 f20 重复
   - **Elicitation/Sampling(作为独立模式)**:已在 MCP 模式中包含
   - **Agent-to-Agent Communication(广义)**:已分裂为 A2A、Inter-Agent Communication Ch15 等
   - **State Rollback**:已并入 f11 Exception Handling