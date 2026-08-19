# 故障排查:Profile Bundle 缺少 dsh.bundle 字段

> 事件日期: 2026-08-18 | 影响: DSH 启动崩溃 → 插件被回退剔除 → skill catalog 清空
> 本文件沉淀完整的排查/修复/预防流程,供未来自动诊断复用。

## 1. 错误现象(Symptom)

启动 DSH Web 时,进程崩溃并抛出:

```
Error: dsh: profile bundle "@dsh-external/dsh-agent-skills" declares no dsh.bundle in its package.json
    at loadProfile (packages/boot/app-boot/src/profile.ts:393:13)
```

**连带症状**: 启动回退把问题包从 bundles 剔除 → 插件未装配 → 依赖它的能力全部消失
(本案例中: dev_* 工具消失、skill catalog 变空)。

## 2. 根本原因(Root Cause)

DSH 启动时读取 profile 配置(`~/.dsh/profiles/<profile>/package.json`)的
`dsh.profile.bundles` 数组,对每个包读取其 package.json 的 **`dsh.bundle`** 字段
(指向插件入口)。触发条件:

- 包在 bundles 数组中
- 包 package.json **缺 `dsh` 对象或 `dsh.bundle` 字段**
- 入口文件(lib/index.js)不存在或链接断裂

## 3. 诊断检查清单

```bash
# ① 提取报错包名(从启动日志)
# ② 检查 profile 配置
cat ~/.dsh/profiles/web/package.json | grep -A5 bundles
# ③ 检查包状态
cat <plugin>/package.json | grep dsh          # 是否有 dsh.bundle?
ls <plugin>/lib/index.js                       # 入口是否存在?
ls -la ~/.dsh/profiles/web/node_modules/<plugin>  # junction 是否健康?
```

## 4. 修复步骤

### 4.1 修复插件本身(根治,优先)

给插件 package.json 添加:

```json
{
  "name": "@dsh-external/your-plugin",
  "main": "./lib/index.js",
  "dsh": {
    "bundle": "./lib/index.js"
  }
}
```

重建: `bash scripts/build.sh`(确保 lib/ 生成)。确认 junction 指向源目录。

### 4.2 修复装配路径

两种装配路径,任选其一(推荐 registry 注入路径,不经过 bundles 启动校验):

```bash
# 路径 A: 注入器 registry(推荐——启动 autoRestore 会自动恢复)
# 编辑 ~/.dsh/super-injector/registry.json,添加:
{ "dir": "C:\\path\\to\\plugin", "name": "@dsh-external/plugin", "at": "<ISO时间>" }

# 路径 B: profile bundles(需 dsh.bundle 完好)
# 编辑 ~/.dsh/profiles/web/package.json 的 dependencies + dsh.profile.bundles
# + 建 node_modules junction
```

### 4.3 应急(无法立即修复)

从 bundles 移除问题包,保留官方核心包,先让 Harness 启动;随后按 4.1 修复插件。

## 5. 验证

```bash
# 重启后检查:
# ① 插件装配
dev_plugin_status            # 应看到插件 [active]
# ② skill catalog(若插件注册 skill)
# ③ 无启动错误
```

## 6. 预防措施(插件开发规范)

1. **`dsh.bundle` 是 DSH 插件的"身份证"** — 自定义插件必须包含
2. 用 `dsh plugin add` / super-injector 装配(自动校验 manifest),避免手改 bundles
3. 手改 package.json 后必须自查:`dsh.bundle` 存在 + 入口文件存在 + junction 健康
4. 修复优先级:**补 dsh.bundle 修复插件本身**,而非删除配置
5. 装配后立即验证(dev_plugin_status + 能力 smoke test),不要等重启后才发现

## 7. 本案例时间线(供参考)

| 时间 | 事件 |
|---|---|
| 装配期 | 两个插件(dsh-agent-skills / dsh-distill-framework)用 dev_install_package 加入 bundles,package.json **缺 dsh.bundle** |
| 启动期 | DSH 启动校验失败 → 报错 → 回退从 bundles 剔除两插件 |
| 影响 | dev_* 工具消失、skill catalog 空、17 个 skill 不可见 |
| 排查 | 对照报错定位包名 → 检查 package.json 确认缺 dsh.bundle → 检查 junction/lib 健康 |
| 修复 | ① 两插件补 dsh.bundle ② distill-framework 加入 registry ③ bundles 保持干净 |
| 验证 | 重启后 autoRestore 按 registry 重新注入 → skill 恢复 |

## 8. 自动修复逻辑(供 AI/工具复用)

```
遇到启动报错 "declares no dsh.bundle":
1. 提取包名
2. 检查 package.json:
   - 缺 dsh.bundle → 注入 { "dsh": { "bundle": "./lib/index.js" } }
   - 入口缺失 → 运行构建
3. junction 断裂 → 重建(指向源目录)
4. 加入注入器 registry(双保险)
5. 提示重启 → autoRestore 恢复
```
