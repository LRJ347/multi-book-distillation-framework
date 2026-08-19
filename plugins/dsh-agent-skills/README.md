# dsh-agent-skills — AI Agent 知识域 skill 插件

> 把 MBDF-FLV 蒸馏的 16 个 AI Agent 设计 skill 注册为 DeepSeek Harness runtime skills。

## 功能

通过 `ctx.skills.register()` 直接注册 16 个 skill,不依赖 skill-filesystem 的文件系统发现(避免新装目录在会话中不被发现的问题):

- **核心循环**: agent-react-loop / agent-reflection-loop / agent-planning / agent-failure-recovery
- **能力**: agent-tool-use / agent-mcp-integration
- **上下文**: agent-memory-architecture / agent-context-engineering / agent-rag
- **协作**: agent-orchestration / agent-multi-agent-theory / agent-ux-design
- **治理**: agent-evaluation / agent-guardrails / agent-human-in-the-loop / agent-security-prompt-injection

每个 skill 注册时携带完整 SKILL.md 内容(Skill Card + RIA++ 六段 + semantic_invariants),加载后立即可用。

## 安装

```bash
# 1. 构建(需要 DSH checkout 提供 tsc)
DSH_CHECKOUT=C:/path/to/deepseek-harness bash scripts/build.sh

# 2. 用 dsh-super-injector 装配(dev_install_package 等效)
# 或手动: 在 profile package.json 的 bundles 加 @dsh-external/dsh-agent-skills
```

## skill 源位置

插件从以下路径(按序探测)读取 16 个 skill 的 SKILL.md:

1. `$DSH_AGENT_SKILL_DIR` 环境变量
2. `$cwd/.dsh/skills`
3. `$INIT_CWD/.dsh/skills`
4. `~/.dsh/skills`
5. `C:\deepseek harness\.dsh\skills`(默认开发机路径)

任意位置有完整 16 个 skill 目录即可。更新 skill 内容后执行 `dev_reload_package dsh-agent-skills` 热刷新。

## ⚠️ DSH 插件规范(dsh.bundle 必填)

> 故障教训(2026-08-18): 插件曾因 package.json 缺失 `dsh.bundle` 导致 DSH 启动崩溃
> (`declares no dsh.bundle in its package.json`),启动回退自动将其从 bundles 剔除,
> 所有 skill 从 catalog 消失。修复: 补上 `dsh.bundle` 后重启 autoRestore 恢复。

**规则**: 任何要加入 profile bundles 的自定义插件,package.json **必须**包含:

```json
{
  "name": "@dsh-external/your-plugin",
  "main": "./lib/index.js",
  "dsh": {
    "bundle": "./lib/index.js"
  }
}
```

- `dsh.bundle` 指向插件入口(通常与 `main` 相同)
- 缺失 → 启动报错 → 插件被回退剔除 → 依赖它的能力全部消失
- 修复优先级:**补 dsh.bundle 修复插件本身**,而非删除 bundles 配置
- 用 `dsh plugin add` / super-injector 装配会自动校验;手改 package.json 时务必自查

## 卸载

```bash
dev_uninject_plugin dsh-agent-skills
```

## 来源

由 [MBDF-FLV](https://github.com/LRJ347/multi-book-distillation-framework) 蒸馏 AI Agent 知识域产出
(11 本 AI Agent 书籍 → 16 skill),完整蒸馏产物见仓库 `examples/ai-agent-knowledge-domain/`。

## License

BSD-3-Clause
