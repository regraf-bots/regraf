const replicators = require('./core/replicators')
const ApiClient = require('./core/network/client')

class Telegram extends ApiClient {
  getMe () {
    return this.callApi('getMe')
  }

  getFile (fileId) {
    return this.callApi('getFile', { file_id: fileId })
  }

  getFileLink (fileId) {
    return Promise.resolve(fileId)
      .then((fileId) => {
        if (fileId && fileId.file_path) {
          return fileId
        }
        const id = fileId && fileId.file_id ? fileId.file_id : fileId
        return this.getFile(id)
      })
      .then((file) => `${this.options.apiRoot}/file/bot${this.token}/${file.file_path}`)
  }

  getUpdates (timeout, limit, offset, allowedUpdates) {
    const url = `getUpdates?offset=${offset}&limit=${limit}&timeout=${timeout}`
    return this.callApi(url, {
      allowed_updates: allowedUpdates
    })
  }

  getWebhookInfo () {
    return this.callApi('getWebhookInfo')
  }

  getGameHighScores (userId, inlineMessageId, chatId, messageId) {
    return this.callApi('getGameHighScores', {
      user_id: userId,
      inline_message_id: inlineMessageId,
      chat_id: chatId,
      message_id: messageId
    })
  }

  setGameScore (userId, score, inlineMessageId, chatId, messageId, editMessage = true, force) {
    return this.callApi('setGameScore', {
      force,
      score,
      user_id: userId,
      inline_message_id: inlineMessageId,
      chat_id: chatId,
      message_id: messageId,
      disable_edit_message: !editMessage
    })
  }

  setWebhook (url, extra) {
    return this.callApi('setWebhook', { url, ...extra })
  }

  deleteWebhook (extra) {
    return this.callApi('deleteWebhook', extra)
  }

  sendMessage (chatId, text, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendMessage', { chat_id: chatId, text, ...extra })
  }

  forwardMessage (chatId, fromChatId, messageId, extra) {
    return this.callApi('forwardMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    })
  }

  forwardMessages (chatId, fromChatId, messageIds, extra) {
    return this.callApi('forwardMessages', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_ids: messageIds,
      ...extra
    })
  }

  sendChatAction (chatId, action, messageThreadId = undefined) {
    return this.callApi('sendChatAction', { chat_id: chatId, action, message_thread_id: messageThreadId })
  }

  setMessageReaction (chatId, messageId, reaction, isBig) {
    return this.callApi('setMessageReaction', { chat_id: chatId, message_id: messageId, reaction, is_big: isBig })
  }

  getUserProfilePhotos (userId, offset, limit) {
    return this.callApi('getUserProfilePhotos', { user_id: userId, offset, limit })
  }

  sendLocation (chatId, latitude, longitude, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendLocation', { chat_id: chatId, latitude, longitude, ...extra })
  }

