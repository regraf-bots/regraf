# Stage

Simple scene-based control flow middleware.

```js
const { Regraf } = require('regraf')
const session = require('regraf/session')
const Stage = require('regraf/stage')
const Scene = require('regraf/scenes/base')
const { leave } = Stage

// Greeter scene
const greeter = new Scene('greeter')
greeter.enter((ctx) => ctx.reply('Hi'))
greeter.leave((ctx) => ctx.reply('Bye'))
greeter.hears(/hi/gi, leave())
greeter.on('message', (ctx) => ctx.reply('Send `hi`'))

// Create scene manager
const stage = new Stage()
stage.command('cancel', leave())

// Scene registration
stage.register(greeter)

const bot = new Regraf(process.env.BOT_TOKEN)
bot.use(session())
bot.use(stage.middleware())
bot.command('greeter', (ctx) => ctx.scene.enter('greeter'))
bot.startPolling()
```

Scenes related context props and functions:

```js
bot.on('message', (ctx) => {
  ctx.scene.state                                    // Current scene state (persistent)
  ctx.scene.enter(sceneId, [defaultState, silent])   // Enter scene
  ctx.scene.reenter()                                // Reenter current scene
  ctx.scene.leave()                                  // Leave scene
})
```
