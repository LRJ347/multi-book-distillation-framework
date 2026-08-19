import { defineTool } from '@deepseek-ai/dsh-tools';
import z from 'schemastery';
import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
export const name = "@dsh-external/dsh-minimax-vision";
export const inject = ['tools'];
export const Config = z.object({
    apiKey: z.string().default(''),
    baseUrl: z.string().default('https://api.minimaxi.com'),
    model: z.string().default('MiniMax-M3'),
});
const MIME = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
};
function mimeOf(file) {
    const ext = path.extname(file).slice(1).toLowerCase();
    return MIME[ext] ?? 'image/jpeg';
}
async function readConfigFile(file) {
    try {
        return JSON.parse(await readFile(file, 'utf8'));
    }
    catch {
        return {};
    }
}
async function resolveKey(configured) {
    if (configured)
        return { key: configured, source: '插件配置' };
    if (process.env.MINIMAX_API_KEY)
        return { key: process.env.MINIMAX_API_KEY, source: '环境变量 MINIMAX_API_KEY' };
    const studio = await readConfigFile(path.join(homedir(), '.minimax-h3-studio', 'config.json'));
    if (typeof studio.apiKey === 'string' && studio.apiKey)
        return { key: studio.apiKey, source: '~/.minimax-h3-studio/config.json' };
    const local = await readConfigFile(path.join(homedir(), '.dsh', 'minimax-vision.json'));
    if (typeof local.apiKey === 'string' && local.apiKey)
        return { key: local.apiKey, source: '~/.dsh/minimax-vision.json' };
    throw new Error('未找到 MiniMax API Key：可在插件配置里填 apiKey，或设环境变量 MINIMAX_API_KEY，或写入 ~/.minimax-h3-studio/config.json / ~/.dsh/minimax-vision.json');
}
async function toDataUrl(image) {
    if (image.startsWith('data:'))
        return image;
    let buf;
    if (/^https?:\/\//i.test(image)) {
        const res = await fetch(image);
        if (!res.ok)
            throw new Error(`下载图片失败：HTTP ${res.status} ${res.statusText}`);
        buf = Buffer.from(await res.arrayBuffer());
    }
    else {
        buf = await readFile(image);
    }
    if (buf.byteLength > 20 * 1024 * 1024)
        throw new Error(`图片超过 20MB（${(buf.byteLength / 1048576).toFixed(1)}MB），MiniMax 视觉接口不支持`);
    return `data:${mimeOf(image)};base64,${buf.toString('base64')}`;
}
export function apply(ctx, config) {
    ctx.effect(() => ctx.tools.register(defineTool({
        name: 'minimax_vision',
        description: "识别图片内容（MiniMax 视觉模型）：传本地图片路径或图片 URL，返回文字描述；可指定识别重点（如 OCR 提取文字、读图表、看 UI）",
        parameters: {
            image: { type: 'string', required: true, description: '本地图片路径（如 C:\\xx\\a.png）或 http(s) 图片 URL' },
            prompt: { type: 'string', description: '识别要求，默认：详细描述图片内容' },
            model: { type: 'string', description: '模型名，默认 MiniMax-M3（原生多模态）；可换 MiniMax-M2.7 等' },
        },
        output: {
            schema: { type: 'string' },
            render: (_args, value) => [{ type: 'text', text: String(value) }],
        },
        async execute(args) {
            const { key, source } = await resolveKey(config.apiKey ?? '');
            const baseUrl = (config.baseUrl || 'https://api.minimaxi.com').replace(/\/+$/, '');
            const model = args.model || config.model || 'MiniMax-VL-01';
            const prompt = args.prompt || '请详细描述这张图片的内容，包括画面主体、文字、布局与关键细节。';
            const dataUrl = await toDataUrl(args.image);
            const res = await fetch(`${baseUrl}/v1/text/chatcompletion_v2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify({
                    model,
                    messages: [{
                            role: 'user',
                            content: [
                                { type: 'text', text: prompt },
                                { type: 'image_url', image_url: { url: dataUrl } },
                            ],
                        }],
                    max_tokens: 2048,
                    temperature: 0.3,
                }),
            });
            const body = await res.json().catch(() => null);
            if (!res.ok) {
                const msg = body?.base_resp?.status_msg || body?.message || res.statusText;
                throw new Error(`MiniMax API 错误（HTTP ${res.status}）：${msg}`);
            }
            const br = body?.base_resp;
            if (br && br.status_code !== 0) {
                throw new Error(`MiniMax API 错误：${br.status_msg || br.status_code}（模型 ${model}；如提示模型不存在，可换 MiniMax-M3）`);
            }
            const content = body?.choices?.[0]?.message?.content;
            if (typeof content !== 'string' || !content) {
                throw new Error(`MiniMax 返回了空结果（模型 ${model}）`);
            }
            return `${content}\n\n（Key 来源：${source}｜模型：${model}）`;
        },
    })), '@dsh-external/dsh-minimax-vision: minimax_vision tool');
}
//# sourceMappingURL=index.js.map