const Regraf = require('regraf')
const Extra = require('regraf/extra')
const Markup = require('regraf/markup')

const keyboard = Markup.inlineKeyboard([
  Markup.loginButton('Login', 'http://domain.tld/hash', {
    bot_username: 'my_bot',
    request_write_access: 'true'
  }),
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])

const bot = new Regraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Hello', Extra.markup(keyboard)))
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.launch()
