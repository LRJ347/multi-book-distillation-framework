#!/usr/bin/env bash
# 构建 dsh-distill-framework: tsc 编译 src → lib
set -euo pipefail

DSH_CHECKOUT="${DSH_CHECKOUT:-C:/Users/李仁君/deepseek-harness}"

if [ ! -d "node_modules" ]; then
  mkdir -p node_modules
fi

for dep in cordis schemastery; do
  if [ ! -e "node_modules/$dep" ] && [ -d "$DSH_CHECKOUT/node_modules/$dep" ]; then
    ln -sfn "$DSH_CHECKOUT/node_modules/$dep" "node_modules/$dep"
    echo "linked $dep"
  fi
done

if [ ! -e "node_modules/@types/node" ] && [ -d "$DSH_CHECKOUT/node_modules/@types/node" ]; then
  mkdir -p node_modules/@types
  ln -sfn "$DSH_CHECKOUT/node_modules/@types/node" "node_modules/@types/node"
  echo "linked @types/node"
fi

npx tsc -p tsconfig.json
echo "build ok: lib/"
