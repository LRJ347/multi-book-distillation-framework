# Candidates: Cases(案例)

> **提取依据**: 01-12 全部主语料全过程精读
> **链标注**: L=凌峰(01) G=Gulli(02) W=Wooldridge(03+04) A=Albada(05) M=Mahmoud(06) B=比斯瓦斯(07) Y=尹浩(08) F=Fajardo(10) R=Rothman(11) D=Dibia(12)
> **提取原则**: 作者本人或团队在书中亲自构建/部署/调试的案例;有完整过程(问题→方法→结论→结果);可支撑框架/原则
> **合并规则**: 同一案例多书出现 → 合并并在"传播链"字段加注

---

## A. 凌峰《AI Agent 开发与应用》(7 案例 - 中文落地最丰富)

### c01 出行订票智能体
- **类型**: case
- **来源**: L(Ch6 "贴身管家:出行订票智能体")
- **chain_level**: L3
- **支撑的方法论**: ReAct 框架 + LangChain StructuredTool + ConversationTokenBufferMemory + PydanticOutputParser
- **问题**: 用户希望用自然语言完成火车票查询、方案推荐、购票完整流程,传统 UI 需多次跳转;任意环节缺乏参数时难以继续
- **方法**: (1) 自定义 `MyAgent` 类通过 PromptTemplate 嵌入思考-行动-观察 ReAct 模板;(2) 把查询车票/购票/结束任务封装为 StructuredTool;(3) 引入 ConversationTokenBufferMemory 保存上下文;(4) PydanticOutputParser 把模型输出解析为结构化 Action 对象;(5) MyPrintHandler 回调逐 Token 打印推理过程;(6) 设置最大思考步数避免死循环
- **结论**: 实现"三步思考→选 Tool→组装参数→调用→再思考→结束"完整闭环;票源不足时自动调整方案
- **结果**: 完整 demo:北京-上海查询某天车票 → 模型三轮思考内自主调用 query_ticket → 输出车票详情 → 调用 buy_ticket → 结束任务
- **原文关键句**: "智能体将多步骤推理过程与外部工具调用结合,提升了任务处理的效率……确保了多轮交互时的信息一致性"
- **传播链**: L(首发) → Pinto《Hands-On AI Agents》第 4 章 CrewAI 版

### c02 智能翻译系统(术语一致性 + 多轮优化)
- **类型**: case
- **来源**: L(Ch7 "智能翻译系统的开发与部署")
- **chain_level**: L3
- **支撑的方法论**: langdetect + OpenAI text-davinci-003 + 术语词库 + Prompt 设计 + Flask 部署
- **问题**: 通信领域技术文档翻译中,通用 LLM 翻译结果存在术语不一致(如 "MIMO" 翻成"大规模 MIMO"不规范)
- **方法**: (1) langdetect 自动检测源语言;(2) 调用 GPT 模型做初译;(3) 用本地术语词库做二次校准,自动把"大规模 MIMO"替换为"大规模多输入多输出";(4) 错误处理:空字符串捕获、速率限制重试;(5) Flask 部署为 Web 服务,前端通过 JSON API 调用
- **结论**: 翻译输出在术语一致性上明显优于纯模型翻译;系统可作为 Web API 提供服务
- **结果**: 原文"5G 网络使用大规模 MIMO 和波束成形技术来提高性能" → 终译"5G 网络使用大规模多输入多输出和波束成形技术来提高性能";Nginx + Flask 负载均衡方案在文末设计完成
- **原文关键句**: "术语词库构建……术语校对与提示,确保专业术语在全文中保持一致"
- **传播链**: L(首发) → Y(Ch8.3 "老人与海"案例用 LangGraph 复现)

### c03 智能邮件助理(LLM + Jinja2 + RBAC)
- **类型**: case
- **来源**: L(Ch8 "秒回邮件:智能邮件助理")
- **chain_level**: L3
- **支撑的方法论**: Celery + Redis 异步任务队列 + IMAP/SMTP 集成 + Jinja2 模板 + GPT-2 微调 + RBAC + SMTP 错误兜底
- **问题**: 用户每天面对多种类型邮件,需要自动分类、优先级排序、个性化回复且不能泄露隐私
- **方法**: (1) Celery+Redis 异步处理高并发邮件,10 个任务并行提交测试;(2) PostgreSQL 存储分类索引,优化查询;(3) IMAP 拉取 + SMTP 发送,OAuth2.0 认证;(4) Flask-Login + RBAC 实现多用户权限分离;(5) Jinja2 模板生成会议邀请邮件,LLM 补充个性化内容;(6) try-except 捕获 SMTP 错误 → 自动调用 OpenAI 生成礼貌回复
- **结论**: 邮件处理形成"分类→优先级→个性化回复→错误兜底"完整链路;RBAC 满足最小权限原则
- **结果**: Attempt 1/2 失败后 Attempt 3 成功生成 "Thanks for reaching out! I'll get back soon.";完整 main 函数耗时 5.04 秒
- **原文关键句**: "通过代理 AI 大语言模型来实现自然语言处理的邮件分类与回复,确保每一封邮件都能得到合适的响应"
- **传播链**: L(首发) → A(Ch8 邮件自动起草)

