import type { Context } from 'cordis'
import type { QQMessage } from './plugin-types'

export interface Config {
  reply: string
}

export const name = 'hello'
export const inject = ['qq']

export function apply(ctx: Context, config: Config): void {
  ctx.on('qq/message', async (message: QQMessage) => {
    if (message.scene !== 'group' && message.scene !== 'c2c') return
    if (message.content.trim().toLowerCase() !== 'ping') return

    const targetId = message.scene === 'group' ? message.groupId : message.userId
    if (!targetId) return

    try {
      await ctx.qq.send({
        scene: message.scene,
        targetId,
        content: config.reply,
        msgId: message.id
      })
    } catch (error) {
      ctx.logger(name).warn('Ping 插件发送失败', error)
    }
  })
}
