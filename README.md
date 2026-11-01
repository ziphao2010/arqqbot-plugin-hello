# arqqbot-plugin-hello

ArQQbot 社区插件示例：在群聊或单聊中收到 `ping` 时，被动回复配置的文本（默认 `pong`）。

## 功能

- 监听 `qq/message`，只处理 c2c / group 消息
- 仅当消息内容（忽略大小写与首尾空白）为 `ping` 时回复
- 回复使用原消息 ID 作为被动回复凭据
- 可配置回复文本，默认 `pong`

## 在 ArQQbot 中安装

1. 打开桌面应用的“插件市场”
2. 索引使用默认地址，或确认包含本插件
3. 找到“Ping 回复插件”，点击安装
4. 重启对应实例
5. 在实例的“插件”页手动启用，按需修改回复内容

向机器人发送 `ping`，收到 `pong` 即表示插件链路正常。

## 本地构建

```bash
pnpm install
pnpm typecheck
pnpm build
```

`dist/index.js` 已提交到仓库。ArQQbot 安装外部插件时不会执行构建，因此发布前必须确保默认分支包含 `dist/`。

## 插件声明

```json
{
  "arqqbot": {
    "id": "hello",
    "displayName": "Ping 回复插件",
    "schema": {
      "type": "object",
      "properties": {
        "reply": { "type": "string", "default": "pong" }
      }
    },
    "defaultConfig": { "reply": "pong" }
  }
}
```

GitHub topic：`arqqbot-plugin`。插件规范见 <https://github.com/ziphao2010/ArQQbot/blob/main/docs/plugin-spec.md>。

## 安全说明

- 只发送被动回复，不主动推送消息
- 不读取或记录 AppSecret、token、用户隐私
- 运行在 ArQQbot 实例 Worker 中，拥有 Worker 的 Node.js 权限

## 许可证

[MIT](LICENSE)