### c04 智能面试助手(sentiment + behavior + automated grading)
- **类型**: case
- **来源**: L(Ch9 "未来招聘官:智能面试助手")
- **chain_level**: L3
- **支撑的方法论**: spaCy NER + TF-IDF + Celery + Redis + 情感分析 + 行为模式分析 + JWT + RBAC + 多维度加权评分
- **问题**: 传统人工简历筛选耗时、面试评估主观,企业需要数据驱动的招聘决策
- **方法**: (1) spaCy 加载 en_core_web_sm 提取简历中姓名/邮箱/电话/技能;(2) SQLite 存储结构化简历 → 自动日志 INFO `main executed in 0.01s`;(3) Celery + Redis 异步调度任务,Redis 缓存面试时间表;(4) Nginx 负载均衡;(5) SentimentAnalyzer + BehaviorAnalyzer 输出 confidence/hestitation/proactiveness;(6) 维度加权评分(语言表达+情感+面部+匹配度)→ 数据化报告,84.5 分阈值
- **结论**: 简历解析→岗位匹配→情感分析→评估报告全流程自动化,3 秒完成一轮评估
- **结果**: Alice 面试 84.33 分 → Recommended;JSON 格式报告含各维度分数;含 API 模拟失败重试逻辑
- **原文关键句**: "评价模型……基于预设的权重计算候选人的综合评分,生成结构化的评价报告"
- **传播链**: L(首发) → A(Ch8 HR/onboarding agent)

### c05 智能推荐系统(协同过滤 + 内容 + GPT 混合)
- **类型**: case
- **来源**: L(Ch10 "个性化推送:智能推荐系统")
- **chain_level**: L3
- **支撑的方法论**: Surprise 库协同过滤 + 余弦相似度 + TF-IDF + OpenAI LLM 自然语言推荐 + 加权融合 + 增量学习
- **问题**: 单一推荐算法各有缺陷,数据稀疏和冷启动显著影响效果
- **方法**: (1) 协同过滤使用 Surprise 的 SVD、KNN 等算法处理用户-物品评分矩阵;(2) 基于内容用 TF-IDF 向量化物品描述,余弦相似度计算相似物品;(3) OpenAI API 对用户查询做自然语言推荐(理解"我想看一部适合周末放松的喜剧");(4) 加权融合三种信号;(5) 增量学习支持实时更新;(6) A/B 测试动态调整权重
- **结论**: 混合推荐在精度和覆盖度上优于单一算法;LLM 推荐增强自然语言场景可解释性
- **结果**: 完整代码 + 调优策略;在 A/B 测试框架下动态调整权重
- **原文关键句**: "通过协同过滤、基于内容的推荐以及 GPT 生成的推荐,构建混合推荐系统,实现高效、精准的个性化推荐"
- **传播链**: L(首发) → A(Ch11 营销/广告 agent)

### c06 智能写作助手(多语言 + 风格定制 + Flask 部署)
- **类型**: case
- **来源**: L(Ch11 "专业撰稿人:智能写作助手")
- **chain_level**: L3
- **支撑的方法论**: OpenAI API + langdetect + TextBlob 拼写检查 + googletrans + Flask + 缓存 + 日志
- **问题**: 写作场景需要内容生成+续写+多语言支持+风格定制+拼写检查+翻译+摘要等多个能力在同一系统集成
- **方法**: (1) generate_content 调用 OpenAI 生成内容,temperature/max_tokens 控制创造性;(2) continue_writing 基于已有文本续写保持语义连贯;(3) CustomWritingAssistant 类支持语气(正式/随意)/长度/风格(学术/营销)动态定制;(4) context 数组累积多轮对话,过长时截断;(5) 集成 googletrans 翻译、TextBlob 拼写检查、OpenAI 摘要;(6) Heroku/AWS Lambda 部署
- **结论**: 写作智能体成为集成 6+ 工具的多面手,一次会话可包含生成→检查→翻译→摘要
- **结果**: 用户输入"What are the benefits of AI?" → 生成英文 → 拼写检查 → 翻译为中文 → 摘要"AI improves efficiency and automates tasks across industries"
- **原文关键句**: "集成多种 API 功能……实现文本生成、拼写检查、翻译功能和摘要生成"
- **传播链**: L(首发) → G(Ch18 Content Generation Agents)

### c07 智能在线客服(Docker + AWS + 意图识别)
- **类型**: case
- **来源**: L(Ch12 "电商好帮手:智能在线客服")
- **chain_level**: L3
- **支撑的方法论**: OpenAI API + LangChain + 意图识别 + Docker + AWS EC2 + ECR + GitHub Actions CI/CD + Nginx + CloudWatch
- **问题**: 电商客服需要 24×7 响应,涵盖订单查询、退换货、FAQ、个性化推荐,且需高并发、稳定
- **方法**: (1) handle_order_query / handle_return_request / answer_faq 三大核心模块;(2) 意图识别基于关键词匹配(`identify_intent`);(3) `answer_faq` 调用 OpenAI API 生成自然语言回复,context 列表累积多轮对话;(4) RecommendationSystem 与 NLPModule 集成,品类匹配推荐;(5) Docker 容器化,Dockerfile 含 FROM python:3.8-slim、WORKDIR /app、COPY .、RUN pip install、EXPOSE 5000;(6) 部署到 AWS EC2,ECR 存储镜像,GitHub Actions 触发 CI/CD,CloudWatch 监控,ELB 负载均衡
- **结论**: 完整客服系统从代码到云端部署全链路打通;负载测试平均响应 0.80 秒
- **结果**: 输入"查询订单 10086" → 状态"处理中,2 天内发货";输入"退货订单 10086" → "退货申请已提交,3 天处理";并发负载测试 5 用户同时请求 → 平均响应 0.80 秒
- **原文关键句**: "通过 Docker 和 AWS 云平台将智能客服系统部署到生产环境……通过自动化部署工具,实现持续集成与交付"
- **传播链**: L(首发) → A(Ch1 客服全章) / G(Ch9 Learning) / Y(Ch8.6 酒店客服)

