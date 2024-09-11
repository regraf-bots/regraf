/** @format */

import * as tt from './telegram-types'

import { Telegram } from './telegram'
import { BotDescription, BotName, BotShortDescription } from '@grammyjs/types'

export declare class RegrafContext {
  tg: Telegram
  update: tt.Update
  updateType: tt.UpdateType
  updateSubTypes: tt.MessageSubTypes[]
  botInfo?: tt.User
  match?: RegExpExecArray | null
  me?: string
  telegram: Telegram
  message?: tt.Message
  editedMessage?: tt.Message
  inlineQuery?: tt.InlineQuery
  shippingQuery?: tt.ShippingQuery
  preCheckoutQuery?: tt.PreCheckoutQuery
  chosenInlineResult?: tt.ChosenInlineResult
  channelPost?: tt.Message
  editedChannelPost?: tt.Message
  callbackQuery?: tt.CallbackQuery
  poll?: tt.Poll
  pollAnswer?: tt.PollAnswer
  chat?: tt.Chat
  from?: tt.User
  inlineMessageId?: string
  passportData?: tt.PassportData
  state: object
  webhookReply: boolean
  chatJoinRequest?: tt.ChatJoinRequest
  senderChat?: tt.Chat
  usersShared?: tt.UsersShared
  chatShared?: tt.ChatShared
  story?: tt.Story
  chatMember?: tt.ChatMemberUpdated
  myChatMember?: tt.ChatMemberUpdated
  messageReaction?: tt.MessageReactionUpdated
  messageReactionCount?: tt.MessageReactionCountUpdated
  chatBoost?: tt.ChatBoostUpdated
  chatBoostRemoved?: tt.ChatBoostRemoved
  giveaway?: tt.Giveaway
  giveawayCreated?: tt.GiveawayCreated
  giveawayWinners?: tt.GiveawayWinners
  giveawayCompleted?: tt.GiveawayCompleted
  boostAdded?: tt.ChatBoostAdded

  constructor(
    update: tt.Update,
    telegram: Telegram,
    options?: {
      username?: string,
      channelMode?: boolean
    }
  )

  /**
   * Use this method to add a new sticker to a set created by the bot
   * @param name Sticker set name
   * @param sticker Sticker object
   * @returns Returns True on success.
   */
  addStickerToSet(
    name: string,
    sticker: tt.InputSticker
  ): Promise<boolean>

  /**
   * Use this method to create new sticker set owned by a user. The bot will be able to edit the created sticker set
   * @param name Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only english letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in “_by_<bot username>”. <bot_username> is case insensitive. 1-64 characters.
   * @param title Sticker set title, 1-64 characters
   * @param stickers Sticker object array
   * @param sticker_type Type of stickers in the set, pass “regular”, “mask”, or “custom_emoji”. By default, a regular sticker set is created.
   * @param needs_repainting Pass True if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only
   * @returns True on success.
   */
  createNewStickerSet(
    name: string,
    title: string,
    stickers: tt.InputSticker[],
    sticker_type?: "regular" | "mask" | "custom_emoji",
    needs_repainting?: boolean
  ): Promise<boolean>

  /**
   * Use this method to delete a sticker from a set created by the bot.
   * @param sticker File identifier of the sticker
   * @returns Returns True on success
   */
  deleteStickerFromSet(sticker: string): Promise<boolean>

  /**
   * Use this method to replace an existing sticker in a sticker set with a new one.
   *  The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet.
   * @param name Sticker set name
   * @param oldSticker File identifier of the replaced sticker
   * @param sticker A JSON-serialized object with information about the added sticker.
   *  If exactly the same sticker had already been added to the set, then the set remains unchanged.
   * @returns True on success.
   */
  replaceStickerInSet(name: string, oldSticker: string, sticker: tt.InputSticker): Promise<boolean>

  /**
   * Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot.
   * @param sticker File identifier of the sticker
   * @param emojiList A JSON-serialized list of 1-20 emoji associated with the sticker
   * @returns True on success.
   */
  setStickerEmojiList(sticker: string, emojiList: string[]): Promise<boolean>

