/**
 * dsh-distill-framework — 把 MBDF-FLV 蒸馏方法论注册为 DSH runtime skill。
 *
 * 注册:
 * 1. `mbdf-flv` skill — 完整蒸馏方法论(三循环: DISCOVER → DISTILL → VERIFY)
 * 2. `distill_books` 工具 — 发起一次多书蒸馏(代理给 mbdf-flv skill 的快捷入口)
 *
 * 方法论源: D:\1\Desktop\skill\方法论_蒸馏框架\(SKILL.md + EVALUATION_PROTOCOL + methodology/ + templates/)
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export const name = 'dsh-distill-framework'
export const inject = ['skills']

/** 方法论框架根目录(探测候选) */
const FRAMEWORK_ROOTS = [
  process.env.DSH_DISTILL_FRAMEWORK_DIR ?? '',
  'D:\\1\\Desktop\\skill\\方法论_蒸馏框架',
  join(process.env.USERPROFILE ?? '', 'Desktop', 'skill', '方法论_蒸馏框架'),
].filter(Boolean)

function findFrameworkRoot(): string {
  for (const root of FRAMEWORK_ROOTS) {
    try {
      if (existsSync(join(root, 'SKILL.md'))) return root
    } catch {
      /* try next */
    }
  }
  return FRAMEWORK_ROOTS[0] ?? ''
}

/** 读取方法论 SKILL.md 并附加资源索引 */
function buildSkillContent(root: string): string {
  const skillFile = join(root, 'SKILL.md')
  const base = readFileSync(skillFile, 'utf8')

  // 在内容末尾附加配套资源清单(供 agent 按需读取)
  const resources = [
    'EVALUATION_PROTOCOL.md',
    'AUTHOR_WEIGHT.md',
    'FAILURE_MODES.md',
    'CONFLICT_RULES.md',
    'methodology/00-overview.md',
    'extractors/framework-extractor.md',
    'templates/SKILL.md.template',
    'validation/BLIND_VALIDATION_RECORD.md',
  ]
    .filter((rel) => existsSync(join(root, rel)))
    .map((rel) => `- \`${rel}\``)
    .join('\n')

  return `${base}

---

## 配套资源(按需读取,均位于 ${root})

${resources}

> 提示: 执行蒸馏时,先读 SKILL.md 的流程;阶段 0 完成后读 methodology/ 对应阶段;
> 验证阶段严格以 EVALUATION_PROTOCOL.md 为唯一阈值权威(SSOT)。
`
}

export function apply(ctx: any) {
  const disposers: Array<() => void> = []
  const root = findFrameworkRoot()

  if (root) {
    try {
      const content = buildSkillContent(root)
      const dispose = ctx.skills.register({
        name: 'mbdf-flv',
        description:
          '把一组同领域的经典书(N 本,N≥3)蒸馏成可被 Agent 调用的 skill 工具包。触发: 用户说"把 X 领域的 N 本书蒸馏成 skill"/"用多书融合方法蒸馏"/"多书融合拆书"等。不适用: 单本书(用 cangjie-skill)、纯文学、读后感、作者人设。',
        whenToUse: 'User wants to distill multiple books on the same domain into executable agent skills.',
        content,
        source: 'dsh-distill-framework',
      })
      disposers.push(dispose)
      ctx.logger.info(`dsh-distill-framework: registered mbdf-flv skill from ${root}`)
    } catch (e) {
      ctx.logger.warn(`dsh-distill-framework: failed to register mbdf-flv: ${(e as Error).message}`)
    }
  } else {
    ctx.logger.warn('dsh-distill-framework: framework root not found; mbdf-flv skill not registered')
  }

  return () => {
    for (const dispose of disposers) dispose()
  }
}