---

## B. Gulli《Agentic Design Patterns》(5 案例 - 模式级代码)

### c08 Prompt Chaining: docs-and-code generator
- **类型**: case
- **来源**: G(Ch1)
- **chain_level**: L2
- **支撑的方法论**: Prompt Chaining(链式提示) — 显式分步调用 LLM,中间结果可缓存
- **问题**: 一次提示让 LLM 同时生成文档 + 代码 → 错误率高,无法定位问题
- **方法**: 拆分为三步链:(1) 根据需求生成 API 文档;(2) 文档转 Python 函数签名;(3) 函数签名 + 文档生成实现代码;每步用 Gemini 生成
- **结论**: 链式调用比一次性生成代码质量显著提升,出错可重试单步
- **结果**: 完整代码框架;作者在书 PDF 13-24 页给出端到端可运行代码
- **原文关键句**: "This is the most common pattern and is recommended for most use cases"

### c09 Routing: customer service triage
- **类型**: case
- **来源**: G(Ch2)
- **chain_level**: L2
- **支撑的方法论**: Routing(路由模式) — LLM 决定下一步走哪个分支
- **问题**: 客服工单类型多样(账单/技术/退款),单一处理流程效率低
- **方法**: (1) 分类器 LLM 识别工单类型 → (2) 路由到对应专业子智能体(账单/技术/退款);(3) 每个子智能体有专门 prompt 和工具
- **结论**: 路由模式实现简单分类需求,优于单一全才智能体
- **结果**: 完整代码示例(PDF 13-27 页)
- **原文关键句**: "Routing makes the agent's logic clearer and easier for others … to understand and maintain"

### c10 Reflection: code review with self-critique
- **类型**: case
- **来源**: G(Ch4)
- **chain_level**: L3
- **支撑的方法论**: Reflection(反思模式) — 生成器-评审器双 LLM 循环
- **问题**: LLM 生成的代码经常有 bug 但不知如何发现
- **方法**: (1) Generator LLM 生成初始代码;(2) Reflector LLM 评审代码,给出具体批评建议;(3) Generator 根据批评改进;迭代直到代码合格
- **结论**: 自我反思显著提升代码质量,Reflection 是 LangGraph 状态图的核心节点
- **结果**: 完整 Python 代码(PDF 13-26 页)
- **原文关键句**: "Reflection is one of the most powerful patterns"
- **传播链**: G(首发) → B(Ch4 旅行智能体反思) 独立实现

### c11 Memory: conversational agent with long-term memory
- **类型**: case
- **来源**: G(Ch8)
- **chain_level**: L3
- **支撑的方法论**: Memory Management + vec_store + episodic_memory
- **问题**: 客服对话中用户重复提及同一问题(订单状态),智能体每次都"忘记"
- **方法**: (1) 短期记忆:对话当前 context;(2) 长期记忆:vector store 存储用户历史工单和偏好;(3) 每次回复前 recall 相关长期记忆
- **结论**: 双层记忆架构让对话连贯
- **结果**: 完整 Python + Vector store 代码(PDF Ch21)
- **原文关键句**: "Memory is critical for stateful agent interactions"

### c12 Knowledge Retrieval (RAG): enterprise docs QA
- **类型**: case
- **来源**: G(Ch14)
- **chain_level**: L2
- **支撑的方法论**: RAG(检索增强生成) + chunking + embedding + vector search
- **问题**: 企业私有文档 LLM 无法回答
- **方法**: (1) 文档切片 + embedding 入向量库;(2) 用户查询 → 检索相关 chunks → 注入 LLM prompt;(3) LLM 基于真实文档生成
- **结论**: RAG 减少幻觉,让 LLM 接地于真实知识
- **结果**: 完整 LangChain 风格 RAG 代码(PDF Ch17)
- **原文关键句**: "RAG grounds LLMs with factual context from external sources, which reduces hallucinations"
- **传播链**: G(首发) → R(Ch3 程序化 RAG) / R(Ch7 高保真 RAG)

---

## C. Albada《Building Applications with AI Agents》(7 案例 - 真实 GitHub 案例)

> 作者拥有 Uber/Microsoft/ServiceNow 一线经验,7 个案例均提供 GitHub 完整代码

### c13 电商客服 agent(e-commerce customer support)
- **类型**: case
- **来源**: A(Ch1-2 "Designing Agent Systems")
- **chain_level**: L3
- **支撑的方法论**: LangGraph StateGraph + 工具调用 + 评估
- **问题**: 客服每天处理 hundreds of 同质邮件(取消订单/修改地址/退款),每个流程 2 分钟,可以自动化
- **方法**: (1) 用 LangGraph 定义客服 agent,工具集 `issue_refund` / `cancel_order` / `update_address_for_order`;(2) SystemMessage + chat history 注入 LLM;(3) ToolMessage 把工具结果反馈给 LLM 生成确认邮件;(4) 评估集 `example_order` + 批量测试脚本,核心指标 tool recall、parameter accuracy
- **结论**: 切片问题(只做取消订单)做出最小可用版本 → 测量性能 → 迭代
- **结果**: 完整代码(Ch2 内嵌);评估结果显示 baseline 测试用例 100% 通过,可上线最小版本
- **原文关键句**: "We can build a working agent for this use case in just a few lines of code"
- **传播链**: G(Ch15 A2A) 升级版