  /**
   * Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot.
   * @param sticker File identifier of the sticker
   * @param keywords A JSON-serialized list of 0-20 search keywords for the sticker with total length of up to 64 characters
   * @returns True on success.
   */
  setStickerKeywords(sticker: string, keywords: string[]): Promise<boolean>

  /**
   * Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot.
   * @param sticker File identifier of the sticker
   * @param maskPosition A JSON-serialized object with the position where the mask should be placed on faces. Omit the parameter to remove the mask position.
   * @returns True on success.
   */
  setStickerMaskPosition(sticker: string, maskPosition: tt.MaskPosition): Promise<boolean>

  /**
   * Use this method to set the title of a created sticker set.
   * @param name Sticker set name
   * @param title New sticker set title, 1-64 characters
   * @returns True on success.
   */
  setStickerSetTitle(name: string, title: string): Promise<boolean>

  /**
   * Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set.
   * @param name Sticker set name
   * @param userId User identifier of the sticker set owner
   * @param format A .WEBP or .PNG image with the thumbnail, must be up to 128 kilobytes in size and have a width and height of exactly 100px,
   *  or a .TGS animation with a thumbnail up to 32 kilobytes in size (see https://core.telegram.org/stickers#animation-requirements for animated sticker technical requirements),
   *  or a WEBM video with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#video-requirements for video sticker technical requirements.
   *  Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet,
   *  or upload a new one using multipart/form-data. More information on Sending Files ». Animated and video sticker set thumbnails can't be uploaded via HTTP URL.
   *  If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail.
   * @param thumbnail Format of the thumbnail, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, or “video” for a WEBM video
   * @returns True on success.
   */
  setStickerSetThumbnail(name: string, userId: number, format: tt.StickerFormat, thumbnail?: tt.InputFile): Promise<boolean>

  /**
   * Use this method to set the thumbnail of a custom emoji sticker set.
   * @param name Sticker set name
   * @param customEmojiId Custom emoji identifier of a sticker from the sticker set; pass an empty string to drop the thumbnail and use the first sticker as the thumbnail.
   * @returns True on success.
   */
  setCustomEmojiStickerSetThumbnail(name: string, customEmojiId: string): Promise<boolean>

  /**
   * Use this method to delete a sticker set that was created by the bot.
   * @param name Sticker set name
   * @returns True on success.
   */
  deleteStickerSet(name: string): Promise<boolean>

  /**
   * Use this method to export an invite link to a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * @returns exported invite link as String on success.
   */
  exportChatInviteLink(): Promise<string>

  /**
   * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.)
   * @returns a Chat object on success.
   */
  getChat(): Promise<tt.Chat>

  /**
   * Use this method to get a list of administrators in a chat.
   * @returns On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
   */
  getChatAdministrators(): Promise<Array<tt.ChatMember>>

  /**
   * Use this method to get information about a member of a chat.
   * @param userId Unique identifier of the target user
   * @returns a ChatMember object on success
   */
  getChatMember(userId: number): Promise<tt.ChatMember>

  /**
   * @deprecated in favor of `getChatMemberCount`
   * @returns Number on success
   */
  getChatMembersCount(): Promise<number>

  /**
   * Use this method to get the number of members in a chat
   * @returns Number on success
   */
   getChatMemberCount(): Promise<number>

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all boolean parameters to lift restrictions from a user. Returns True on success.
   * @param userId Unique identifier of the target user
   * @param extra Additional params for restrict chat member
   * @returns True on success
   */
  restrictChatMember(
    userId: number,
    extra?: tt.ExtraRestrictChatMember
  ): Promise<boolean>

  /**
   * Use this method to get a sticker set
   * @param setName Name of the sticker set
   * @returns On success, a StickerSet object is returned.
   */
  getStickerSet(setName: string): Promise<tt.StickerSet>

  /**
   * Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects.
   * @param customEmojiIds A JSON-serialized list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified.
   */
  getCustomEmojiStickers(customEmojiIds: string[]): Promise<tt.Sticker[]>

