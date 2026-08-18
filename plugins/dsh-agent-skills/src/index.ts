/**
 * dsh-agent-skills — 把 AI Agent 知识域蒸馏的 16 个 skill 注册为 DSH runtime skills。
 *
 * 背景: skill-filesystem 的发现依赖宿主 watch 事件,新装目录可能在当前会话
 * 不被发现。本插件通过 ctx.skills.register() 直接注册 runtime skill,
 * 立即生效,不依赖文件系统发现。
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const name = 'dsh-agent-skills'
export const inject = ['skills']

export function apply(ctx: any) {
  // skill 源目录(16 个 skill 各含 SKILL.md)
  // 优先 DSH_AGENT_SKILL_DIR 环境变量,否则按已知位置探测
  const SKILL_ROOT =
    process.env.DSH_AGENT_SKILL_DIR ??
    pickExisting([
      join(process.cwd(), '.dsh', 'skills'),
      join(process.env.INIT_CWD ?? '', '.dsh', 'skills'),
      join(requireOs().homedir(), '.dsh', 'skills'),
      'C:\\deepseek harness\\.dsh\\skills',
    ])

  const disposers: Array<() => void> = []

  try {
    const entries = readdirSync(SKILL_ROOT, { withFileTypes: true })
    let registered = 0
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const skillFile = join(SKILL_ROOT, entry.name, 'SKILL.md')
      const content = readFileSync(skillFile, 'utf8')

      // 解析 YAML frontmatter
      const m = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
      if (!m) continue
      const fm = m[1]
      const body = m[2].trim()

      const nameMatch = fm.match(/^name:\s*(.+)$/m)
      const descMatch = fm.match(/^description:\s*\|?\s*\n?([\s\S]*?)(?=^[a-z_]+:|$)/m)
      if (!nameMatch) continue
      const skillName = nameMatch[1].trim()
      const description = descMatch
        ? descMatch[1].trim().replace(/\n\s+/g, ' ').slice(0, 500)
        : `AI Agent 蒸馏 skill: ${skillName}`

      try {
        const dispose = ctx.skills.register({
          name: skillName,
          description,
          whenToUse: `Use when the user's task matches: ${skillName}`,
          content: content,
          source: 'dsh-agent-skills',
        })
        disposers.push(dispose)
        registered++
      } catch (e) {
        ctx.logger.warn(`dsh-agent-skills: failed to register ${skillName}: ${(e as Error).message}`)
      }
    }
    ctx.logger.info(`dsh-agent-skills: registered ${registered} skills from ${SKILL_ROOT}`)
  } catch (e) {
    ctx.logger.warn(`dsh-agent-skills: cannot read ${SKILL_ROOT}: ${(e as Error).message}`)
  }

  return () => {
    for (const dispose of disposers) dispose()
  }
}

function requireOs() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return { homedir: () => process.env.USERPROFILE ?? process.env.HOME ?? '' }
}

function pickExisting(paths: string[]): string {
  for (const p of paths) {
    try {
      readdirSync(p)
      return p
    } catch {
      /* try next */
    }
  }
  return paths[0]
}
