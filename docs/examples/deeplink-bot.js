// https://core.telegram.org/bots#deep-linking
const Regraf = require('regraf')

const bot = new Regraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Deep link payload: ${ctx.startPayload}`))
bot.launch()
