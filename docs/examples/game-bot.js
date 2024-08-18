const Regraf = require('regraf')
const Extra = require('regraf/extra')
const Markup = require('regraf/markup')

const gameShortName = 'your-game'
const gameUrl = 'https://your-game.tld'

const markup = Extra.markup(
  Markup.inlineKeyboard([
    Markup.gameButton('🎮 Play now!'),
    Markup.urlButton('Telegraf help', 'http://telegraf.js.org')
  ])
)

const bot = new Regraf(process.env.BOT_TOKEN)
bot.start(({ replyWithGame }) => replyWithGame(gameShortName))
bot.command('foo', ({ replyWithGame }) => replyWithGame(gameShortName, markup))
bot.gameQuery(({ answerGameQuery }) => answerGameQuery(gameUrl))
bot.launch()
