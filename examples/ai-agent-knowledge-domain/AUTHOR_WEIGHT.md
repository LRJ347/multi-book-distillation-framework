# AUTHOR_WEIGHT — AI Agent 知识域(11 本书)

> 作者角色(先验)≠ 证据强度(后验)。本表只标注知识谱系位置,不表示正确性。

## 书源映射

| # | 文件 | 作者 | 书名 | 语言 | 格式 |
|---|---|---|---|---|---|
| 01 | 凌峰 | 凌峰 | AI Agent 开发与应用:基于大模型的智能体构建 | 中文 | docx |
| 02 | Gulli | Antonio Gulli | Agentic Design Patterns: A Hands-On Guide | 英文 | docx |
| 03+04 | Wooldridge | Michael Wooldridge | An Introduction to MultiAgent Systems (2nd ed, 上下卷) | 英文 | docx |
| 05 | Albada | Michael Albada | Building Applications with AI Agents | 英文 | docx |
| 06 | Mahmoud | Magdi S. Mahmoud | Multiagent Systems: Introduction and Coordination Control | 英文 | docx |
| 07 | Biswas | Anjanava Biswas | 构建 Agentic AI 系统 | 中文(译) | docx |
| 08 | 尹浩 | 尹浩 | AI Agent 应用开发:构建多智能体协同系统 | 中文 | mobi |
| 10 | Fajardo | Val Andrei Fajardo | Build a Multi-Agent System (from Scratch) (MEAP) | 英文 | epub |
| 11 | Rothman | Denis Rothman | Context Engineering for Multi-Agent Systems | 英文 | epub |
| 12 | Dibia | Victor Dibia | Designing Multi-Agent Systems | 英文 | epub |

## 作者角色(先验)

| 作者 | author_role | provenance_role | 依据 |
|---|---|---|---|
| Wooldridge | founder | originator | 多智能体系统教科书经典(2nd ed),领域奠基性教材 |
| Mahmoud | integrator | synthesizer | 学术综述型教材,系统化整理协调控制理论 |
| Dibia | integrator | synthesizer | 微软研究者,模式/原则的系统化 |
| Gulli | practitioner | field_experience | 工程实践导向(Google 背景),设计模式实战 |
| Albada | practitioner | field_experience | 应用构建实战 |
| Rothman | practitioner | field_experience | 上下文工程专门化实践 |
| Fajardo | practitioner | field_experience | 从零构建实战(MEAP 早期) |
| 凌峰 | practitioner | field_experience | 中文工程实践书 |
| 尹浩 | practitioner | field_experience | 中文多智能体协同实践 |
| 比斯瓦斯 | practitioner | field_experience | 构建 Agentic AI 系统实践 |

## 独立来源注意

- 03+04 为同一本书(Wooldridge)上下卷 → **只算 1 个独立来源**
- 实际独立作者数: 10

## evidence_hierarchy(AI Agent 领域建议)

```
1. primary_research(原始论文/系统实证: AgentBench/SWE-bench 等基准)
2. production_postmortem(生产系统失败复盘)
3. practitioner_consensus(本书单 3+ 本独立书共识)
4. textbook_authority(教科书: Wooldridge/Mahmoud)
5. popular_article(普及文章/博客)
```

## 待补充(蒸馏中更新)

- [ ] 各候选 evidence_strength(后验)在筛选阶段填入
- [ ] V-CONFLICT 触发记录
