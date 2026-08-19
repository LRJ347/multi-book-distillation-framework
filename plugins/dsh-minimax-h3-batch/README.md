# @dsh-external/dsh-minimax-h3-batch

MiniMax H3 批量口播视频生成流水线：批量导入图片+提示词 → 自动分镜 → 按顺序调用官方 API 生成 → 按顺序批量导出

由 dsh-super-injector dev_scaffold_plugin 生成。

## ⚠️ 状态: 骨架(Skeleton)

> 本插件目前是 **scaffold 骨架**——代码仅为模板示例(hello 工具),
> **H3 批量视频流水线功能尚未实现**。已补 `dsh.bundle` 并纳入 registry,
> 但装配后只有占位工具,无实际视频生成能力。

**待实现**:
- [ ] MiniMax H3 API 接入(批量图片+提示词 → 分镜 → 生成 → 导出)
- [ ] 流水线编排(顺序调用 + 进度)
- [ ] 工具 schema(输入/输出)
- [ ] 实现后更新 description 与实际功能一致

## 构建与注入

```bash
DSH_CHECKOUT=<checkout> bash scripts/build.sh
# 注入器环境内：dev_inject_plugin <本目录>
```

## ⚠️ DSH 插件规范(dsh.bundle 必填)

package.json 已含 `"dsh": { "bundle": "./lib/index.js" }`(必须,否则进 bundles 会崩溃)。
详见 `plugins/TROUBLESHOOTING_BUNDLE_MISSING_DSH_BUNDLE.md`。