  sendVenue (chatId, latitude, longitude, title, address, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendVenue', {
      latitude,
      longitude,
      title,
      address,
      chat_id: chatId,
      ...extra
    })
  }

  sendInvoice (chatId, invoice, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendInvoice', { chat_id: chatId, ...invoice, ...extra })
  }

  sendContact (chatId, phoneNumber, firstName, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendContact', { chat_id: chatId, phone_number: phoneNumber, first_name: firstName, ...extra })
  }

  sendPhoto (chatId, photo, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendPhoto', { chat_id: chatId, photo, ...extra })
  }

  sendDice (chatId, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendDice', { chat_id: chatId, ...extra })
  }

  sendDocument (chatId, document, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendDocument', { chat_id: chatId, document, ...extra })
  }

  sendAudio (chatId, audio, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendAudio', { chat_id: chatId, audio, ...extra })
  }

  sendSticker (chatId, sticker, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendSticker', { chat_id: chatId, sticker, ...extra })
  }

  sendVideo (chatId, video, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendVideo', { chat_id: chatId, video, ...extra })
  }

  sendAnimation (chatId, animation, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendAnimation', { chat_id: chatId, animation, ...extra })
  }

  sendVideoNote (chatId, videoNote, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendVideoNote', { chat_id: chatId, video_note: videoNote, ...extra })
  }

  sendVoice (chatId, voice, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendVoice', { chat_id: chatId, voice, ...extra })
  }

  sendGame (chatId, gameName, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendGame', { chat_id: chatId, game_short_name: gameName, ...extra })
  }

  sendMediaGroup (chatId, media, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendMediaGroup', { chat_id: chatId, media, ...extra })
  }

  sendPoll (chatId, question, options, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendPoll', { chat_id: chatId, type: 'regular', question, options, ...extra })
  }

  sendQuiz (chatId, question, options, extra) {
    if (extra?.reply_parameters && extra?.reply_parameters?.message_id == null) {
      delete extra.reply_parameters
    }
    return this.callApi('sendPoll', { chat_id: chatId, type: 'quiz', question, options, ...extra })
  }

  stopPoll (chatId, messageId, extra) {
    return this.callApi('stopPoll', { chat_id: chatId, message_id: messageId, ...extra })
  }

  getChat (chatId) {
    return this.callApi('getChat', { chat_id: chatId })
  }

  getChatAdministrators (chatId) {
    return this.callApi('getChatAdministrators', { chat_id: chatId })
  }

  getChatMember (chatId, userId) {
    return this.callApi('getChatMember', { chat_id: chatId, user_id: userId })
  }

  getChatMembersCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  getChatMemberCount (chatId) {
    return this.callApi('getChatMemberCount', { chat_id: chatId })
  }

  answerInlineQuery (inlineQueryId, results, extra) {
    return this.callApi('answerInlineQuery', { inline_query_id: inlineQueryId, results, ...extra })
  }

  setChatPermissions (chatId, permissions, useIndependentChatPermissions) {
    return this.callApi('setChatPermissions', { chat_id: chatId, permissions, use_independent_chat_permissions: useIndependentChatPermissions })
  }

  banChatMember (chatId, userId, extra) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  kickChatMember (chatId, userId, untilDate) {
    return this.callApi('banChatMember', { chat_id: chatId, user_id: userId, until_date: untilDate })
  }

  promoteChatMember (chatId, userId, extra) {
    return this.callApi('promoteChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  restrictChatMember (chatId, userId, extra) {
    return this.callApi('restrictChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  setChatAdministratorCustomTitle (chatId, userId, title) {
    return this.callApi('setChatAdministratorCustomTitle', { chat_id: chatId, user_id: userId, custom_title: title })
  }

  banChatSenderChat (chatId, senderChatId) {
    return this.callApi('banChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  unbanChatSenderChat (chatId, senderChatId) {
    return this.callApi('unbanChatSenderChat', { chat_id: chatId, sender_chat_id: senderChatId })
  }

  exportChatInviteLink (chatId) {
    return this.callApi('exportChatInviteLink', { chat_id: chatId })
  }

  setChatPhoto (chatId, photo) {
    return this.callApi('setChatPhoto', { chat_id: chatId, photo })
  }

  deleteChatPhoto (chatId) {
    return this.callApi('deleteChatPhoto', { chat_id: chatId })
  }

  setChatTitle (chatId, title) {
    return this.callApi('setChatTitle', { chat_id: chatId, title })
  }

  setChatDescription (chatId, description) {
    return this.callApi('setChatDescription', { chat_id: chatId, description })
  }

  pinChatMessage (chatId, messageId, extra) {
    return this.callApi('pinChatMessage', { chat_id: chatId, message_id: messageId, ...extra })
  }

  unpinChatMessage (chatId, extra) {
    return this.callApi('unpinChatMessage', { chat_id: chatId, ...extra })
  }

  unpinAllChatMessages (chatId) {
    return this.callApi('unpinAllChatMessages', { chat_id: chatId })
  }

  leaveChat (chatId) {
    return this.callApi('leaveChat', { chat_id: chatId })
  }

  unbanChatMember (chatId, userId, extra) {
    return this.callApi('unbanChatMember', { chat_id: chatId, user_id: userId, ...extra })
  }

  answerCbQuery (callbackQueryId, text, showAlert, extra) {
    return this.callApi('answerCallbackQuery', {
      text,
      show_alert: showAlert,
      callback_query_id: callbackQueryId,
      ...extra
    })
  }

  getUserChatBoosts (chatId, userId) {
    return this.callApi('getUserChatBoosts', { chat_id: chatId, user_id: userId })
  }

  answerGameQuery (callbackQueryId, url) {
    return this.callApi('answerCallbackQuery', {
      url,
      callback_query_id: callbackQueryId
    })
  }

  answerShippingQuery (shippingQueryId, ok, shippingOptions, errorMessage) {
    return this.callApi('answerShippingQuery', {
      ok,
      shipping_query_id: shippingQueryId,
      shipping_options: shippingOptions,
      error_message: errorMessage
    })
  }

  answerPreCheckoutQuery (preCheckoutQueryId, ok, errorMessage) {
    return this.callApi('answerPreCheckoutQuery', {
      ok,
      pre_checkout_query_id: preCheckoutQueryId,
      error_message: errorMessage
    })
  }

  editMessageText (chatId, messageId, inlineMessageId, text, extra) {
    return this.callApi('editMessageText', {
      text,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra
    })
  }

  editMessageCaption (chatId, messageId, inlineMessageId, caption, extra = {}) {
    return this.callApi('editMessageCaption', {
      caption,
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      ...extra.parse_mode && { parse_mode: extra.parse_mode },
      ...extra.caption_entities && { caption_entities: extra.caption_entities },
      reply_markup: extra.parse_mode || extra.reply_markup ? extra.reply_markup : extra
    })
  }

  editMessageMedia (chatId, messageId, inlineMessageId, media, extra = {}) {
    return this.callApi('editMessageMedia', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      media: {
        ...media,
        parse_mode: extra.parse_mode,
        caption: extra.caption,
        caption_entities: extra.caption_entities
      },
      reply_markup: extra.reply_markup ? extra.reply_markup : extra
    })
  }

  editMessageReplyMarkup (chatId, messageId, inlineMessageId, markup) {
    return this.callApi('editMessageReplyMarkup', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      reply_markup: markup
    })
  }

  editMessageLiveLocation (chatId, messageId, inlineMessageId, latitude, longitude, extra) {
    return this.callApi('editMessageLiveLocation', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      latitude,
      longitude,
      ...extra
    })
  }

  stopMessageLiveLocation (chatId, messageId, inlineMessageId, markup) {
    return this.callApi('stopMessageLiveLocation', {
      chat_id: chatId,
      message_id: messageId,
      inline_message_id: inlineMessageId,
      reply_markup: markup
    })
  }

  deleteMessage (chatId, messageId) {
    return this.callApi('deleteMessage', {
      chat_id: chatId,
      message_id: messageId
    })
  }

  deleteMessages (chatId, messageIds) {
    return this.callApi('deleteMessages', {
      chat_id: chatId,
      message_ids: messageIds
    })
  }

  setChatStickerSet (chatId, setName) {
    return this.callApi('setChatStickerSet', {
      chat_id: chatId,
      sticker_set_name: setName
    })
  }

  deleteChatStickerSet (chatId) {
    return this.callApi('deleteChatStickerSet', { chat_id: chatId })
  }

  getForumTopicIconStickers () {
    return this.callApi('getForumTopicIconStickers')
  }

  createForumTopic (chatId, name, extra) {
    return this.callApi('createForumTopic', { chat_id: chatId, name, ...extra })
  }

  editForumTopic (chatId, messageThreadId, name, iconCustomEmojiId) {
    return this.callApi('editForumTopic', { chat_id: chatId, message_thread_id: messageThreadId, name, icon_custom_emoji_id: iconCustomEmojiId })
  }

  closeForumTopic (chatId, messageThreadId) {
    return this.callApi('closeForumTopic', { chat_id: chatId, message_thread_id: messageThreadId })
  }

  reopenForumTopic (chatId, messageThreadId) {
    return this.callApi('reopenForumTopic', { chat_id: chatId, message_thread_id: messageThreadId })
  }

  deleteForumTopic (chatId, messageThreadId) {
    return this.callApi('deleteForumTopic', { chat_id: chatId, message_thread_id: messageThreadId })
  }

  unpinAllForumTopicMessages (chatId, messageThreadId) {
    return this.callApi('unpinAllForumTopicMessages', { chat_id: chatId, message_thread_id: messageThreadId })
  }

  editGeneralForumTopic (chatId, name) {
    return this.callApi('editGeneralForumTopic', { chat_id: chatId, name })
  }

  closeGeneralForumTopic (chatId) {
    return this.callApi('closeGeneralForumTopic', { chat_id: chatId })
  }

  reopenGeneralForumTopic (chatId) {
    return this.callApi('reopenGeneralForumTopic', { chat_id: chatId })
  }

  hideGeneralForumTopic (chatId) {
    return this.callApi('hideGeneralForumTopic', { chat_id: chatId })
  }

  unhideGeneralForumTopic (chatId) {
    return this.callApi('unhideGeneralForumTopic', { chat_id: chatId })
  }

  unpinAllGeneralForumTopicMessages (chatId) {
    return this.callApi('unpinAllGeneralForumTopicMessages', { chat_id: chatId })
  }

  getStickerSet (name) {
    return this.callApi('getStickerSet', { name })
  }

  getCustomEmojiStickers (customEmojiIds) {
    return this.callApi('getCustomEmojiStickers', { custom_emoji_ids: customEmojiIds })
  }

  uploadStickerFile (ownerId, sticker, stickerFormat) {
    return this.callApi('uploadStickerFile', {
      user_id: ownerId,
      sticker,
      sticker_format: stickerFormat
    })
  }

  createNewStickerSet (ownerId, name, title, stickers, stickerType = 'regular', needsRepainting = false) {
    return this.callApi('createNewStickerSet', {
      name,
      title,
      user_id: ownerId,
      stickers: stickers,
      sticker_type: stickerType,
      needs_repainting: needsRepainting
    })
  }

  addStickerToSet (ownerId, name, sticker) {
    return this.callApi('addStickerToSet', {
      name,
      user_id: ownerId,
      sticker
    })
  }

  setStickerPositionInSet (sticker, position) {
    return this.callApi('setStickerPositionInSet', {
      sticker,
      position
    })
  }

  deleteStickerFromSet (sticker) {
    return this.callApi('deleteStickerFromSet', { sticker })
  }

  replaceStickerInSet (userId, name, oldSticker, sticker) {
    return this.callApi('replaceStickerInSet', { user_id: userId, name, old_sticker: oldSticker, new_sticker: sticker })
  }

  setStickerEmojiList (sticker, emojiList) {
    return this.callApi('setStickerEmojiList', { sticker, emoji_list: emojiList })
  }

  setStickerKeywords (sticker, keywords) {
    return this.callApi('setStickerKeywords', { sticker, keywords })
  }

  setStickerMaskPosition (sticker, maskPosition) {
    return this.callApi('setStickerMaskPosition', { sticker, mask_position: maskPosition })
  }

  setStickerSetTitle (name, title) {
    return this.callApi('setStickerSetTitle', { name, title })
  }

  setStickerSetThumbnail (name, userId, format, thumbnail) {
    return this.callApi('setStickerSetThumbnail', { name, user_id: userId, format, thumbnail })
  }

  setCustomEmojiStickerSetThumbnail (name, customEmojiId) {
    return this.callApi('setCustomEmojiStickerSetThumbnail', { name, custom_emoji_id: customEmojiId })
  }

  deleteStickerSet (name) {
    return this.callApi('deleteStickerSet', { name })
  }

  getMyCommands (extra) {
    return this.callApi('getMyCommands', extra)
  }

  setMyName (name, languageCode) {
    return this.callApi('setMyCommands', { name, language_code: languageCode })
  }

  getMyName (languageCode) {
    return this.callApi('getMyCommands', { language_code: languageCode })
  }

  setMyDescription (description, languageCode) {
    return this.callApi('setMyCommands', { description, language_code: languageCode })
  }

  getMyDescription (languageCode) {
    return this.callApi('getMyCommands', { language_code: languageCode })
  }

  setMyShortDescription (shortDescription, languageCode) {
    return this.callApi('setMyCommands', { short_description: shortDescription, language_code: languageCode })
  }

  getMyShortDescription (languageCode) {
    return this.callApi('getMyCommands', { language_code: languageCode })
  }

  setMyCommands (commands, extra) {
    return this.callApi('setMyCommands', { commands, ...extra })
  }

  deleteMyCommands (extra) {
    return this.callApi('deleteMyCommands', extra)
  }

  setPassportDataErrors (userId, errors) {
    return this.callApi('setPassportDataErrors', {
      user_id: userId,
      errors: errors
    })
  }

  sendCopy (chatId, message, extra) {
    if (!message) {
      throw new Error('Message is required')
    }
    if (message.chat && message.chat.id && message.message_id) {
      return this.copyMessage(chatId, message.chat.id, message.message_id, extra)
    }
    const type = Object.keys(replicators.copyMethods).find((type) => message[type])
    if (!type) {
      throw new Error('Unsupported message type')
    }
    const opts = {
      chat_id: chatId,
      ...replicators[type](message),
      ...extra
    }
    return this.callApi(replicators.copyMethods[type], opts)
  }

  copyMessage (chatId, fromChatId, messageId, extra) {
    return this.callApi('copyMessage', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...extra
    })
  }

  copyMessages (chatId, fromChatId, messageIds, extra) {
    return this.callApi('copyMessages', {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_ids: messageIds,
      ...extra
    })
  }

  createChatInviteLink (chatId, name, extra) {
    return this.callApi('createChatInviteLink', {
      chat_id: chatId,
      name: name,
      ...extra
    })
  }

  editChatInviteLink (chatId, inviteLink, extra) {
    return this.callApi('editChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink,
      ...extra
    })
  }

  revokeChatInviteLink (chatId, inviteLink) {
    return this.callApi('revokeChatInviteLink', {
      chat_id: chatId,
      invite_link: inviteLink
    })
  }

  approveChatJoinRequest (chatId, userId) {
    return this.callApi('approveChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }

  declineChatJoinRequest (chatId, userId) {
    return this.callApi('declineChatJoinRequest', {
      chat_id: chatId,
      user_id: userId
    })
  }

  setChatMenuButton (chatId, menuButton) {
    return this.callApi('setChatMenuButton', {
      chat_id: chatId,
      menu_button: menuButton
    })
  }

  getChatMenuButton (chatId) {
    return this.callApi('getChatMenuButton', {
      chat_id: chatId
    })
  }

  setMyDefaultAdministratorRights (rights, forChannels) {
    return this.callApi('setMyDefaultAdministratorRights', {
      rights: rights,
      for_channels: forChannels
    })
  }

  getMyDefaultAdministratorRights (forChannels) {
    return this.callApi('getMyDefaultAdministratorRights', {
      for_channels: forChannels
    })
  }
}

module.exports = Telegram
