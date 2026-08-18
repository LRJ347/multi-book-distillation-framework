# V-CONFLICT — 冲突裁决记录

> 依据: MBDF-FLV v1.1.7 阶段 5
> 处理: 表面冲突→统一;条件冲突→加适用条件;真冲突→保留 competing;无法裁决→降级

## 冲突 1: 单 agent vs 多 agent(条件冲突 → 加适用条件)

| 方 | 主张 | 来源 |
|---|---|---|
| 多 agent 派 | 复杂任务用多 agent 协作 | G(Ch7), B(Ch6), Y(Ch7) |
| 单 agent 派 | 简单任务单模型更优(实证) | D(Ch10), A(Ch8) |

**裁决**: 条件冲突,不强行统一。
- 适用条件: 任务复杂可分解 + 需要专业角色分工 → 多 agent;简单任务 → 单 agent
- 已写入 skill-03 agent-orchestration 的 B 段与 E 步骤 1

## 冲突 2: MCP vs 自建工具(表面冲突 → 统一)

| 方 | 主张 | 来源 |
|---|---|---|
| MCP 标准化 | MCP 是工具接入事实标准 | F(Ch5), R(Ch2), Y(Ch8) |
| 自建封装 | 单一内部函数直接封装 | G(Ch5), A(Ch4) |

**裁决**: 表面冲突——两者不矛盾:MCP 用于多系统互操作/生态需求;自建用于单一内部函数。
- 已写入 skill-07 agent-mcp-integration 的 E 步骤 2(选型标准)

## 冲突 3: 上下文管理策略(条件冲突 → 加适用条件)

| 方 | 主张 | 来源 |
|---|---|---|
| Context Engine 派 | 完整上下文架构(Planner/Executor/Tracer) | R(Ch1-6) |
| 轻量派 | 预算+压缩即可 | Y(Ch4/5), A(Ch6) |

**裁决**: 条件冲突——按系统复杂度选型:多 agent 生产系统 → Context Engine;轻量任务 → 预算+压缩。
- 已写入 skill-08 agent-context-engineering 的 E 步骤 3

## 冲突 4: 记忆实现方案(表面冲突 → 统一)

| 方 | 主张 | 来源 |
|---|---|---|
| 长上下文派 | 依赖大上下文窗口 | G(Ch8 提及) |
| 显式记忆派 | 短期/长期/向量分层存储 | G(Ch8), A(Ch6), Y(Ch5) |

**裁决**: 表面冲突——Gulli 实际主张分层记忆(长上下文只是工作空间)。统一为"上下文窗口是工作空间,持久记忆需显式存储"。
- 已写入 skill-05 agent-memory-architecture 的 I 段

## 冲突 5: workflow vs autonomous(表面冲突 → 统一)

| 方 | 主张 | 来源 |
|---|---|---|
| workflow 优先 | 确定性计算图,可恢复可观测 | D(Ch6), A(Ch5) |
| autonomous 优先 | 自主编排处理动态任务 | D(Ch7), G(Ch7) |

**裁决**: 表面冲突——Dibia 明确两者是谱系两端,按任务动态性选位。统一为谱系观点。
- 已写入 skill-03 agent-orchestration 的 I 段

## 裁决统计

- 表面冲突: 3(统一)
- 条件冲突: 2(加适用条件)
- 真冲突: 0
- 无法裁决: 0
- 全部冲突已在对应 SKILL.md 中体现
