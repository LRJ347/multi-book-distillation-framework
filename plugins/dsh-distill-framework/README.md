# dsh-distill-framework — MBDF-FLV 蒸馏方法论插件

> 把 MBDF-FLV v1.1.7 蒸馏方法论注册为 DeepSeek Harness runtime skill,让 agent 原生具备多书融合蒸馏能力。

## 功能

注册 `mbdf-flv` skill,内容为完整蒸馏方法论:

- **三循环架构**: DISCOVER(领域扫描/多书提取/候选聚类)→ DISTILL(三重筛选/RIA++构造/冲突裁决)→ VERIFY(四层验证/Evidence Ledger/压力测试)
- **质量红线**: 9 条(四层验证+V4 门/独立证据链≥2/SSOT 阈值等)
- **状态机**: VERIFIED / CONDITIONAL / REJECTED / INVALID
- **配套资源索引**: 加载时附加 methodology/、extractors/、templates/、EVALUATION_PROTOCOL.md 等路径,agent 按需读取

## 安装

```bash
# 1. 构建(需要 DSH checkout 提供 tsc)
DSH_CHECKOUT=C:/path/to/deepseek-harness bash scripts/build.sh

# 2. 用 dsh-super-injector 装配(dev_install_package 等效)
# 或手动: 在 profile package.json 的 bundles 加 @dsh-external/dsh-distill-framework
```

## 方法论源位置

插件从以下路径(按序探测)读取 `SKILL.md` 与配套资源:

1. `$DSH_DISTILL_FRAMEWORK_DIR` 环境变量
2. `D:\1\Desktop\skill\方法论_蒸馏框架`(默认开发机路径)
3. `~/.dsh/Desktop/skill/方法论_蒸馏框架`

## 使用

装配后,agent 的 skill 目录出现 `mbdf-flv`。用户说"把 X 领域的 N 本书蒸馏成 skill"即可触发:

1. 加载 mbdf-flv → 按三循环执行
2. 阶段 0 产出 DOMAIN_OVERVIEW → 用户确认
3. 5 extractor 并行提取 → 三重筛选 → RIA++ 构造 → 四层验证 → 交付

## ⚠️ DSH 插件规范(dsh.bundle 必填)

> 故障教训(2026-08-18): 与本仓库 dsh-agent-skills 同批事故——package.json 缺
> `dsh.bundle` 导致 DSH 启动崩溃、插件被回退剔除、skill catalog 清空。
> 修复后已沉淀为规范(详见 dsh-agent-skills/README.md 同节)。

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
- 缺失 → 启动报错(`declares no dsh.bundle`)→ 插件被回退剔除
- 修复优先级:**补 dsh.bundle 修复插件本身**,而非删除 bundles 配置

## 卸载

```bash
dev_uninject_plugin dsh-distill-framework
```

## 验证状态

**Protocol CLOSED** — 评估协议 v1.1.7 经 4 轮盲态验证(16 隐藏案例 × 8 独立评估员 × 128 判定点),两独立评估员同一输入产生相同裁决。详见 `validation/BLIND_VALIDATION_RECORD.md`。

## License

MIT
