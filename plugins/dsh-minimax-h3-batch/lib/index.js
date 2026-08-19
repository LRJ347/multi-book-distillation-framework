import { defineTool } from '@deepseek-ai/dsh-tools';
import z from 'schemastery';
export const name = "@dsh-external/dsh-minimax-h3-batch";
export const inject = ['tools'];
export const Config = z.object({
    greeting: z.string().default('你好'),
});
export function apply(ctx, config) {
    // 工具注册（ctx.effect：fiber dispose 自动注销）
    ctx.effect(() => ctx.tools.register(defineTool({
        name: '_dsh_external_dsh_minimax_h3_batch_hello',
        description: "MiniMax H3 批量口播视频生成流水线：批量导入图片+提示词 → 自动分镜 → 按顺序调用官方 API 生成 → 按顺序批量导出",
        parameters: {
            name: { type: 'string', required: true, description: '谁' },
        },
        output: {
            schema: { type: 'string' },
            render: (_args, value) => [{ type: 'text', text: String(value) }],
        },
        async execute(args) {
            return config.greeting + '，' + args.name + '！';
        },
    })), '@dsh-external/dsh-minimax-h3-batch: hello tool');
    // ── 高性能引导：首轮锚定（工具面 ≥5 个或 description 总量大时启用）──────────
    // 机制：system-prompt/assemble 是 Waterfall（必须 await next() 再裁剪）；
    // 会话无任何持久化 tool/call 前，只保留本插件最核心的工具；首个工具调用落地后
    // 恢复全部。阶段从持久 session events 推导，resume/reload 不丢状态。
    // 启用步骤：① inject 数组加 'systemPrompt'；② 把下方 MINE 换成你的工具名集合；
    // ③ 把 '<核心工具>' 换成首轮要保留的那个工具名。
    // ctx.on('system-prompt/assemble', async (_assembly: unknown, context: any, next: () => Promise<any>) => {
    //   const assembled = await next()
    //   const agent = context.agent
    //   if (!agent || agent.session.events.some((e: any) => e.type === 'tool/call')) return assembled
    //   const MINE = new Set(['_dsh_external_dsh_minimax_h3_batch_hello'])
    //   const CORE = '<核心工具>'
    //   return { ...assembled, tools: assembled.tools.filter((t: any) => !MINE.has(t.name) || t.name === CORE) }
    // })
}
//# sourceMappingURL=index.js.map