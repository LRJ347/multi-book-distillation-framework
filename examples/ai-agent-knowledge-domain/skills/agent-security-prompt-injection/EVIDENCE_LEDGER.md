# Evidence Ledger — agent-security-prompt-injection

> 版本: v1.0.0 | 蒸馏日期: 2026-08-18 | 来源书数: 4(独立来源 4)

## 核心命题
P1: 提示注入与数据投毒是 LLM agent 特有威胁,必须做指令-数据隔离 + 输入净化
P2: 防御是持续对抗(非一次性解决),需监控新攻击向量 + Rule of Two 权限限制

## Provenance Trace
| 来源 | 作者 | author_role | 章节 | 证据类型 | L0-L4 | evidence_strength |
|---|---|---|---|---|---|---|
| Rothman《Context Engineering for Multi-Agent Systems》 | Denis Rothman | practitioner | Ch7 | framework+case | L4 | high |
| 比斯瓦斯《构建 Agentic AI 系统》 | Anjanava Biswas | practitioner | Ch9 | framework | L4 | high |
| Dibia《Designing Multi-Agent Systems》 | Victor Dibia | integrator(微软) | Ch13 | framework | L4 | high |
| Gulli《Agentic Design Patterns》 | Antonio Gulli | practitioner | Ch18 | framework | L3 | medium |

## 独立证据链
- 链 1: Rothman — Context Engineering 视角,input sanitization + 高保真 RAG 案例(NASA 研究助手)
- 链 2: Dibia — 微软 multi-agent 视角威胁模型 + Rule of Two
- 链 3: 比斯瓦斯 — Agentic AI 系统视角对抗攻击/隐私
- 传播链: Gulli — 设计模式视角(21 模式外新增安全防护章节)

## 支持 / 冲突
- 支持: 4 书一致支持"提示注入是 LLM agent 头号威胁,需多层防御"
- 冲突: 无显著冲突;防御深度有差异属程度差异非方向冲突;Rothman 偏 context engineering,Dibia 偏 jailbreak/Rule of Two,比斯瓦斯偏对抗/隐私,Gulli 偏模式,角度互补

## 适用条件 / 反例
- 适用: agent 处理外部输入(网页/文档/用户上传);RAG 检索内容;越狱/对抗攻击防护
- 不适用: 完全可信受控输入(B 段反场景 1);无外部内容进入
- 反例: 指令数据混合拼接(x14);投毒误导检索(x04);越权(x06);防御过度影响功能(作者警告)
- 与相邻 skill 边界: 与 agent-guardrails——注入防御是护栏输入闸(净化输入),guardrails 在工具调用层做规则拦截,二者串联;与 agent-rag——检索内容治理(来源标注/可信度);与 agent-mcp-integration——MCP 工具输入净化

## 验证结果(阶段 6 待填)
- V-REF: ⏳ / V-REAL: ⏳ / V-NEG: ⏳ / V-E2E: ⏳ / V4: ⏳

## 最终状态
⏳ CONDITIONAL(待四层验证;语义不变量已锁定 4 条;来源书数 4,覆盖最充分的一档)