### c14 医疗患者入院与分诊(healthcare intake & triage)
- **类型**: case
- **来源**: A(Ch1 "Practical Applications")
- **chain_level**: L3
- **支撑的方法论**: 多模态 agent + 隐私合规(HIPAA) + 谈判升级
- **问题**: 医院患者入院流程效率低:登记、保险验证、症状评估、预约、随访分散
- **方法**: (1) Agent 接收患者描述 → 提取症状 → 与既往病史比对 → 评估紧急程度;(2) 紧急情况升级到护士/医生,常规情况自动安排预约;(3) 集成保险 API 实时验证;(4) 严格 HIPAA 合规,数据加密
- **结论**: 入院流程从小时级压缩到分钟级;分诊准确率显著提升
- **结果**: 描述性案例 + GitHub `/healthcare` 完整代码;UCSF 医生 Carrie Ho 在推荐语验证:有助 intake、triage、workflow integration
- **原文关键句**: "These agents support frontline healthcare operations by registering new patients, verifying insurance, assessing symptoms to prioritize care"
- **传播链**: B(Ch1 医疗/药物发现) 互补

### c15 法律文档审查(Legal document review)
- **类型**: case
- **来源**: A(Ch1 + Ch9-11 详细评估/监控实操)
- **chain_level**: L3
- **支撑的方法论**: RAG + 文档结构化 + 引用可追溯 + 矛盾检测
- **问题**: 律师审查合同慢(每份 4-6 小时),且容易遗漏不利条款
- **方法**: (1) Agent 读取合同 → 拆分条款 → 与标准条款库对比;(2) 识别"应包含但缺失" + "包含但异常"条款;(3) 生成带页面引用的审查报告;(4) 律师只需 review 关键高亮部分
- **结论**: 初级审查时间从 4 小时降到 30 分钟,律师专注高风险条款
- **结果**: GitHub `/legal` 模块完整代码;某案例显示 30 份合同初次审查从 1 个律师全天压缩到 1 小时
- **原文关键句**: "Legal agents assist attorneys and paralegals by reviewing contracts, conducting legal research"
- **传播链**: R(Ch7-9 法律合规助手) 深入

### c16 财务服务 agent(loan + fraud + portfolio)
- **类型**: case
- **来源**: A(Ch1)
- **chain_level**: L3
- **支撑的方法论**: 多 agent + 实时异常检测 + 监管合规
- **问题**: 银行/金融机构需要自动处理账户管理、贷款审批、欺诈调查、投资组合再平衡
- **方法**: (1) 欺诈检测 agent:实时监控交易流,异常模式标记;(2) 贷款审批 agent:自动审核收入证明、信用评分;(3) 投资组合 agent:基于市场动态再平衡;(4) 异常时立即升级到人工
- **结论**: 交易处理速度提升 10x,欺诈检出率显著上升
- **结果**: 描述性案例,GitHub 提供完整示例;每个 agent 独立评分指标
- **原文关键句**: "They streamline customer service, accelerate transaction processing, and improve security by detecting suspicious activities in real time"

### c17 SOC 安全分析师 agent(Security Operations Center)
- **类型**: case
- **来源**: A(Ch1 + Ch12 "Securing Agents")
- **chain_level**: L3
- **支撑的方法论**: 实时数据接入 + 威胁情报 + 隔离/处置 + 审计
- **问题**: SOC 团队 24/7 监控安全告警,疲劳操作导致响应延迟
- **方法**: (1) SOC agent 拉取 SIEM、EDR 日志;(2) 并行调用威胁情报 API(病毒库、IP 信誉);(3) 沙箱分析可疑二进制;(4) 高危事件自动隔离失陷主机 + 通知值班分析师
- **结论**: MTTR(平均响应时间)从 30 分钟降到 5 分钟
- **结果**: GitHub `/soc` 目录;Brad Sarsfield(微软安全 AI 主管)在推荐语中验证
- **原文关键句**: "SOC analyst agents investigate security alerts, gather threat intelligence, query logs, triage incidents, isolate compromised hosts"

### c18 供应链与物流 agent(supply chain)
- **类型**: case
- **来源**: A(Ch1)
- **chain_level**: L3
- **支撑的方法论**: 实时数据 + 预测模型 + 异常处理 + 谈判
- **问题**: 供应链中断频繁,价格波动、运输延误、需求突变
- **方法**: (1) 实时接入库存、运输、需求预测数据;(2) 动态调整生产计划与运输路径;(3) 缺货时自动谈判备份供应商;(4) 中断预警提前 48 小时
- **结论**: 库存周转率提升,中断损失降低
- **结果**: 描述性案例,GitHub 提供代码模板
- **原文关键句**: "Agents optimize inventory, track shipments, evaluate suppliers, coordinate warehouse operations, forecast demand"

### c19 IT helpdesk agent
- **类型**: case
- **来源**: A(Ch1)
- **chain_level**: L3
- **支撑的方法论**: 知识库 + 自动修复脚本 + 升级
- **问题**: IT 部门每天处理大量重复工单(密码重置、VPN 配置、软件安装)
- **方法**: (1) Agent 通过 RAG 检索知识库("How do I reset VPN credentials?");(2) 自动执行修复脚本(密码重置);(3) 仅在失败时升级到工程师
- **结论**: 一线工单自动关闭率 70%+
- **结果**: 描述性案例;GitHub 代码示例
- **原文关键句**: "IT help desk agents manage user access, troubleshoot network and system issues, deploy software updates, respond to security incidents"

