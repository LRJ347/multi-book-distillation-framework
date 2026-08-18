#!/usr/bin/env bash
# 构建 dsh-agent-skills: tsc 编译 src → lib
set -euo pipefail

DSH_CHECKOUT="${DSH_CHECKOUT:-C:/Users/李仁君/deepseek-harness}"

# 解析依赖: 从 DSH checkout 链接 cordis 类型
if [ -d "node_modules" ]; then
  echo "node_modules 已存在"
else
  mkdir -p node_modules
fi

# 链接必要的类型依赖
for dep in cordis schemastery; do
  if [ ! -e "node_modules/$dep" ] && [ -d "$DSH_CHECKOUT/node_modules/$dep" ]; then
    ln -sfn "$DSH_CHECKOUT/node_modules/$dep" "node_modules/$dep"
    echo "linked $dep"
  fi
done

npx tsc -p tsconfig.json
echo "build ok: lib/"