  /**
   * Use this method to set a new group sticker set for a supergroup.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method
   * @param setName Name of the sticker set to be set as the group sticker set
   * @returns True on success.
   */
  setChatStickerSet(
    setName: string
  ): Promise<boolean>

  /**
   * Use this method to delete a group sticker set from a supergroup.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method
   * @returns True on success.
   */
  deleteChatStickerSet(): Promise<boolean>

  /**
   * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters.
   * @returns Returns an Array of Sticker objects.
   */
  getForumTopicIconStickers(): Promise<tt.Sticker[]>;

  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param name Topic name, 1-128 characters
   * @param extra Extra params
   * @returns Returns information about the created topic as a ForumTopic object.
   */
  createForumTopic(name: string, extra?: tt.ExtraCreateForumTopic): Promise<tt.ForumTopic>;

  /**
   * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @param name New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept
   * @param iconCustomEmojiId New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept
   * @returns Returns True on success.
   */
  editForumTopic(name?: string, iconCustomEmojiId?: string): Promise<boolean>;

  /**
   * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @returns Returns True on success.
   */
  closeForumTopic(): Promise<boolean>;

  /**
   * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @returns Returns True on success.
   */
  reopenForumTopic(): Promise<boolean>;

  /**
   * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights.
   * @returns Returns True on success.
   */
  deleteForumTopic(): Promise<boolean>;

  /**
   * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @returns Returns True on success.
   */
  unpinAllForumTopicMessages(): Promise<boolean>;

  /**
   * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param name New topic name, 1-128 characters
   * @returns Returns True on success.
   */
  editGeneralForumTopic(name: string): Promise<boolean>;

  /**
   * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @returns Returns True on success.
   */
  closeGeneralForumTopic(): Promise<boolean>;

  /**
   * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden.
   * @returns Returns True on success.
   */
  reopenGeneralForumTopic(): Promise<boolean>;

  /**
   * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open.
   * @returns Returns True on success.
   */
  hideGeneralForumTopic(): Promise<boolean>;

  /**
   * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @returns Returns True on success.
   */
  unhideGeneralForumTopic(): Promise<boolean>;

  /**
   * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @returns Returns True on success.
   */
  unpinAllGeneralForumTopicMessages(): Promise<boolean>;

  /**
   * Use this method for your bot to leave a group, supergroup or channel
   * @returns True on success
   */
  leaveChat(): Promise<boolean>

  /**
   * Use this method to set default chat permissions for all members.
   * The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members admin rights.
   * @param permissions New default chat permissions
   * @param useIndependentChatPermissions Pass True if chat permissions are set independently.
   *  Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions;
   *  the can_send_polls permission will imply the can_send_messages permission.
   * @returns True on success
   */
  setChatPermissions(
    permissions: tt.ChatPermissions,
    useIndependentChatPermissions?: boolean
  ): Promise<boolean>

  /**
   * Use this method to pin a message in a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param messageId Identifier of a message to pin
   * @param extra Pass `{ disable_notification: true }`, if it is not necessary to send a notification to all group members about the new pinned message
   * @returns True on success
   */
  pinChatMessage(
    messageId: number,
    extra?: { disable_notification?: boolean }
  ): Promise<boolean>

  /**
   * Use this method to unpin a message in a group, a supergroup, or a channel.
   * @returns True on success
   * @param extra Extra params
   */
  unpinChatMessage(extra?: tt.ExtraUnpinMessage): Promise<boolean>

  /**
   * Use this method to clear the list of pinned messages in a chat
   * @returns True on success
   */
  unpinAllChatMessages(): Promise<boolean>

  /**
   * Use this method to reply on messages in the same chat.
   * @param text Text of the message to be sent
   * @param extra SendMessage additional params
   * @returns sent Message if Success
   */
  reply(text: string, extra?: tt.ExtraSendMessage): Promise<tt.Message>