---

## D. Biswas《构建 Agentic AI 系统》(4 案例 - CrewAI/AutoGen 实战)

### c20 CWD 旅行规划智能体(协调者-工作者-委派者)
- **类型**: case
- **来源**: B(Ch6 "探索'协调者-工作者-委派者'设计模式")
- **chain_level**: L3
- **支撑的方法论**: CWD 协调模式 + CrewAI + Manager 编排 + 工具推理
- **问题**: 旅行规划涉及多领域(机票/酒店/活动/餐厅),单一 LLM 无法精通所有领域
- **方法**: (1) `flow_coordinator` Agent 作为协调者接收客户请求,拆分为子任务;(2) 委派给 `flight_specialist` / `hotel_planner` / `activity_planner` 三个工作者 agent(各配备不同工具和 prompt);(3) 工作者并行处理任务,通过共享 state 通信;(4) 协调者汇总结果,优化时间表和预算
- **结论**: CWD 模式完美映射项目管理 PM + 团队分工;CrewAI 框架可在一两百行代码内实现
- **结果**: 完整 GitHub 代码 (`Chapter_06.ipynb`);代码覆盖 5 步目标定义、任务规范、流程编排
- **原文关键句**: "协调者负责战略监督……工作者负责执行……委派者负责协调"
- **传播链**: D(Ch7 Autonomous Multi-Agent Orchestration) 进一步发展

### c21 反思型旅行智能体(self-explanation + self-modeling)
- **类型**: case
- **来源**: B(Ch4 "增添智能体的反思能力")
- **chain_level**: L3
- **支撑的方法论**: 元推理 + 自我解释 + 自我建模 + 反馈循环
- **问题**: 智能体推荐酒店时不解释原因 → 用户不信任;推荐过同样的酒店 → 重复错误
- **方法**: (1) `travel_agent = Agent(backstory="You always explain the steps you take to arrive at a conclusion")` 让 LLM 强制解释推理;(2) 每次推荐后,自我解释让 LLM 发现遗漏因素;(3) 用户反馈触发"学习与改进"循环,调整算法权重;(4) 自我建模让 agent 维护目标(从最大化奢华 → 最高性价比)和知识库(剔除好评率低的酒店)
- **结论**: 反思能力让智能体从"静态规则"升级为"持续学习系统"
- **结果**: 用户查询"巴黎 300 美元以下酒店" → 推荐 "Hotel du Petit Moulin" 并解释 "找到了几个,但都超预算,只有这个 300 美元"
- **原文关键句**: "通过引入自我解释功能,反思型旅行智能体可以促进透明度、建立信任、实现持续学习"
- **传播链**: G(Ch4 Reflection) 独立实现

### c22 客户服务聊天机器人(self-reflection)
- **类型**: case
- **来源**: B(Ch4.5.1)
- **chain_level**: L3
- **支撑的方法论**: 自我评估 + 对话历史分析 + 知识库更新
- **问题**: 客服机器人面对同一抱怨反复失败,无法识别模式
- **方法**: (1) Agent 监控每次对话的用户满意度评分;(2) 负面反馈触发知识库回溯,识别模式(比如"政策问题"总是被误解);(3) 优化回应模板,调整语气;(4) 主动识别知识空白(比如"我不知道 X")→ 触发外部知识检索
- **结论**: 反思型客服从"被动应答"升级为"主动学习"
- **结果**: 描述性案例,引用 Zendesk 和 Drift 公司的实际部署经验
- **原文关键句**: "Zendesk 和 Drift 等软件公司已在人工智能驱动的聊天机器人中融入从对话中学习的功能"
- **传播链**: A(Ch1 客服) + G(Ch9 Learning) 同样主题

### c23 亚马逊个性化推荐 agent + 沃尔玛定价 agent
- **类型**: case
- **来源**: B(Ch4.5.2 + Ch4.5.5)
- **chain_level**: L3
- **支撑的方法论**: 消费者行为分析 + 关键绩效指标 + 实时定价
- **问题**: 个性化营销缺乏数据驱动;电商定价难平衡利润与销量
- **方法**: (1) 持续研究客户购买趋势、产品评价 → 优化推荐(亚马逊);(2) 监控竞争对手价格 + 客户反应 + 库存,动态调整定价(沃尔玛/塔吉特)
- **结论**: 个性化营销成功率显著上升;动态定价最大化利润
- **结果**: 描述性案例,引用亚马逊和沃尔玛公开资料
- **原文关键句**: "通过持续研究客户趋势、购买行为和产品评价,亚马逊的智能体能够完善其产品推荐和个性化营销策略"

---

## E. 尹浩《多智能体大模型应用开发》(6 案例 - 第 8 章实战)

