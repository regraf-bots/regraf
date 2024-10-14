# Getting started

## Telegram token

To use the [Telegram Bot API](https://core.telegram.org/bots/api), you first have to [get a bot account](https://core.telegram.org/bots) by [chatting with BotFather](https://core.telegram.org/bots#6-botfather).

BotFather will give you a *token*, something like `123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ`.

## Bot

A Regraf bot is an object containing an array of middlewares which are composed and executed in a stack-like manner upon request. Is similar to many other middleware systems that you may have encountered such as Koa, Ruby's Rack, Connect.

## Middleware

Middleware is an essential part of any modern framework.
It allows you to modify requests and responses as they pass between the Telegram and your bot.

You can imagine a middleware as a chain of logic connection your bot to the Telegram request.

Middleware normally takes two parameters (ctx, next), `ctx` is the context for one Telegram update, `next` is a function that is invoked to execute the downstream middleware. It returns a Promise with a then function for running code after completion.

```js
const bot = new Regraf(process.env.BOT_TOKEN)

bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time: %sms', ms)
})

bot.on('text', (ctx) => ctx.reply('Hello World'))
bot.launch()
```

### Fully supported by Regraf

- [Local powered session (via lowdb)](https://github.com/regraf-bots/session-local)
- [Pagination](https://github.com/mcpeblocker/telegraf-pagination)

### Known middleware

- [Internationalization](https://github.com/telegraf/telegraf-i18n)
- [Redis powered session](https://github.com/telegraf/telegraf-session-redis)
- [Rate-limiting](https://github.com/telegraf/telegraf-ratelimit)
- [Menus via inline keyboards](https://github.com/EdJoPaTo/telegraf-inline-menu)
- [Natural language processing via wit.ai](https://github.com/telegraf/telegraf-wit)
- [Natural language processing via recast.ai](https://github.com/telegraf/telegraf-recast)
- [Multivariate and A/B testing](https://github.com/telegraf/telegraf-experiments)
- [Powerful bot stats via Mixpanel](https://github.com/telegraf/telegraf-mixpanel)
- [statsd integration](https://github.com/telegraf/telegraf-statsd)
- [and more...](https://www.npmjs.com/search?q=telegraf-)

## Error handling

By default, Regraf will print all errors to `stderr` and rethrow error.

To perform custom error-handling logic use following snippet:

```js
const bot = new Regraf(process.env.BOT_TOKEN)
bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})
bot.start((ctx) => {
  throw new Error('Example error')
})
bot.launch()
```

## Context

A Regraf Context encapsulates telegram update.
Context is created per request and contains following props:

| Property | Description |
| --- | --- |
| ` ctx.telegram ` | Telegram client instance |
| ` ctx.updateType ` | Update type (message, inline_query, etc.) |
| `[ctx.updateSubTypes]` | Update subtypes (text, sticker, audio, etc.) |
| `[ctx.message]` | Received message |
| `[ctx.editedMessage]` | Edited message |
| `[ctx.inlineQuery]` | Received inline query |
| `[ctx.chosenInlineResult]` | Received inline query result |
| `[ctx.callbackQuery]` | Received callback query |
| `[ctx.shippingQuery]` | Shipping query |
| `[ctx.preCheckoutQuery]` | Pre-checkout query |
| `[ctx.channelPost]` | New incoming channel post of any kind — text, photo, sticker, etc. |
| `[ctx.editedChannelPost]` | New version of a channel post that is known to the bot and was edited |
| `[ctx.poll]` | New version of a anonymous poll that is known to the bot and was changed |
| `[ctx.pollAnswer]` | This object represents an answer of a user in a non-anonymous poll. |
| `[ctx.chat]` | Current chat info |
| `[ctx.from]` | Sender info |
| `[ctx.match]` | Regex match (available only for `hears`, `command`, `action`, `inlineQuery` handlers) |
| ` ctx.webhookReply ` | Shortcut to `ctx.telegram.webhookReply` |

```js
bot.use((ctx) => {
  console.log(ctx.message)
})
```

### Extending context

The recommended way to extend bot context:

```js
const bot = new Regraf(process.env.BOT_TOKEN)

bot.context.db = {
  getScores: () => { return 42 }
}

bot.on('text', (ctx) => {
  const scores = ctx.db.getScores(ctx.message.from.username)
  return ctx.reply(`${ctx.message.from.username}: ${scores}`)
})

bot.launch()
```

### Shortcuts

Context shortcuts for **message** update:

| Shortcut | Bound to |
| --- | --- |
| `addStickerToSet`         | [`telegram.addStickerToSet`](telegram.md#addstickertoset) |
| `createNewStickerSet`     | [`telegram.createNewStickerSet`](telegram.md#createnewstickerset) |
| `deleteChatPhoto`         | [`telegram.deleteChatPhoto`](telegram.md#deletechatphoto) |
| `deleteMessage`           | [`telegram.deleteMessage`](telegram.md#deletemessage) |
| `deleteStickerFromSet`    | [`telegram.deleteStickerFromSet`](telegram.md#deletestickerfromset) |
| `exportChatInviteLink`    | [`telegram.exportChatInviteLink`](telegram.md#exportchatinvitelink) |
| `forwardMessage`          | [`telegram.forwardMessage`](telegram.md#forwardmessage) |
| `getChat`                 | [`telegram.getChat`](telegram.md#getchat) |
| `getChatAdministrators`   | [`telegram.getChatAdministrators`](telegram.md#getchatadministrators) |
| `getChatMember`           | [`telegram.getChatMember`](telegram.md#getchatmember) |
| `getChatMembersCount`     | [`telegram.getChatMembersCount`](telegram.md#getchatmemberscount) |
| `getMyCommands`           | [`telegram.getMyCommands`](telegram.md#getmycommands) |
| `getStickerSet`           | [`telegram.getStickerSet`](telegram.md#getstickerset) |
| `leaveChat`               | [`telegram.leaveChat`](telegram.md#leavechat) |
| `pinChatMessage`          | [`telegram.pinChatMessage`](telegram.md#pinchatmessage) |
| `reply`                   | [`telegram.sendMessage`](telegram.md#sendmessage) |
| `replyWithAudio`          | [`telegram.sendAudio`](telegram.md#sendaudio) |
| `replyWithChatAction`     | [`telegram.sendChatAction`](telegram.md#sendchataction) |
| `replyWithDice`           | [`telegram.sendDice`](telegram.md#senddice) |
| `replyWithDocument`       | [`telegram.sendDocument`](telegram.md#senddocument) |
| `replyWithGame`           | [`telegram.sendGame`](telegram.md#sendgame) |
| `replyWithHTML`           | [`telegram.sendMessage`](telegram.md#sendmessage) |
| `replyWithInvoice`        | [`telegram.sendInvoice`](telegram.md#sendinvoice) |
| `replyWithLocation`       | [`telegram.sendLocation`](telegram.md#sendlocation) |
| `replyWithMarkdown`       | [`telegram.sendMessage`](telegram.md#sendmessage) |
| `replyWithMediaGroup`     | [`telegram.sendMediaGroup`](telegram.md#sendmediagroup) |
| `replyWithPhoto`          | [`telegram.sendPhoto`](telegram.md#sendphoto) |
| `replyWithPoll`           | [`telegram.sendPoll`](telegram.md#sendpoll) |
| `replyWithQuiz`           | [`telegram.sendQuiz`](telegram.md#sendquiz) |
| `replyWithSticker`        | [`telegram.sendSticker`](telegram.md#sendsticker) |
| `replyWithVideo`          | [`telegram.sendVideo`](telegram.md#sendvideo) |
| `replyWithVideoNote`      | [`telegram.sendVideoNote`](telegram.md#sendvideonote) |
| `replyWithVoice`          | [`telegram.sendVoice`](telegram.md#sendvoice) |
| `setChatDescription`      | [`telegram.setChatDescription`](telegram.md#setchatdescription) |
| `setChatPhoto`            | [`telegram.setChatPhoto`](telegram.md#setchatphoto) |
| `setChatTitle`            | [`telegram.setChatTitle`](telegram.md#setchattitle) |
| `setMyCommands`           | [`telegram.setMyCommands`](telegram.md#setmycommands) |
| `setPassportDataErrors`   | [`telegram.setPassportDataErrors`](telegram.md#setpassportdataerrors) |
| `setStickerPositionInSet` | [`telegram.setStickerPositionInSet`](telegram.md#setstickerpositioninset) |
| `setStickerSetThumb`      | [`telegram.setStickerSetThumb`](telegram.md#setstickersetthumb) |
| `setStickerSetThumb`      | [`telegram.setStickerSetThumb`](telegram.md#setstickersetthumb) |
| `stopPoll`                | [`telegram.stopPoll`](telegram.md#stoppoll) |
| `unpinChatMessage`        | [`telegram.unpinChatMessage`](telegram.md#unpinchatmessage) |
| `unpinAllChatMessages`    | [`telegram.unpinAllChatMessages`](telegram.md#unpinallchatmessages) |
| `uploadStickerFile`       | [`telegram.uploadStickerFile`](telegram.md#uploadstickerfile) |
| `unbanChatMember`         | [`telegram.unbanChatMember`](telegram.md#unbanchatmember) |

Context shortcuts for **callback_query** update:

| Shortcut | Bound to |
| --- | --- |
| `addStickerToSet`         | [`telegram.addStickerToSet`](telegram.md#addstickertoset) |
| `answerCbQuery`           | [`telegram.answerCbQuery`](telegram.md#answercbquery) |
| `answerGameQuery`         | [`telegram.answerGameQuery`](telegram.md#answergamequery) |
| `createNewStickerSet`     | [`telegram.createNewStickerSet`](telegram.md#createnewstickerset) |
| `deleteChatPhoto`         | [`telegram.deleteChatPhoto`](telegram.md#deletechatphoto) |
| `deleteMessage`           | [`telegram.deleteMessage`](telegram.md#deletemessage) |
| `deleteStickerFromSet`    | [`telegram.deleteStickerFromSet`](telegram.md#deletestickerfromset) |
| `editMessageCaption`      | [`telegram.editMessageCaption`](telegram.md#editmessagecaption) |
| `editMessageMedia`        | [`telegram.editMessageMedia`](telegram.md#editmessagemedia) |
| `editMessageReplyMarkup`  | [`telegram.editMessageReplyMarkup`](telegram.md#editmessagereplymarkup) |
| `editMessageText`         | [`telegram.editMessageText`](telegram.md#editmessagetext) |
| `exportChatInviteLink`    | [`telegram.exportChatInviteLink`](telegram.md#exportchatinvitelink) |
| `forwardMessage`          | [`telegram.forwardMessage`](telegram.md#forwardmessage) |
| `getChat`                 | [`telegram.getChat`](telegram.md#getchat) |
| `getChatAdministrators`   | [`telegram.getChatAdministrators`](telegram.md#getchatadministrators) |
| `getChatMember`           | [`telegram.getChatMember`](telegram.md#getchatmember) |
| `getChatMembersCount`     | [`telegram.getChatMembersCount`](telegram.md#getchatmemberscount) |
| `getStickerSet`           | [`telegram.getStickerSet`](telegram.md#getstickerset) |
| `leaveChat`               | [`telegram.leaveChat`](telegram.md#leavechat) |
| `pinChatMessage`          | [`telegram.pinChatMessage`](telegram.md#pinchatmessage) |
| `reply`                   | [`telegram.sendMessage`](telegram.md#sendmessage) |
| `replyWithAnimation`      | [`telegram.sendAnimation`](telegram.md#sendanimation) |
| `replyWithAudio`          | [`telegram.sendAudio`](telegram.md#sendaudio) |
| `replyWithChatAction`     | [`telegram.sendChatAction`](telegram.md#sendchataction) |
| `replyWithDice`           | [`telegram.sendDice`](telegram.md#senddice) |
| `replyWithDocument`       | [`telegram.sendDocument`](telegram.md#senddocument) |
| `replyWithGame`           | [`telegram.sendGame`](telegram.md#sendgame) |
| `replyWithHTML`           | [`telegram.sendMessage`](telegram.md#sendmessage) |
| `replyWithInvoice`        | [`telegram.sendInvoice`](telegram.md#sendinvoice) |
| `replyWithLocation`       | [`telegram.sendLocation`](telegram.md#sendlocation) |
| `replyWithMarkdown`       | [`telegram.sendMessage`](telegram.md#sendmessage) |
| `replyWithMediaGroup`     | [`telegram.sendMediaGroup`](telegram.md#sendmediagroup) |
| `replyWithPhoto`          | [`telegram.sendPhoto`](telegram.md#sendphoto) |
| `replyWithPoll`           | [`telegram.sendPoll`](telegram.md#sendpoll) |
| `replyWithSticker`        | [`telegram.sendSticker`](telegram.md#sendsticker) |
| `replyWithVideo`          | [`telegram.sendVideo`](telegram.md#sendvideo) |
| `replyWithVideoNote`      | [`telegram.sendVideoNote`](telegram.md#sendvideonote) |
| `replyWithVoice`          | [`telegram.sendVoice`](telegram.md#sendvoice) |
| `setChatDescription`      | [`telegram.setChatDescription`](telegram.md#setchatdescription) |
| `setChatPhoto`            | [`telegram.setChatPhoto`](telegram.md#setchatphoto) |
| `setChatTitle`            | [`telegram.setChatTitle`](telegram.md#setchattitle) |
| `setStickerPositionInSet` | [`telegram.setStickerPositionInSet`](telegram.md#setstickerpositioninset) |
| `setStickerSetThumb`      | [`telegram.setStickerSetThumb`](telegram.md#setstickersetthumb) |
| `stopPoll`                | [`telegram.stopPoll`](telegram.md#stoppoll) |
| `unpinChatMessage`        | [`telegram.unpinChatMessage`](telegram.md#unpinchatmessage) |
| `unpinAllChatMessages`    | [`telegram.unpinAllChatMessages`](telegram.md#unpinallchatmessages) |
| `uploadStickerFile`       | [`telegram.uploadStickerFile`](telegram.md#uploadstickerfile) |
| `unbanChatMember`         | [`telegram.unbanChatMember`](telegram.md#unbanchatmember) |

Context shortcuts for **inline_query** update:

| Shortcut | Bound to |
| --- | --- |
| `answerInlineQuery` | [`telegram.answerInlineQuery`](telegram.md#answerinlinequery) |

Context shortcuts for **shipping_query** update:

| Shortcut | Bound to |
| --- | --- |
| `answerShippingQuery` | [`telegram.answerShippingQuery`](telegram.md#answershippingquery) |

Context shortcuts for **pre_checkout_query** update:

| Shortcut | Bound to |
| --- | --- |
| `answerPreCheckoutQuery` | [`telegram.answerPreCheckoutQuery`](telegram.md#answerprecheckoutquery) |

#### Shortcuts usage example

```js
const bot = new Regraf(process.env.BOT_TOKEN)

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  ctx.leaveChat()
})

bot.on('text', (ctx) => {
  // Explicit usage
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  ctx.reply(`Hello ${ctx.state.role}`)
})

bot.on('callback_query', (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
  const result = []
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  ctx.answerInlineQuery(result)
})

bot.launch()
```

## State

The recommended namespace to share information between middlewares.

```js
const bot = new Regraf(process.env.BOT_TOKEN)

// Naive authorization middleware
bot.use((ctx, next) => {
  ctx.state.role = getUserRole(ctx.message)
  return next()
})

bot.on('text', (ctx) => {
  return ctx.reply(`Hello ${ctx.state.role}`)
})

bot.launch()
```

## Session

```js
const session = require('regraf/session')

const bot = new Regraf(process.env.BOT_TOKEN)
bot.use(session())
bot.on('text', (ctx) => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++
  return ctx.reply(`Message counter:${ctx.session.counter}`)
})

bot.launch()
```

**Note: For persistent sessions you can use any of [`telegraf-session-*`](https://www.npmjs.com/search?q=telegraf-session) middleware.**

**Tip: To use same session in private chat with the bot and in inline mode, use following session key resolver:**

```js
{
  getSessionKey: (ctx) => {
    if (ctx.from && ctx.chat) {
      return `${ctx.from.id}:${ctx.chat.id}`
    } else if (ctx.from && ctx.inlineQuery) {
      return `${ctx.from.id}:${ctx.from.id}`
    }
    return null
  }
}
```

## Update types

Supported update types:

- `message`
- `edited_message`
- `callback_query`
- `inline_query`
- `shipping_query`
- `pre_checkout_query`
- `chosen_inline_result`
- `channel_post`
- `edited_channel_post`

Available update sub-types:

- `text`
- `audio`
- `dice`
- `document`
- `photo`
- `sticker`
- `video`
- `voice`
- `contact`
- `location`
- `venue`
- `forward`
- `new_chat_members`
- `left_chat_member`
- `new_chat_title`
- `new_chat_photo`
- `delete_chat_photo`
- `group_chat_created`
- `migrate_to_chat_id`
- `supergroup_chat_created`
- `channel_chat_created`
- `migrate_from_chat_id`
- `pinned_message`
- `game`
- `video_note`
- `invoice`
- `successful_payment`
- `connected_website`
- `passport_data`
- `poll`
- `forum_topic_created`
- `forum_topic_closed`
- `forum_topic_reopened`

```js
// Handle message update
bot.on('message', (ctx) => {
  return ctx.reply('Hello')
})

// Handle sticker or photo update
bot.on(['sticker', 'photo'], (ctx) => {
  console.log(ctx.message)
  return ctx.reply('Cool!')
})
```

[Official Docs](https://core.telegram.org/bots/api#message)

## Webhooks

```js
require('dotenv')

const bot = new Regraf(process.env.BOT_TOKEN)

// TLS options
const tlsOptions = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: [
    // This is necessary only if the client uses a self-signed certificate.
    fs.readFileSync('client-cert.pem')
  ]
}

// Set telegram webhook
// The second argument is necessary only if the client uses a self-signed 
// certificate. Including it for a verified certificate may cause things to break.
bot.telegram.setWebhook('https://server.tld:8443/secret-path', {
  source: 'server-cert.pem'
})

// Start https webhook
bot.startWebhook('/secret-path', tlsOptions, 8443)

// Http webhook, for nginx/heroku users.
bot.startWebhook('/secret-path', null, 5000)
```

Use webhookCallback() if you want to attach regraf to existing http server

```js
require('http')
  .createServer(bot.webhookCallback('/secret-path'))
  .listen(3000)

require('https')
  .createServer(tlsOptions, bot.webhookCallback('/secret-path'))
  .listen(8443)
```

Express.js example integration

```js
const { Regraf } = require('regraf')
const express = require('express')
const expressApp = express()

const bot = new Regraf(process.env.BOT_TOKEN)
expressApp.use(bot.webhookCallback('/secret-path'))
bot.telegram.setWebhook('https://server.tld:8443/secret-path')

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
```

Fastify example integration

```js
const { Regraf } = require('regraf')
const fastifyApp = require('fastify')()

const bot = new Regraf(process.env.BOT_TOKEN)

bot.on('text', ({ reply }) => reply('Hello'))
fastifyApp.use(bot.webhookCallback('/secret-path'))
// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook('https://------.localtunnel.me/secret-path')

fastifyApp.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
```

Koa.js example integration

```js
const { Regraf } = require('regraf')
const Koa = require('koa')
const koaBody = require('koa-body')

const bot = new Regraf(process.env.BOT_TOKEN)
bot.telegram.setWebhook('https://server.tld:8443/secret-path')

const app = new Koa()
app.use(koaBody())
app.use(async (ctx, next) => {
  if (ctx.method !== 'POST' || ctx.url !== '/secret-path') {
    return next()
  }
  await bot.handleUpdate(ctx.request.body, ctx.response)
  ctx.status = 200
})
app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

## Working with files

Supported file sources:

- `Existing file_id`
- `File path`
- `Url`
- `Buffer`
- `ReadStream`

Also, you can provide an optional name of file as `filename`.

```js
bot.on('message', (ctx) => {
  // resend existing file by file_id
  ctx.replyWithSticker('123123jkbhj6b')

  // send file
  ctx.replyWithVideo({ source: '/path/to/video.mp4' })

  // send stream
  ctx.replyWithVideo({
    source: fs.createReadStream('/path/to/video.mp4')
  })

  // send buffer
  ctx.replyWithVoice({
    source: Buffer.alloc()
  })

  // send url via Telegram server
  ctx.replyWithPhoto('https://picsum.photos/200/300/')

  // pipe url content
  ctx.replyWithPhoto({
    url: 'https://picsum.photos/200/300/?random',
    filename: 'kitten.jpg'
  })
})
```

## Telegram Passport

To enable Telegram Passport support you can use [`telegram-passport`](https://www.npmjs.com/package/telegram-passport) package:

```js
const { Regraf } = require('regraf')
const TelegramPassport = require('telegram-passport')

const bot = new Regraf(process.env.BOT_TOKEN)
const passport = new TelegramPassport("PRIVATE_KEY_IN_PEM_FORMAT")

bot.on('passport_data', (ctx) => {
  const decryptedPasswordData = passport.decrypt(ctx.passportData)
  console.log(decryptedPasswordData)
  return ctx.setPassportDataErrors([
    { source: 'selfie', type: 'driver_license', file_hash: 'file-hash', message: 'Selfie photo is too low quality'}
  ])
})
```

## Regraf Modules

Regraf Modules is higher level abstraction for writing modular Telegram bots and fully compatible with Telegraf.

Module is simple js file with exported Regraf middleware:

```js
module.exports = (ctx) => ctx.reply('Hello from Regraf Module!')
```

```js
const Composer = require('Regraf/composer')

module.exports = Composer.mount(
  'sticker', 
  (ctx) => ctx.reply('Wow, sticker')
)
```

To run modules you can use `regraf` module runner, it allows you to start Regraf module easily from the command line.

```bash
npm install regraf -g
```

## Regraf CLI usage

```bash
regraf [opts] <bot-file>
  -t  Bot token [$BOT_TOKEN]
  -d  Webhook domain
  -H  Webhook host [0.0.0.0]
  -p  Webhook port [$PORT or 3000]
  -s  Stop on error
  -l  Enable logs
  -h  Show this help message
```

### Regraf Module example

Create a module with name `bot.js` and following content:

```js
const Composer = require('regraf/composer')
const PhotoURL = 'https://picsum.photos/200/300/?random'

const bot = new Composer()
bot.start((ctx) => ctx.reply('Hello there!'))
bot.help((ctx) => ctx.reply('Help message'))
bot.command('photo', (ctx) => ctx.replyWithPhoto({ url: PhotoURL }))

module.exports = bot
```

then run it:

```bash
regraf -t "bot token" bot.js
```
