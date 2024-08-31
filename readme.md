[![Bot API Version](https://img.shields.io/badge/Bot%20API-v6.0-f36caf.svg?style=flat-square)](https://core.telegram.org/bots/api)
[![NPM Version](https://img.shields.io/npm/v/regraf.svg?style=flat-square)](https://www.npmjs.com/package/regraf)
[![node](https://img.shields.io/node/v/regraf.svg?style=flat-square)](https://www.npmjs.com/package/regraf)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![Community Chat](https://img.shields.io/badge/Community-Chat-blueChat?style=flat-square&logo=telegram)](https://t.me/TelegrafJSChat)

## Introduction

Bots are special [Telegram](https://telegram.org) accounts designed to handle messages automatically. Users can interact with bots by sending them command messages in private or group chats. These accounts serve as an interface for code running somewhere on your server.

Regraf is a continuation of the Telegraf@3.

### Features

- Full [Telegram Bot API 6.4](https://core.telegram.org/bots/api) support
- [Telegram Payment Platform](https://telegram.org/blog/payments)
- [HTML5 Games](https://core.telegram.org/bots/api#games)
- [Inline mode](https://core.telegram.org/bots/api#inline-mode)
- Incredibly fast
- [Vercel](https://vercel.com)/[Firebase](https://firebase.google.com/products/functions/)/[Glitch](https://dashing-light.glitch.me)/[Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)/[AWS **λ**](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)/Whatever ready
- `http/https/fastify/Connect.js/express.js` compatible webhooks
- Easy to extend
- `TypeScript` typings

### Installation

```bash
npm install regraf
```

or using `yarn`:

```bash
yarn add regraf
```

### Documentation

Regraf developer docs in development.

### Examples
  
```js
const { Regraf } = require('regraf')

const bot = new Regraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()
```

```js
const { Regraf } = require('regraf')

const bot = new Regraf(process.env.BOT_TOKEN)
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Regraf.reply('λ'))
bot.launch()
```

There's some cool [examples too](docs/examples/).