### c24 智能家居助手(MCP 协议)
- **类型**: case
- **来源**: Y(Ch8.1 "智能家居助手")
- **chain_level**: L3
- **支撑的方法论**: MCP (Model Context Protocol, Anthropic 2024-11 提出) + 智谱 GLM-4-Plus + 异步客户端 + Tool 缓存
- **问题**: 智能家居场景需要根据外部天气自动决定是否开窗(深圳阴天 27°C/南风 3 级/湿度 56% → 应该关闭窗户)
- **方法**: (1) 构建 MCP 服务端,包含 2 个工具:`weather_query`(高德 API) + `window_control`(本地控制);(2) MCP 客户端通过 STDIO 协议连接;(3) 客户端封装类缓存工具列表(TTLCache 5 秒过期避免重复获取);(4) Agent 类 (`ChMCPAgent`) 迭代调用 LLM → 工具 → 工具结果 → 直到 LLM 不再调用工具
- **结论**: 智能家居场景中,智能体调度 2 个 MCP 工具自主决策开/关窗
- **结果**: 用户输入"查询深圳天气,下雨关窗,否则开窗" → LLM 自主调用 `weather_query` → 发现阴天 → 调用 `window_control(status="关闭")` → 输出"已经关了"
- **原文关键句**: "通过调整工具描述,支持大模型更好地理解并调用……代理调度 2 个工具完成家居环境的智能管理"
- **传播链**: D(Ch12 Protocols) 配套

### c25 AI 办公助手(自动生成 PPT)
- **类型**: case
- **来源**: Y(Ch8.2 "AI 办公助手")
- **chain_level**: L3
- **支撑的方法论**: AiPPT API + 流式 SSE + 5 步流程 + 角色化 prompt
- **问题**: 日常办公需要根据主题生成完整 PPT(背景/大纲/内容/模板/最终文件)
- **方法**: (1) MCP 工具封装 5 个 API:`create_api_token` / `generate_outline` / `generate_content` / `random_one_template` / `generate_pptx`;(2) SSE 流式处理 `iter_lines()` 实时显示生成进度;(3) 系统提示词驱动智能体按 5 步调用(获取 token → 随机模板 → 主题生大纲 → 生成 Markdown 内容 → 模板+内容合成 PPT);(4) 选用 GLM-4-Long(支持超长上下文)保存历史对话
- **结论**: 智能体调度 5 个工具生成完整 PPT,用户获得下载链接
- **结果**: 主题"多智能体协同" → 自动生成 5 页 PPT → markdown 文本 → 文件 URL https://meta-doc.oss-cn-shanghai.aliyuncs.com/...
- **原文关键句**: "强调了多个 MCP 工具的协调调用……通过精心编写的提示词驱动智能体完成复杂的业务流程"

### c26 语言翻译助手(多智能体协同:《老人与海》英译中)
- **类型**: case
- **来源**: Y(Ch8.3 "语言翻译助手")
- **chain_level**: L3
- **支撑的方法论**: LangGraph + 三智能体协同(初译/反思/改进) + GLM-4-Plus
- **问题**: 单次 LLM 翻译不地道,机译色彩重
- **方法**: (1) 3 个智能体:InitTranslator(初译,只看源文本) → ReflectAgent(反思,基于源文+初译给改进建议) → ImproveAgent(改进,基于源文+初译+建议重新生成);(2) LangGraph 框架编排顺序,START → init → reflect → improve → END;(3) 每次执行结果加入全局 state(`{"init": ..., "reflect": ..., "improv": ...}`);(4) 实时显示 Mermaid 拓扑图
- **结论**: 三智能体协同翻译结果接近专业翻译水准
- **结果**: 原文海明威《老人与海》第一章 → 初译("他是一个独自在湾流中划着小船钓鱼的老人") → 反思(7 条具体改进意见,如"暊" → "墨西哥湾"反映 Gulf 含义) → 改进后("他是位独自在墨西哥流中驶小船钓鱼的老者");最终结果经作者多次测试基本接近专业翻译
- **原文关键句**: "通过整合多智能体协同,提升翻译效率与流畅性……执行流程更加高效、灵活"
- **传播链**: R(Ch1 Context Chaining) 同一思想

### c27 知识库助手(RAG + 进阶版带意图识别)
- **类型**: case
- **来源**: Y(Ch8.4 "知识库助手")
- **chain_level**: L2
- **支撑的方法论**: Chroma + 智谱 Embedding + LangChain RecursiveCharacterTextSplitter + LangGraph 条件路由
- **问题**: 用户对知识库既想问答又想定向添加文档,单一接口难处理
- **方法**: (1) KnowledgeStoreManager 封装向量库操作(用 `embed-3` 编码,64 条/批);(2) 基础版:KnowledgeAgent 直接检索 + ChatbotAgent 生成;(3) 进阶版:IntentAgent 分类(CHATBOT/UPDATE) → 条件路由到知识检索/知识更新(`add_file` 工具);(4) LangGraph 状态 + 条件边
- **结论**: 同一知识库支持问答 + 定向文档添加
- **结果**: 加载《天龙八部》TXT → 询问"段誉什么功夫?" → "六脉神剑、北冥神功、凌波微步"等详细武学;进阶版演示添加新文档
- **原文关键句**: "通过 LangGraph 框架构建进阶版知识检索助手……让智能体能够根据用户意图自动选择相应的工作流"

### c28 智能客服(酒店预订 + SQL 数据库)
- **类型**: case
- **来源**: Y(Ch8.6 "智能客服")
- **chain_level**: L3
- **支撑的方法论**: SQLite + LangGraph + 5 节点架构 + SQL 安全校验
- **问题**: 酒店客服需要支持多轮对话(房间查询/注册/预订)+ 数据库操作 + 防 SQL 注入
- **方法**: (1) 5 节点:init_conversation(关键词初始化) → detect_followup_question(判断是否追问) → sql_generate(基于 schema 生成 SQL) → validate_sql(危险关键词 DROP/DELETE 拦截 + 表名校验) → final_answer(自然语言总结);(2) LangGraph 条件边 NEED_CLARIFICATION/SUCCESS 决定路径;(3) DataBase 类封装 schema 获取 + SQL 执行,只允许 SELECT/INSERT
- **结论**: 自然语言接口打通数据库,但 SQL 操作受安全策略约束
- **结果**: 实际 demo:用户"今天给张三订 001 房间" → 自动 SELECT 取 user_id → INSERT INTO bookings → 输出"已成功预订"。完整测试 3 个场景(查询/插/复杂查询)
- **原文关键句**: "采用 LangGraph 协同方式……节点协作……安全策略保证数据准确性"
- **传播链**: L(Ch12 客服) + A(Ch1 客服) 同样主题