  /**
   * Use this method to send audio files to the same chat, if you want Telegram clients to display them in the music player.
   * Your audio must be in the .mp3 format.
   * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * @param audio Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data
   * @param extra Audio extra parameters
   * @returns On success, the sent Message is returned.
   */
  replyWithAudio(
    audio: tt.InputFile,
    extra?: tt.ExtraAudio
  ): Promise<tt.MessageAudio>

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
   * Choose one, depending on what the user is about to receive:
   * - typing for text messages,
   * - upload_photo for photos,
   * - record_video or upload_video for videos,
   * - record_audio or upload_audio for audio files,
   * - upload_document for general files,
   * - find_location for location data,
   * - record_video_note or upload_video_note for video notes.
   * @param action Type of action to broadcast.
   * @returns True on success
   */
  replyWithChatAction(action: tt.ChatAction): Promise<boolean>

  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to.
   * Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel.
   * Bots can't use paid reactions.
   * @param reaction A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message.
   * A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots.
   * @param isBig Pass True to set the reaction with a big animation
   */
  setMessageReaction(
    reaction?: tt.ReactionType,
    isBig?: boolean
  ): Promise<boolean>

  /**
   * Use this method to send general files. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   * @param document File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param extra Additional params for send document
   * @returns a Message on success
   */
  replyWithDocument(
    document: tt.InputFile,
    extra?: tt.ExtraDocument
  ): Promise<tt.MessageDocument>

  /**
   * Use this method to send a game
   * @param gameShortName Short name of the game, serves as the unique identifier for the game. Set up your games via Botfather.
   * @param extra Additional params for send game
   * @returns a Message on success
   */
  replyWithGame(
    gameShortName: string,
    extra?: tt.ExtraGame
  ): Promise<tt.MessageGame>

  /**
   * The Bot API supports basic formatting for messages
   * @param html You can use bold and italic text, as well as inline links and pre-formatted code in your bots' messages.
   * @param extra Additional params to send message
   * @returns a Message on success
   */
  replyWithHTML(html: string, extra?: tt.ExtraSendMessage): Promise<tt.Message>

  /**
   * Use this method to send invoices
   * @param invoice Object with new invoice params
   * @param extra Additional params for send invoice
   * @returns a Message on success
   */
  replyWithInvoice(
    invoice: tt.NewInvoiceParameters,
    extra?: tt.ExtraInvoice
  ): Promise<tt.MessageInvoice>

  /**
   * Use this method to send point on the map
   * @param latitude Latitude of location
   * @param longitude Longitude of location
   * @param extra Additional params for send location
   * @returns a Message on success
   */
  replyWithLocation(
    latitude: number,
    longitude: number,
    extra?: tt.ExtraLocation
  ): Promise<tt.MessageLocation>

  /**
   * Use this method to send information about a venue
   * @param latitude Latitude of location
   * @param longitude Longitude of location
   * @param title Name of the venue
   * @param address Address of the venue
   * @param extra Additional params for sendVenue
   * @returns a Message on success
   */
  replyWithVenue(
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    extra?: tt.ExtraVenue
  ): Promise<tt.MessageVenue>

  /**
   * Use this method to send phone contacts
   * @param phoneNumber Contact's phone number
   * @param firstName Contact's first name
   * @param extra Additional params for sendContact
   * @returns a Message on success
   */
  replyWithContact(
    phoneNumber: string,
    firstName: string,
    extra?: tt.ExtraContact
  ): Promise<tt.MessageContact>

  /**
   * The Bot API supports basic formatting for messages
   * @param markdown You can use bold and italic text, as well as inline links and pre-formatted code in your bots' messages.
   * @param extra Additional params to send message
   * @returns a Message on success
   */
  replyWithMarkdown(
    markdown: string,
    extra?: tt.ExtraSendMessage
  ): Promise<tt.Message>

  /**
   * The Bot API supports basic formatting for messages
   * @param markdown You can use bold and italic text, as well as inline links and pre-formatted code in your bots' messages.
   * @param extra Additional params to send message
   * @returns a Message on success
   */
  replyWithMarkdownV2(
    markdown: string,
    extra?: tt.ExtraSendMessage
  ): Promise<tt.Message>

