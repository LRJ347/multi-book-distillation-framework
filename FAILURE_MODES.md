# FAILURE_MODES — 已知失败模式目录

> 用途: 每个阶段的已知失败模式,作为审计参考。新人/Agent 调用本框架时主动避开这些坑。

## DISCOVER 阶段

### DM-1: 候选聚类过度细分
- 症状: 同一概念被分成多个 cluster
- 检测: 相似度 > 阈值但归在不同 cluster
- 修复: 合并

### DM-2: 候选聚类过度聚合
- 症状: 不同概念被混在一起
- 检测: cluster 内条目核心差异过大
- 修复: 拆分

### DM-3: 漏掉核心议题
- 症状: 只看了 1 本书的目录就声称完成领域扫描
- 检测: 议题覆盖度 < N 本书的并集
- 修复: 补充扫描未读的书

## DISTILL 阶段

### DM-4: Calibration Warning(诊断信号,不是失败)
- 触发: 通过率 >80%(标准可能过松)或 <5%(标准可能过严)
- 处理: 记录到 Evidence Ledger 的 calibration_notes,不阻塞流程;不同领域知识密度差异巨大,不自动判失败

### DM-5: V-CONFLICT 未触发
- 症状: 多本书明显冲突但被强行统一
- 修复: 重走 V-CONFLICT

### DM-6: I 段写成书摘
- 症状: "本章作者说了 X" 的抄书风格
- 检测: I 段与 R 段相似度 >70%
- 修复: 重写

### DM-7: A2 trigger 过宽
- 症状: "用户需要决策时"这类宽泛 trigger
- 检测: trigger 无具体语言信号
- 修复: 给出"用户说'xxx'时"的明确信号

### DM-8: E 段无可执行步骤
- 症状: "保持客观"这类哲学话而非动作
- 检测: 每步无完成标准
- 修复: 改为可判断的动作

### DM-9: B 段缺失或敷衍
- 症状: B 段空白或只有一句话
- 检测: 无具体反场景
- 修复: 补入反场景和相邻 skill 区分

## VERIFY 阶段

### DM-10: V-REAL 未找到真实作品
- 症状: 用合成数据替代真实案例
- 修复: 找真实案例(数据来源五级中 real 优先)

### DM-11: V-NEG 反例太简单
- 症状: 反例过于明显,任何 skill 都能识别
- 修复: 构造更有挑战性反例(obvious/moderate/boundary/adversarial 分布)

### DM-12: V-E2E 用合成数据
- 症状: 输入无明确出处
- 修复: 用真实输入

### DM-13: 路由指标不达标
- 指标: routing_accuracy / FP / FN 未达阈值(n 达标)
- 修复: 回阶段 5 调整相邻 skill 边界

### DM-14: Evidence Ledger 漏填证据类型
- 症状: 只有书名,无 framework/case/counter-example 标注
- 修复: 补全

### DM-15: Skill Card 缺 decision_question
- 症状: decision_question 空泛
- 修复: 重写为具体到核心领域

### DM-16: V4 压缩损失漏检
- 症状: 蒸馏后丢失原书条件/例外/限定词
- 修复: 补 semantic_invariants

### DM-17: semantic_invariants 未保留
- 触发: 任一 invariant 被删除或扭曲
- 后果: V4 FAIL

### DM-18: V2 baseline 对照失败
- 触发: skill 组答案 ≈ 常识基线组(无显著差异)
- 后果: 判为"常识包装",回 DISTILL

## 审计用法

- 每次蒸馏项目结束后,对照本目录检查
- 命中任何 DM → 记录修复动作
- 新发现的失败模式 → 追加到本目录(框架自身可演化)