---

## F. Fajardo《Build a Multi-Agent System from Scratch》(1 案例)

### c29 Hailstone 工具(Collatz 猜想) — 教学案例
- **类型**: case
- **来源**: F(Ch2-6)
- **chain_level**: L2
- **支撑的方法论**: BaseTool 抽象 + SimpleFunctionTool + PydanticFunctionTool + Skill 协议
- **问题**: 教学用统一示例,展示 LLM agent 工具调用完整流程
- **方法**: (1) Hailstone 序列:`if n is even: n/2 else: 3n+1`,3 个实现版本:BaseTool 子类、SimpleFunctionTool 自动生成 schema、PydanticFunctionTool 用 Pydantic 验证;(2) 第 6 章加入"Skill"概念:在 SKILL.md 中存储元数据,LLM 通过 UseSkillTool 动态激活技能;(3) 名为 `stop-at-one` 的 Hailstone skill 经测试在 TaskHandler 中自动发现
- **结论**: 同一业务逻辑可用 3 种工具实现,体现 LLM agent 工具抽象层级
- **结果**: 完整代码(Ch2-6),"stop-at-one" skill 被发现并显示其 frontmatter/ scope
- **原文关键句**: "We will run the example [Hailstone]…as it is conceptually simple"
- **传播链**: 概念 → G(Ch5 Tool Use) / G(Ch8 Memory)

---

## G. Rothman《Context Engineering》(2 案例 - 端到端深度)

### c30 NASA 灵感高保真研究助手(Dual-RAG + Context Engine)
- **类型**: case
- **来源**: R(Ch7)
- **chain_level**: L3
- **支撑的方法论**: Dual-RAG (知识库 + 上下文库) + Context Engine(规划器/执行器/追踪器) + SRL 语义角色标注 + Semantic Blueprint
- **问题**: 单纯 RAG 回答"事实型"问题(关于 NASA、Apollo 11、Jupiter)质量低,缺乏风格/结构控制
- **方法**: (1) 双 RAG:知识库(事实,如"Juno 是 NASA 木星探测器") + 上下文库(程序/风格蓝图,如"悬疑叙事模板");(2) Context Engine 4 阶段:Initiation → Planning(LLM 生成 JSON 计划) → Execution(状态字典 + 上下文链) → Finalization(ExecutionTrace 记录);(3) 5 个专家代理:Context Librarian(检索蓝图) / Researcher(检索事实,带 source) / Writer(写作) / Summarizer(压缩) / Moderator(内容审核);(4) 执行追踪(ExecutionTrace)记录 plan/log_step/finalize;(5) MCP 跨代理消息
- **结论**: 双重 RAG(事实+风格)显著提升研究输出质量;可追溯 Execution
- **结果**: 完整代码 `Context_Engine.ipynb` + 4 阶段 8+ API 调用,平均延迟 10.7 秒;每篇输出可追溯到具体源 + 风格蓝图
- **原文关键句**: "The Context Engine's glass-box architecture makes it suitable for enterprise deployment"
- **传播链**: 同一架构在 c31 legal 复用

### c31 法律合规助手(profanity 边界 + 政策驱动 meta-controller)
- **类型**: case
- **来源**: R(Ch8-10)
- **chain_level**: L3
- **支撑的方法论**: 高保真 RAG + 三层 Control Deck + 双阶段内容审核 + 政策驱动 meta-controller
- **问题**: 法律场景需要可追溯 + 真实数据;内容审核容易陷入"阻止合法证据"或"放过违规邮件"二选一
- **方法**: (1) 同一 Context Engine 应用于法律域(将控制模板从 NASA 转为法律,但不改 agent);(2) 3 模板:High-Fidelity RAG("What are the key confidentiality obligations in Service Agreement v1?") / Context Reduction("总结隐私政策 → 写 FAQ") / Grounded Reasoning("火箭猴子的开庭辩护" → 故意超出范围测试是否会 hallucinate);(3) OpenAI Moderation API 双阶段审核(输入 + 输出);(4) 现实困境:法律文档里的合法 profanity vs 邮件正文违规 → 提议"meta-controller"应用层做政策决策
- **结论**: 同一架构可跨域复用;但纯技术审核有边界,需组织层面(meta-controller)政策
- **结果**: 真实案例:作者团队发现 profanity 误判真实业务邮件(模拟"Mr. Jones called boss a [profanity]" 既是合法证据又是违规邮件);提出"AI 不能直观 HR 政策"现实原则
- **原文关键句**: "AI cannot intuit organizational rules (e.g., that profanity is allowed in a legal quote but not in an email body)"
- **传播链**: **唯一在"实践失败"维度上有价值的案例**

---

## H. Dibia《Designing Multi-Agent Systems》(3 案例)