  /**
   * Use this method to send photos
   * @param photo Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data
   * @param extra Additional params to send photo
   * @returns a Message on success
   */
  replyWithPhoto(
    photo: tt.InputFile,
    extra?: tt.ExtraPhoto
  ): Promise<tt.MessagePhoto>

  /**
   * Use this method to send a group of photos or videos as an album
   * @param media A JSON-serialized array describing photos and videos to be sent, must include 2–10 items
   * @param extra Additional params to send media group
   * @returns On success, an array of the sent Messages is returned
   */
  replyWithMediaGroup(
    media: tt.MessageMedia[],
    extra?: tt.ExtraMediaGroup
  ): Promise<Array<tt.Message>>

  /**
   * Use this method to send a native poll.
   * @param question Poll question, 1-255 characters
   * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
   * @param extra Additional params to send poll
   * @returns On success, the sent Message is returned.
   */
  replyWithPoll(
    question: string,
    options: string[],
    extra: tt.ExtraPoll
  ): Promise<tt.MessagePoll>

  /**
   * Use this method to send a native quiz.
   * @param question Poll question, 1-255 characters
   * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
   * @param extra Additional params to send quiz
   * @returns On success, the sent Message is returned.
   */
  replyWithQuiz(
    question: string,
    options: string[],
    extra: tt.ExtraQuiz
  ): Promise<tt.MessagePoll>

  /**
   * Use this method to send a native quiz.
   * @param messageId Identifier of the original message with the poll
   * @param extra Additional params to stop poll
   * @returns On success, the stopped Poll with the final results is returned.
   */
  stopPoll(messageId: number, extra: tt.ExtraStopPoll): Promise<tt.Poll>

  /**
   * Use this method to send .webp stickers
   * @param sticker Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .webp file from the Internet, or upload a new one using multipart/form-data
   * @param extra Additional params to send sticker
   * @returns a Message on success
   */
  replyWithSticker(
    sticker: tt.InputFile,
    extra?: tt.ExtraSticker
  ): Promise<tt.MessageSticker>

  /**
   * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document)
   * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   * @param video video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data
   * @param extra Additional params to send video
   * @returns a Message on success
   */
  replyWithVideo(
    video: tt.InputFile,
    extra?: tt.ExtraVideo
  ): Promise<tt.MessageVideo>

  /**
   * Use this method to send .gif animations
   * @param animation Animation to send. Pass a file_id as String to send a GIF that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a GIF from the Internet, or upload a new GIF using multipart/form-data
   * @param extra Additional params for sendAnimation
   * @returns a Message on success
   */
  replyWithAnimation(
    animation: tt.InputFile,
    extra?: tt.ExtraAnimation
  ): Promise<tt.MessageAnimation>

  /**
   * Use this method to send .gif animations
   * @param videoNote video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. Sending video notes by a URL is currently unsupported
   * @param extra Additional params for sendVideoNote
   * @returns a Message on success
   */
  replyWithVideoNote(
    videoNote: tt.InputFileVideoNote,
    extra?: tt.ExtraAnimation
  ): Promise<tt.MessageVideoNote>

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   * @param voice Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param extra Additional params to send voice
   * @returns a Message on success
   */
  replyWithVoice(
    voice: tt.InputFile,
    extra?: tt.ExtraVoice
  ): Promise<tt.MessageVoice>

  /**
   * Use this method to send a dice, which will have a random value from 1 to 6. On success, the sent Message is returned. (Yes, we're aware of the “proper” singular of die. But it's awkward, and we decided to help it change. One dice at a time!)
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param extra Additional params to send dice
   * @returns a Message on success
   */
  replyWithDice(extra?: tt.ExtraDice): Promise<tt.MessageDice>

  /**
   * Use this method to send copy of exists message.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param extra Additional params to send modified copy of message
   * @returns the MessageId of the sent message on success
   */
  copyMessage(
    chatId: number | string,
    extra?: tt.ExtraCopyMessage
  ): Promise<tt.MessageId>

