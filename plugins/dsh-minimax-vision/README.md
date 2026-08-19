# @dsh-external/dsh-minimax-vision

MiniMax 视觉理解：把本地图片/URL 交给 MiniMax-VL-01 识别，返回文字描述

由 dsh-super-injector dev_scaffold_plugin 生成。

## 构建与注入

```bash
DSH_CHECKOUT=<checkout> bash scripts/build.sh
# 注入器环境内：dev_inject_plugin <本目录>
```

## ⚠️ DSH 插件规范(dsh.bundle 必填)

> 2026-08-18 体检发现本插件与 dsh-agent-skills / dsh-distill-framework 同批
> 缺失 `dsh.bundle`(走注入路径不校验,但进 bundles 会崩溃)。已补:
> `"dsh": { "bundle": "./lib/index.js" }`。详见
> `plugins/TROUBLESHOOTING_BUNDLE_MISSING_DSH_BUNDLE.md`。