### c32 数字营销 agent(marketing campaign generator)
- **类型**: case
- **来源**: D(Ch14)
- **chain_level**: L3
- **支撑的方法论**: PicoAgents + Workflow + Sequential + 状态管理
- **问题**: 营销团队需要快速生成活动邮件 + 客户群定向
- **方法**: PicoAgents Workflow 框架:sequential 工作流 → 关键词提取 → 文案生成 → A/B 测试变量生成
- **结论**: 多智能体适合营销流水线
- **结果**: 描述性案例 + GitHub 代码
- **原文关键句**: "marketing campaigns with measurable ROI"

### c33 医学问答 agent(non-structured medical question answering)
- **类型**: case
- **来源**: D(Ch14)
- **chain_level**: L3
- **支撑的方法论**: PicoAgents + RAG + 知识库
- **问题**: 医学文本非结构化,问答需接地
- **方法**: (1) 从医学文献创建 RAG 知识库;(2) agent 检索 + 生成 + 引用
- **结论**: 同一框架可处理医学领域
- **结果**: 描述性案例
- **原文关键句**: "Application: Complete implementations for information processing, data analysis, and software engineering"

### c34 软件工程 agent(code review on handtracking repo)
- **类型**: case
- **来源**: D(Ch15)
- **chain_level**: L3
- **支撑的方法论**: 5 类工具 + 5 阶段 prompt + 中间压缩 + 钩子
- **问题**: 审查 44 文件 Python 代码库,常规 LLM 上下文不够用
- **方法**: (1) 5 类工具:file ops + code execution + memory + meta-cognitive;(2) 5 阶段 prompt:MEMORY CHECK → PLANNING → EXECUTION → VERIFICATION → COMPLETION;(3) HeadTailCompaction 15K token 预算;(4) LLMCompletionCheckHook 防止过早停止;(5) 5 种配置对比实验
- **结论**: 上下文工程(压缩+钩子)决定 agent 能否处理长任务
- **结果**: 实验数据(表 15.1):无压缩 50 次调用只读 16 文件 → 质量 6.0/10;HeadTail 8K 内存 50 次 14 文件 55% 重复 → 质量 4.0/10;HeadTail 15K 46 次 14 文件 46% 重复 → 质量 5.1/10;Isolation 隔离 66 次 48 个子文件 → 质量 4.5/10 → 实用规则:压缩预算 2-3x 工作集,重复 > 15% 是预算太紧
- **原文关键句**: "Tighter budgets reallocate tokens into wasted re-reads rather than saving them"

---

## 附录: 跳过/合并说明

### 跳过案例(理论锚点)

| # | 案例 | 来源 | 跳过原因 |
|---|---|---|---|
| S1 | Wooldridge《An Introduction to MultiAgent Systems》拍卖/论辩示例 | 03/04 | 纯理论教学,无生产实践 |
| S2 | Mahmoud《Multiagent Systems》微网控制仿真 | 06 | 仿真场景,非落地生产 |
| S3 | Gulli Ch5/6/7/8/9/10/11 (Tool Use / Planning / Multi-Agent / Memory / Learning / Goal / Exception) | 02 | 是模式教程而非完整案例 |
| S4 | Dibia Ch8(构建 web UI)/ Ch12(MCP 协议) / Ch11 优化 | 12 | 框架代码而非业务案例 |

### 同一案例的多次出现合并说明

| 主题 | 案例 # | 首次出现 | 复用出现 |
|---|---|---|---|
| 智能家居 | c24 | Y MCP 案例 | D(Ch12 Protocol 配套) |
| 客服 | c22, c07, c28, c13 | L(Ch12) | B(Ch4.5.1) / A(Ch1) / G(Ch9) / Y(Ch8.6) |
| 旅行规划 | c01, c20, c21 | L(Ch6) | B(Ch4-6) / G(Ch4 Reflection) |
| 代码审查 | c29, c34 | F(Hailstone 教学) | D(Ch15) |
| 营销 | c23, c32 | B(Ch4.5.2) | D(Ch14) |
| 法律 | c15, c31 | A(Ch1) | R(Ch8-10) |
| 医疗 | c14, c33 | A(Ch1) | D(Ch14) |
| 翻译 | c02, c26 | L(Ch7) | Y(Ch8.3) |
| RAG | c12, c27, c30 | G(Ch14) | Y(Ch8.4) / R(Ch7) |
| 软件工程 | c29, c34 | F | D(Ch15) |

### 跨书案例的关键观察

- **传播链**: 凌峰(中文落地)↔ Biswas(英文理论)↔ Albada(英文生产)↔ Gulli(英文模式)↔ Dibia(英文框架)↔ Fajardo(英文从零)↔ Rothman(英文领域)↔ 尹浩(中文实战)
- **失败案例**: c31 (Rothman 法律 profanity 困境) 是本次提取中**最稀缺的"真实失败"案例**,其他绝大多数都是"成功"案例
- **案例密度**: 凌峰(7 案例/直产) > 尹浩(6 案例/实战) > Albada(7 案例/简述) > Gulli(5 案例/代码) > 其余(2-4 案例)
- **反转点**: c31 的"meta-controller"是 A1 框架中"信任合规"段最有力的现实锚点
- **从零到全栈**: 仅 Fajardo 真正从零实现 BaseTool/BaseLLM/TaskHandler;其他书多为框架应用

---

## 总计

**34 个有效案例**(28-30 个独立 + 4 个理论锚点跳过),覆盖 5 类主题(客服/医疗/法律/营销/办公),9 个理论锚点全部支撑。
每个案例严格保留**作者、章节、原文关键句**,可作为 A1 段素材库直接引用。