  /**
   * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped.
   * Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied.
   * A quiz poll can be copied only if the value of the field correct_option_id is known to the bot.
   * The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageIds A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to copy. The identifiers must be specified in a strictly increasing order.
   * @param extra Extra params for copyMessages
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  copyMessages(
    chatId: number | string,
    messageIds: number[],
    extra?: tt.ExtraCopyMessage
  ): Promise<tt.MessageId[]>
  // ------------------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------------------ //
  // ------------------------------------------------------------------------------------------ //

  /**
   * Use this method to send answers to an inline query.
   * No more than 50 results per query are allowed.
   * @returns On success, True is returned.
   * @param results Array of results for the inline query
   * @param extra Extra optional parameters
   */
  answerInlineQuery(
    results: tt.InlineQueryResult[],
    extra?: tt.ExtraAnswerInlineQuery
  ): Promise<boolean>

  answerCbQuery(
    text?: string,
    showAlert?: boolean,
    extra?: object
  ): Promise<boolean>

  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @returns Returns a UserChatBoosts object.
   */
  getUserChatBoosts(): Promise<tt.UserChatBoosts>;

  /**
   * Use this method to send answers to game query.
   * @param url Notification text
   */
  answerGameQuery(url: string): Promise<boolean>

  /**
   * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned.
   * @param ok  Specify True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
   * @param shippingOptions Required if ok is True. A JSON-serialized array of available shipping options.
   * @param errorMessage Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user.
   */
  answerShippingQuery(
    ok: boolean,
    shippingOptions: tt.ShippingOption[],
    errorMessage: string
  ): Promise<boolean>

  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
   * @param ok  Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
   * @param errorMessage Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user.
   */
  answerPreCheckoutQuery(ok: boolean, errorMessage?: string): Promise<boolean>

  /**
   * Use this method to edit text and game messages sent by the bot or via the bot (for inline bots).
   * @returns On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   * @param text New text of the message
   * @param extra Extra params
   */
  editMessageText(
    text: string,
    extra?: tt.ExtraEditMessage
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit captions of messages sent by the bot or via the bot (for inline bots).
   * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   * @param caption New caption of the message
   * @param extra Extra params
   */
  editMessageCaption(
    caption?: string,
    extra?: tt.ExtraEditCaption
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit animation, audio, document, photo, or video messages.
   * @returns On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   * @param media New media of message
   * @param extra Extra params
   */
  editMessageMedia(
    media: tt.MessageMedia,
    extra?: tt.ExtraEditMessageMedia
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit only the reply markup of messages sent by the bot or via the bot (for inline bots).
   * @returns On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   * @param markup Markup of inline keyboard
   */
  editMessageReplyMarkup(
    markup?: tt.InlineKeyboardMarkup
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit live location messages
   * @returns On success, if the edited message was sent by the bot, the edited message is returned, otherwise True is returned.
   * @param latitude New latitude
   * @param longitude New longitude
   * @param extra Extra params
   */
  editMessageLiveLocation(
    latitude: number,
    longitude: number,
    extra?: tt.ExtraEditLocation
  ): Promise<tt.MessageLocation | boolean>

  /**
   * Use this method to stop updating a live location message before live_period expires.
   * @param extra Extra params
   * @returns On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.
   */
  stopMessageLiveLocation(
    extra?: tt.ExtraStopLiveLocation
  ): Promise<tt.MessageLocation | boolean>

  /**
   * Use this method to ban a user in a group, a supergroup or a channel.
   * @param userId Unique identifier of the target user
   * @param extra Extra params
   * @returns True on success
   */
   banChatMember(
    userId: number,
    extra?: tt.ExtraBan
  ): Promise<boolean>

  /**
   * @deprecated in favor of `banChatMember`
   * @param userId Unique identifier of the target user
   * @param untilDate Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever
   * @returns True on success
   */
  kickChatMember(userId: number, untilDate?: number): Promise<boolean>

  /**
   * Use this method to unban a user from a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param userId Unique identifier of the target user
   * @param extra Extra params
   * @returns True on success
   */
  unbanChatMember(userId: number, extra?: tt.ExtraUnban): Promise<boolean>

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user.
   * @param userId Unique identifier of the target user
   * @param extra Extra parameters for promoteChatMember
   * @returns True on success
   */
  promoteChatMember(
    userId: number,
    extra: tt.ExtraPromoteChatMember
  ): Promise<boolean>

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot
   * @param userId Unique identifier of the target user
   * @param title New custom title for the administrator; 0-16 characters, emoji are not allowed
   * @returns True on success
   */
  setChatAdministratorCustomTitle(
    userId: number,
    title: string
  ): Promise<boolean>

  /**
   * Use this method to ban a channel chat in a supergroup or a channel
   * @param senderChatId Unique identifier of the target sender chat
   * @returns True on success
   */
  banChatSenderChat(
    senderChatId: number,
  ): Promise<boolean>

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel
   * @param senderChatId Unique identifier of the target sender chat
   * @returns True on success
   */
  unbanChatSenderChat(
    senderChatId: number,
  ): Promise<boolean>

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param photo New chat photo
   * @returns True on success.
   */
  setChatPhoto(photo: tt.InputFile): Promise<boolean>

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * @returns True on success
   */
  deleteChatPhoto(): Promise<boolean>

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param title New chat title, 1-255 characters
   * @returns True on success
   */
  setChatTitle(title: string): Promise<boolean>

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param description New chat description, 0-255 characters
   * @returns True on success
   */
  setChatDescription(description: string): Promise<boolean>

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
   * - A message can only be deleted if it was sent less than 48 hours ago.
   * - Bots can delete outgoing messages in groups and supergroups.
   * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
   * - If the bot is an administrator of a group, it can delete any message there.
   * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   * @returns Returns True on success.
   */
  deleteMessage(messageId?: number): Promise<boolean>

  /**
   * Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped.
   * @param messageIds A JSON-serialized list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted
   * @returns Returns True on success.
   */
  deleteMessages(messageIds?: number[]): Promise<boolean>

  /**
   * Use this method to forward exists message.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param extra Pass `{ disable_notification: true }`, if it is not necessary to send a notification for forwarded message
   * @returns On success, the sent Message is returned.
   */
  forwardMessage(
    chatId: number | string,
    extra?: { disable_notification?: boolean, message_thread_id?: number, protect_content?: boolean }
  ): Promise<tt.Message>

  /**
   * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped.
   * Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageIds A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to forward. The identifiers must be specified in a strictly increasing order.
   * @param extra Additional params for forward messages
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  forwardMessages(
    chatId: number | string,
    messageIds?: (string | number)[],
    extra?: { disable_notification?: boolean, message_thread_id?: number, protect_content?: boolean }
  ): Promise<tt.MessageId[]>

  /**
   * Use this method to upload a .png file with a sticker for later use in createNewStickerSet and addStickerToSet methods (can be used multiple times)
   * https://core.telegram.org/bots/api#sending-files
   * @param ownerId User identifier of sticker file owner
   * @param sticker A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format.
   * @param stickerFormat Format of the sticker, must be one of “static”, “animated”, “video”
   * @returns Returns the uploaded File on success
   */
  uploadStickerFile(
    sticker: tt.InputFile,
    stickerFormat: string
  ): Promise<tt.File>

  /**
   * Use this method to move a sticker in a set created by the bot to a specific position
   * @param sticker File identifier of the sticker
   * @param position New sticker position in the set, zero-based
   * @returns Returns True on success.
   */
  setStickerPositionInSet(sticker: string, position: number): Promise<boolean>

  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors.
   * The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   *
   * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason.
   * For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc.
   * Supply some details in the error message to make sure the user knows how to correct the issues.
   * @param errors An array describing the errors
   * @returns True on success.
   */
  setPassportDataErrors(
    errors: tt.PassportElementError[]
  ): Promise<boolean>

  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language.
   * @param extra Extra parameters for getMyCommands
   * @returns Array of BotCommand on success.
   */
  getMyCommands(
    extra?: tt.ExtraGetMyCommands
  ): Promise<tt.BotCommand[]>

  /**
   * Use this method to change the bot's name.
   * @param name New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language.
   * @param languageCode A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name.
   * @returns Returns True on success.
   */
  setMyName(name?: string, languageCode?: string): Promise<boolean>

  /**
   * Use this method to get the current bot name for the given user language.
   * @param languageCode A two-letter ISO 639-1 language code or an empty string
   * @returns Returns BotName on success.
   */
  getMyName(languageCode?: string): Promise<BotName>

  /**
   * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty.
   * @param description New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language.
   * @param languageCode A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description.
   * @returns Returns True on success.
   */
  setMyDescription(description?: string, languageCode?: string): Promise<boolean>

  /**
   * Use this method to get the current bot description for the given user language.
   * @param languageCode A two-letter ISO 639-1 language code or an empty string
   * @returns Returns BotDescription on success.
   */
  getMyDescription(languageCode?: string): Promise<BotDescription>;

  /**
   * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot.
   * @param shortDescription New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language.
   * @param languageCode A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description.
   * @returns Returns True on success.
   */
  setMyShortDescription(shortDescription?: string, languageCode?: string): Promise<boolean>

  /**
   * Use this method to get the current bot short description for the given user language.
   * @param languageCode A two-letter ISO 639-1 language code or an empty string
   * @returns Returns BotShortDescription on success.
   */
  getMyShortDescription(languageCode?: string): Promise<BotShortDescription>;

  /**
   * Use this method to change the list of the bot's commands.
   * @param commands A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
   * @param extra Extra parameters for setMyCommands
   * @returns True on success
   */
  setMyCommands(
    commands: tt.BotCommand[],
    extra?: tt.ExtraSetMyCommands
  ): Promise<boolean>

  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language.
   * After deletion, higher level commands will be shown to affected users.
   * @param extra Extra parameters for deleteMyCommands
   * @returns True on success
   */
  deleteMyCommands(
    extra?: tt.ExtraDeleteMyCommands
  ): Promise<boolean>

  /**
   * Use this method to create an additional invite link for a chat.
   * @param extra Extra parameters for createChatInviteLink
   * @returns the new invite link as ChatInviteLink object
   */
  createChatInviteLink(
    extra?: tt.ExtraCreateChatIviteLink
  ): Promise<tt.ChatInviteLink>

  /**
   * Use this method to edit a non-primary invite link created by the bot.
   * @param inviteLink The invite link to edit
   * @param extra Extra parameters for editChatInviteLink
   * @returns the edited invite link as a ChatInviteLink object
   */
  editChatInviteLink(
    inviteLink: string,
    extra?: tt.ExtraEditChatIviteLink
  ): Promise<tt.ChatInviteLink>

  /**
   * Use this method to revoke an invite link created by the bot.
   * @param inviteLink The invite link to revoke
   * @returns the revoked invite link as a ChatInviteLink object
   */
  revokeChatInviteLink(
    inviteLink: string
  ): Promise<tt.ChatInviteLink>


  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param userId Unique identifier of the target user
   */
  approveChatJoinRequest(
    chatId: number | string,
    userId: number,
  ): Promise<boolean>

  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param userId Unique identifier of the target user
   */
  declineChatJoinRequest(
    chatId: number | string,
    userId: number,
  ): Promise<boolean>

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success.
   * @param menuButton A JSON-serialized object for the bot's new menu button. Defaults to MenuButtonDefault
   */
  setChatMenuButton(
    menuButton?: tt.MenuButton
  ): Promise<boolean>

  /**
   * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success.
   */
  getChatMenuButton(): Promise<tt.MenuButton>

  /**
   * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels.
   * These rights will be suggested to users, but they are are free to modify the list before adding the bot. Returns True on success.
   * @param rights A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared.
   * @param forChannels Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
   */
  setMyDefaultAdministratorRights(
    rights?: tt.ChatAdministratorRights,
    forChannels?: boolean
  ): Promise<boolean>

  /**
   * Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success.
   * @param forChannels Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
   */
  getMyDefaultAdministratorRights(
    forChannels?: boolean
  ): Promise<tt.ChatAdministratorRights>

}
