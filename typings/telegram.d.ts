/** @format */

import * as tt from './telegram-types.d'

import * as https from 'https'
import * as http from 'http'
import { BotDescription, BotName, BotShortDescription } from '@grammyjs/types'

export interface TelegramOptions {
  /**
   * https.Agent or http.Agent instance, allows custom proxy, certificate, keep alive, etc.
   */
  agent?: https.Agent | http.Agent

  /**
   * Reply via webhook
   */
  webhookReply?: boolean

  /**
   * Path to API. default: https://api.telegram.org
   */
  apiRoot?: string
}

declare class ApiClient {
  protected constructor(token: string, options: object, webhookResponse: any)

  callApi(method: string, data: object): Promise<unknown>
}

export declare class Telegram extends ApiClient {
  /**
   * Initialize new Telegram app.
   * @param token Bot token
   * @param options Telegram options
   */
  constructor(token: string, options?: TelegramOptions)

  /**
   * Use this property to control reply via webhook feature.
   */
  webhookReply: boolean

  /**
   * Use this method to get basic information about the bot
   * @returns a User object on success.
   */
  getMe(): Promise<tt.User>

  /**
   * Use this method to get basic info about a file and prepare it for downloading
   * @param fileId Id of file to get link to
   * @returns a File object on success
   */
  getFile(fileId: string): Promise<tt.File>

  /**
   * Use this method to get link to a file by file id
   * @param fileId Id of file to get link to
   * @returns a String with an url to the file
   */
  getFileLink(fileId: string): Promise<string>

  /**
   * Use this method to get updates from Telegram server. Bot should be in `polling` mode
   * @returns Array of updates
   */
  getUpdates(): Promise<any[]>

  /**
   * Use this method to get information about set webhook
   * @returns a WebhookInfo on success
   */
  getWebhookInfo(): Promise<tt.WebhookInfo>

  /**
   * Use this method to get data for high score tables.
   * Will return the score of the specified user and several of their neighbors in a game.
   *
   * This method will currently return scores for the target user, plus two of their closest neighbors on each side.
   * Will also return the top three users if the user and his neighbors are not among them.
   * Please note that this behavior is subject to change.
   * @param userId Target user id
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @returns On success, an Array of GameHighScore objects.
   */
  getGameHighScores(
    userId: number,
    inlineMessageId?: string,
    chatId?: number,
    messageId?: number
  ): Promise<tt.GameHighScore[]>

  /**
   * Use this method to set the score of the specified user in a game.
   * @param userId User identifier
   * @param score New score, must be non-negative
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @param editMessage Pass `false`, if the game message should not be automatically edited to include the current scoreboard
   * @param force Pass True, if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters
   * @returns On success, if the message was sent by the bot, returns the edited Message, otherwise returns True. Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
   */
  setGameScore(
    userId: number,
    score: number,
    inlineMessageId?: string,
    chatId?: number,
    messageId?: number,
    editMessage?: boolean,
    force?: boolean
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to specify a url and receive incoming updates via an outgoing webhook
   * @param url HTTPS url to send updates to. Use an empty string to remove webhook integration
   * @param extra Additional params to set webhook
   * @returns True on success
   */
  setWebhook(
    url: string,
    extra?: tt.ExtraSetWebhook
  ): Promise<boolean>

  /**
   * Use this method to delete webhook
   * @param extra Additional params to delete webhook
   * @returns True on success
   */
  deleteWebhook(
    extra?: tt.ExtraDeleteWebhook
  ): Promise<boolean>

  /**
   * Use this method to send text messages
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param text Text of the message to be sent
   * @param extra SendMessage additional params
   * @returns sent Message if Success
   */
  sendMessage(
    chatId: number | string,
    text: string,
    extra?: tt.ExtraSendMessage
  ): Promise<tt.Message>

  /**
   * Use this method to forward exists message.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param fromChatId Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
   * @param messageId Message identifier in the chat specified in from_chat_id
   * @param extra Extra params for forward message
   * @returns On success, the sent Message is returned.
   */
  forwardMessage(
    chatId: number | string,
    fromChatId: number | string,
    messageId: string | number,
    extra?: { disable_notification?: boolean, message_thread_id?: number, protect_content?: boolean }
  ): Promise<tt.Message>

  /**
   * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped.
   * Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param fromChatId Unique identifier for the chat where the original messages were sent (or channel username in the format @channelusername)
   * @param messageIds A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to forward. The identifiers must be specified in a strictly increasing order.
   * @param extra Additional params for forward messages
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  forwardMessages(
    chatId: number | string,
    fromChatId: number | string,
    messageIds: (string | number)[],
    extra?: { disable_notification?: boolean, message_thread_id?: number, protect_content?: boolean }
  ): Promise<tt.MessageId[]>

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
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param action Type of action to broadcast.
   * @param messageThreadId Unique identifier for the target message thread; for supergroups only
   * @returns True on success
   */
  sendChatAction(
    chatId: number | string,
    action: tt.ChatAction,
    messageThreadId?: number
  ): Promise<boolean>

  /**
   * Use this method to change the chosen reactions on a message. Service messages can't be reacted to.
   * Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel.
   * Bots can't use paid reactions.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Identifier of the target message. If the message belongs to a media group, the reaction is set to the first non-deleted message in the group instead.
   * @param reaction A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message.
   * A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots.
   * @param isBig Pass True to set the reaction with a big animation
   */
  setMessageReaction(
    chatId: number | string,
    messageId: number,
    reaction?: tt.ReactionType[],
    isBig?: boolean
  ): Promise<boolean>

  /**
   * Use this method to get a list of profile pictures for a user.
   * @param userId
   * @param offset
   * @param limit
   * @returns UserProfilePhotos object
   */
  getUserProfilePhotos(
    userId: number,
    offset?: number,
    limit?: number
  ): Promise<tt.UserProfilePhotos>

  /**
   * Use this method to send point on the map
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param latitude Latitude of location
   * @param longitude Longitude of location
   * @param extra Additional params for send location
   * @returns a Message on success
   */
  sendLocation(
    chatId: number | string,
    latitude: number,
    longitude: number,
    extra?: tt.ExtraLocation
  ): Promise<tt.MessageLocation>

  /**
   * Use this method to send information about a venue
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param latitude Latitude of location
   * @param longitude Longitude of location
   * @param title Name of the venue
   * @param address Address of the venue
   * @param extra Additional params for sendVenue
   * @returns a Message on success
   */
  sendVenue(
    chatId: number | string,
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    extra?: tt.ExtraVenue
  ): Promise<tt.MessageVenue>

  /**
   * Use this method to send invoices
   * @param chatId Unique identifier for the target private chat
   * @param invoice Object with new invoice params
   * @param extra Additional params for send invoice
   * @returns a Message on success
   */
  sendInvoice(
    chatId: number,
    invoice: tt.NewInvoiceParameters,
    extra?: tt.ExtraInvoice
  ): Promise<tt.MessageInvoice>

  /**
   * Use this method to send phone contacts
   * @param chatId Unique identifier for the target private chat
   * @param phoneNumber Contact's phone number
   * @param firstName Contact's first name
   * @param extra Additional params for sendContact
   * @returns a Message on success
   */
  sendContact(
    chatId: number,
    phoneNumber: string,
    firstName: string,
    extra?: tt.ExtraContact
  ): Promise<tt.MessageContact>

  /**
   * Use this method to send photos
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param photo Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data
   * @param extra Additional params to send photo
   * @returns a Message on success
   */
  sendPhoto(
    chatId: number | string,
    photo: tt.InputFile,
    extra?: tt.ExtraPhoto
  ): Promise<tt.MessagePhoto>

  /**
   * Use this method to send a dice, which will have a random value from 1 to 6. On success, the sent Message is returned. (Yes, we're aware of the “proper” singular of die. But it's awkward, and we decided to help it change. One dice at a time!)
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param extra Additional params to send dice
   * @returns a Message on success
   */
  sendDice(
    chatId: number | string,
    extra?: tt.ExtraDice
  ): Promise<tt.MessageDice>

  /**
   * Use this method to send general files. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param document File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param extra Additional params for send document
   * @returns a Message on success
   */
  sendDocument(
    chatId: number | string,
    document: tt.InputFile,
    extra?: tt.ExtraDocument
  ): Promise<tt.MessageDocument>

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player.
   * Your audio must be in the .mp3 format.
   * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param audio Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data
   * @param extra Audio extra parameters
   * @returns On success, the sent Message is returned.
   */
  sendAudio(
    chatId: number | string,
    audio: tt.InputFile,
    extra?: tt.ExtraAudio
  ): Promise<tt.MessageAudio>

  /**
   * Use this method to send .webp stickers
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param sticker Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .webp file from the Internet, or upload a new one using multipart/form-data
   * @param extra Additional params to send sticker
   * @returns a Message on success
   */
  sendSticker(
    chatId: number | string,
    sticker: tt.InputFile,
    extra?: tt.ExtraSticker
  ): Promise<tt.MessageSticker>

  /**
   * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document)
   * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param video video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data
   * @param extra Additional params to send video
   * @returns a Message on success
   */
  sendVideo(
    chatId: number | string,
    video: tt.InputFile,
    extra?: tt.ExtraVideo
  ): Promise<tt.MessageVideo>

  /**
   * Use this method to send .gif animations
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param animation Animation to send. Pass a file_id as String to send a GIF that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a GIF from the Internet, or upload a new GIF using multipart/form-data
   * @param extra Additional params for sendAnimation
   * @returns a Message on success
   */
  sendAnimation(
    chatId: number | string,
    animation: tt.InputFile,
    extra?: tt.ExtraAnimation
  ): Promise<tt.MessageAnimation>

  /**
   * Use this method to send video messages
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param videoNote video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. Sending video notes by a URL is currently unsupported
   * @param extra Additional params for sendVideoNote
   * @returns a Message on success
   */
  sendVideoNote(
    chatId: number | string,
    videoNote: tt.InputFileVideoNote,
    extra?: tt.ExtraVideoNote
  ): Promise<tt.MessageVideoNote>

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param voice Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data
   * @param extra Additional params to send voice
   * @returns a Message on success
   */
  sendVoice(
    chatId: number | string,
    voice: tt.InputFile,
    extra?: tt.ExtraVoice
  ): Promise<tt.MessageVoice>

  /**
   * Use this method to send a game
   * @param chatId Unique identifier for the target chat
   * @param gameShortName Short name of the game, serves as the unique identifier for the game. Set up your games via Botfather.
   * @param extra Additional params for send game
   * @returns a Message on success
   */
  sendGame(
    chatId: number | string,
    gameShortName: string,
    extra?: tt.ExtraGame
  ): Promise<tt.MessageGame>

  /**
   * Use this method to send a group of photos or videos as an album
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param media A JSON-serialized array describing photos and videos to be sent, must include 2–10 items
   * @param extra Additional params to send media group
   * @returns On success, an array of the sent Messages is returned
   */
  sendMediaGroup(
    chatId: number | string,
    media: (tt.InputMediaAudio | tt.InputMediaDocument | tt.InputMediaPhoto | tt.InputMediaVideo)[],
    extra?: tt.ExtraMediaGroup
  ): Promise<Array<tt.Message>>

  /**
   * Use this method to send a native poll.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param question Poll question, 1-300 characters
   * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
   * @param extra Additional params to send poll
   * @returns On success, the sent Message is returned.
   */
  sendPoll(
    chatId: number | string,
    question: string,
    options: string[],
    extra: tt.ExtraPoll
  ): Promise<tt.MessagePoll>

  /**
   * Use this method to send a native quiz.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param question Poll question, 1-255 characters
   * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
   * @param extra Additional params to send quiz
   * @returns On success, the sent Message is returned.
   */
  sendQuiz(
    chatId: number | string,
    question: string,
    options: string[],
    extra: tt.ExtraQuiz
  ): Promise<tt.MessagePoll>

  /**
   * Use this method to send a native quiz.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Identifier of the original message with the poll
   * @param extra Additional params to stop poll
   * @returns On success, the stopped Poll with the final results is returned.
   */
  stopPoll(
    chatId: number | string,
    messageId: number,
    extra: tt.ExtraStopPoll
  ): Promise<tt.Poll>

  /**
   * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.)
   * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns a Chat object on success.
   */
  getChat(chatId: number | string): Promise<tt.ChatFullInfo>

  /**
   * Use this method to get a list of administrators in a chat.
   * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
   */
  getChatAdministrators(chatId: number | string): Promise<Array<tt.ChatMember>>

  /**
   * Use this method to get information about a member of a chat.
   * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @param userId Unique identifier of the target user
   * @returns a ChatMember object on success
   */
  getChatMember(chatId: string | number, userId: number): Promise<tt.ChatMember>

  /**
   * @deprecated in favor of `getChatMemberCount`
   * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns Number on success
   */
  getChatMembersCount(chatId: string | number): Promise<number>

  /**
   * Use this method to get the number of members in a chat
   * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns Number on success
   */
   getChatMemberCount(chatId: string | number): Promise<number>

  /**
   * Use this method to send answers to an inline query. On success, True is returned.
   * No more than 50 results per query are allowed.
   * @param inlineQueryId Unique identifier for the answered query
   * @param results Array of results for the inline query
   * @param extra Extra optional parameters
   */
  answerInlineQuery(
    inlineQueryId: string,
    results: Array<tt.InlineQueryResult>,
    extra?: tt.ExtraAnswerInlineQuery
  ): Promise<boolean>

  /**
   * Use this method to set default chat permissions for all members.
   * The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members admin rights.
   * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @param permissions New default chat permissions
   * @param useIndependentChatPermissions Pass True if chat permissions are set independently.
   *  Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions;
   *  the can_send_polls permission will imply the can_send_messages permission.
   * @returns True on success
   */
  setChatPermissions(
    chatId: string | number,
    permissions: tt.ChatPermissions,
    useIndependentChatPermissions?: boolean
  ): Promise<boolean>

  /**
   * Use this method to ban a user in a group, a supergroup or a channel.
   * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
   * @param userId Unique identifier of the target user
   * @param extra Extra params
   * @returns True on success
   */
   banChatMember(
    chatId: number | string,
    userId: number,
    extra?: tt.ExtraBan
  ): Promise<boolean>

  /**
   * @deprecated in favor of `banChatMember`
   * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
   * @param userId Unique identifier of the target user
   * @param untilDate Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever
   * @returns True on success
   */
  kickChatMember(
    chatId: number | string,
    userId: number,
    untilDate?: number
  ): Promise<boolean>

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   * @param userId Unique identifier of the target user
   * @param extra Extra parameters for promoteChatMember
   * @returns True on success
   */
  promoteChatMember(
    chatId: number | string,
    userId: number,
    extra: tt.ExtraPromoteChatMember
  ): Promise<boolean>

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all boolean parameters to lift restrictions from a user. Returns True on success.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param userId Unique identifier of the target user
   * @param extra Additional params for restrict chat member
   * @returns True on success
   */
  restrictChatMember(
    chatId: string | number,
    userId: number,
    extra?: tt.ExtraRestrictChatMember
  ): Promise<boolean>

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param userId Unique identifier of the target user
   * @param title New custom title for the administrator; 0-16 characters, emoji are not allowed
   * @returns True on success
   */
  setChatAdministratorCustomTitle(
    chatId: string | number,
    userId: number,
    title: string
  ): Promise<boolean>

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned (@function unbanChatSenderChat), the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param senderChatId Unique identifier of the target sender chat
   * @returns True on success
   */
  banChatSenderChat(
    chatId: string | number,
    senderChatId: number,
  ): Promise<boolean>

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param senderChatId Unique identifier of the target sender chat
   * @returns True on success
   */
  unbanChatSenderChat(
    chatId: string | number,
    senderChatId: number,
  ): Promise<boolean>

  /**
   * Use this method to export an invite link to a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @returns exported invite link as String on success.
   */
  exportChatInviteLink(chatId: number | string): Promise<string>

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param photo New chat photo
   * @returns True on success.
   */
  setChatPhoto(chatId: number | string, photo: tt.InputFile): Promise<boolean>

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @returns True on success
   */
  deleteChatPhoto(chatId: number | string): Promise<boolean>

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
   * @param title New chat title, 1-255 characters
   * @returns True on success
   */
  setChatTitle(chatId: number | string, title: string): Promise<boolean>

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
   * @param description New chat description, 0-255 characters
   * @returns True on success
   */
  setChatDescription(chatId: number | string, description: string): Promise<boolean>

  /**
   * Use this method to pin a message in a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param messageId Identifier of a message to pin
   * @param extra Pass `{ disable_notification: true }`, if it is not necessary to send a notification to all group members about the new pinned message
   * @returns True on success
   */
  pinChatMessage(
    chatId: number | string,
    messageId: number,
    extra?: { disable_notification?: boolean }
  ): Promise<boolean>

  /**
   * Use this method to unpin a message in a group, a supergroup, or a channel.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param extra Extra params
   * @returns True on success
   */
  unpinChatMessage(chatId: number | string, extra?: tt.ExtraUnpinMessage): Promise<boolean>

  /**
   * Use this method to clear the list of pinned messages in a chat
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @returns True on success
   */
  unpinAllChatMessages(chatId: number | string): Promise<boolean>

  /**
   * Use this method for your bot to leave a group, supergroup or channel
   * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns True on success
   */
  leaveChat(chatId: number | string): Promise<boolean>

  /**
   * Use this method to unban a user from a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights
   * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format @username)
   * @param userId Unique identifier of the target user
   * @param extra Extra params
   * @returns True on success
   */
  unbanChatMember(
    chatId: number | string,
    userId: number,
    extra?: tt.ExtraUnban
  ): Promise<boolean>

  /**
   * Use this method to send answers to game query.
   * @param callbackQueryId Query id
   * @param text Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   * @param showAlert If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
   * @param extra Extra parameters for answerCallbackQuery
   * @returns True on success
   */
  answerCbQuery(
    callbackQueryId: string,
    text?: string,
    showAlert?: boolean,
    extra?: tt.ExtraAnswerCallbackQuery
  ): Promise<boolean>

  /**
   * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat.
   * @param chatId Unique identifier for the chat or username of the channel (in the format @channelusername)
   * @param userId Unique identifier of the target user
   * @returns Returns a UserChatBoosts object.
   */
  getUserChatBoosts(chatId: number | string, userId: number): Promise<tt.UserChatBoosts>;

  /**
   * Use this method to send answers to game query.
   * @param callbackQueryId Query id
   * @param url Notification text
   * @returns True on success
   */
  answerGameQuery(callbackQueryId: string, url: string): Promise<boolean>

  /**
   * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified,
   * the Bot API will send an Update with a shipping_query field to the bot.
   * Use this method to reply to shipping queries.
   * @param shippingQueryId Unique identifier for the query to be answered
   * @param ok  Specify True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
   * @param shippingOptions Required if ok is True. A JSON-serialized array of available shipping options.
   * @param errorMessage Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user.
   * @returns True on success
   */
  answerShippingQuery(
    shippingQueryId: string,
    ok: boolean,
    shippingOptions: Array<tt.ShippingOption>,
    errorMessage: string
  ): Promise<boolean>

  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query.
   * Use this method to respond to such pre-checkout queries.
   * Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
   * @param preCheckoutQueryId  Unique identifier for the query to be answered
   * @param ok  Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
   * @param errorMessage Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user.
   * @returns True on success
   */
  answerPreCheckoutQuery(
    preCheckoutQueryId: string,
    ok: boolean,
    errorMessage?: string
  ): Promise<boolean>

  /**
   * Use this method to edit text and game messages sent by the bot or via the bot (for inline bots).
   * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param text New text of the message
   * @param extra Extra params
   * @returns On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageText(
    chatId: number | string | void,
    messageId: number | void,
    inlineMessageId: string | void,
    text: string,
    extra?: tt.ExtraEditMessage
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit captions of messages sent by the bot or via the bot (for inline bots).
   * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param caption New caption of the message
   * @param extra Extra params
   * @returns On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageCaption(
    chatId?: number | string,
    messageId?: number,
    inlineMessageId?: string,
    caption?: string,
    extra?: tt.ExtraEditCaption
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit animation, audio, document, photo, or video messages.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param media New media of message
   * @param extra Extra params
   * @returns On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageMedia(
    chatId: number | string | void,
    messageId: number | void,
    inlineMessageId: string | void,
    media: tt.MessageMedia,
    extra?: tt.ExtraEditMessageMedia
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit only the reply markup of messages sent by the bot or via the bot (for inline bots).
   * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param markup Markup of inline keyboard
   */
  editMessageReplyMarkup(
    chatId?: number | string,
    messageId?: number,
    inlineMessageId?: string,
    markup?: tt.InlineKeyboardMarkup
  ): Promise<tt.Message | boolean>

  /**
   * Use this method to edit live location messages
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param latitude Latitude of location
   * @param longitude Longitude of location
   * @param extra Extra params
   * @returns On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   */
  editMessageLiveLocation(
    chatId: number | string | void,
    messageId: number | void,
    inlineMessageId: string | void,
    latitude: number,
    longitude: number,
    extra?: tt.ExtraEditLocation
  ): Promise<tt.MessageLocation | boolean>

  /**
   * Use this method to stop updating a live location message before live_period expires.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
   * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
   * @param extra Extra params
   * @returns On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.
   */
  stopMessageLiveLocation(
    chatId: number | string | void,
    messageId: number | void,
    inlineMessageId: string | void,
    extra?: tt.ExtraStopLiveLocation
  ): Promise<tt.MessageLocation | boolean>

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
   * - A message can only be deleted if it was sent less than 48 hours ago.
   * - Bots can delete outgoing messages in groups and supergroups.
   * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
   * - If the bot is an administrator of a group, it can delete any message there.
   * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageId Identifier of the message to delete
   * @returns Returns True on success.
   */
  deleteMessage(chatId: number | string, messageId: number): Promise<boolean>

  /**
   * Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param messageIds A JSON-serialized list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted
   * @returns Returns True on success.
   */
  deleteMessages(chatId: number | string, messageIds: number[]): Promise<boolean>

  /**
   * Use this method to set a new group sticker set for a supergroup.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param setName Name of the sticker set to be set as the group sticker set
   * @returns True on success.
   */
  setChatStickerSet(
    chatId: number | string,
    setName: string
  ): Promise<boolean>

  /**
   * Use this method to delete a group sticker set from a supergroup.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @returns True on success.
   */
  deleteChatStickerSet(
    chatId: number | string
  ): Promise<boolean>

  /**
   * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters.
   * @returns Returns an Array of Sticker objects.
   */
  getForumTopicIconStickers(): Promise<tt.Sticker[]>;

  /**
   * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param name Topic name, 1-128 characters
   * @param extra Extra params
   * @returns Returns information about the created topic as a ForumTopic object.
   */
  createForumTopic(chatId: number | string, name: string, extra?: tt.ExtraCreateForumTopic): Promise<tt.ForumTopic>;

  /**
   * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param messageThreadId Unique identifier for the target message thread of the forum topic
   * @param name New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept
   * @param iconCustomEmojiId New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept
   * @returns Returns True on success.
   */
  editForumTopic(chatId: number | string, messageThreadId: number, name?: string, iconCustomEmojiId?: string): Promise<boolean>;

  /**
   * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param messageThreadId Unique identifier for the target message thread of the forum topic
   * @returns Returns True on success.
   */
  closeForumTopic(chatId: number | string, messageThreadId: number): Promise<boolean>;

  /**
   * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param messageThreadId Unique identifier for the target message thread of the forum topic
   * @returns Returns True on success.
   */
  reopenForumTopic(chatId: number | string, messageThreadId: number): Promise<boolean>;

  /**
   * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param messageThreadId Unique identifier for the target message thread of the forum topic
   * @returns Returns True on success.
   */
  deleteForumTopic(chatId: number | string, messageThreadId: number): Promise<boolean>;

  /**
   * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param messageThreadId Unique identifier for the target message thread of the forum topic
   * @returns Returns True on success.
   */
  unpinAllForumTopicMessages(chatId: number | string, messageThreadId: number): Promise<boolean>;

  /**
   * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param name New topic name, 1-128 characters
   * @returns Returns True on success.
   */
  editGeneralForumTopic(chatId: number | string, name: string): Promise<boolean>;

  /**
   * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @returns Returns True on success.
   */
  closeGeneralForumTopic(chatId: number | string): Promise<boolean>;

  /**
   * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @returns Returns True on success.
   */
  reopenGeneralForumTopic(chatId: number | string): Promise<boolean>;

  /**
   * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @returns Returns True on success.
   */
  hideGeneralForumTopic(chatId: number | string): Promise<boolean>;

  /**
   * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @returns Returns True on success.
   */
  unhideGeneralForumTopic(chatId: number | string): Promise<boolean>;

  /**
   * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup.
   * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @returns Returns True on success.
   */
  unpinAllGeneralForumTopicMessages(chatId: number | string): Promise<boolean>;

  /**
   * Use this method to get a sticker set
   * @param name Name of the sticker set
   * @returns On success, a StickerSet object is returned.
   */
  getStickerSet(name: string): Promise<tt.StickerSet>

  /**
   * Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects.
   * @param customEmojiIds A JSON-serialized list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified.
   */
  getCustomEmojiStickers(customEmojiIds: string[]): Promise<tt.Sticker[]>

  /**
   * Use this method to upload a .png file with a sticker for later use in createNewStickerSet and addStickerToSet methods (can be used multiple times)
   * https://core.telegram.org/bots/api#sending-files
   * @param ownerId User identifier of sticker file owner
   * @param sticker A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format.
   * @param stickerFormat Format of the sticker, must be one of “static”, “animated”, “video”
   * @returns Returns the uploaded File on success
   */
  uploadStickerFile(
    ownerId: number,
    sticker: tt.InputFile,
    stickerFormat: string
  ): Promise<tt.File>

  /**
   * Use this method to create new sticker set owned by a user. The bot will be able to edit the created sticker set
   * @param ownerId User identifier of created sticker set owner
   * @param name Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only english letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in “_by_<bot username>”. <bot_username> is case insensitive. 1-64 characters.
   * @param title Sticker set title, 1-64 characters
   * @param stickers Sticker object array
   * @param stickerType Type of stickers in the set, pass “regular”, “mask”, or “custom_emoji”. By default, a regular sticker set is created.
   * @param needsRepainting Pass True if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only
   * @returns True on success.
   */
  createNewStickerSet(
    ownerId: number,
    name: string,
    title: string,
    stickers: tt.InputSticker[],
    stickerType?: tt.StickerFormat,
    needsRepainting?: boolean
  ): Promise<boolean>

  /**
   * Use this method to add a new sticker to a set created by the bot
   * @param ownerId User identifier of sticker set owner
   * @param name Sticker set name
   * @param sticker Sticker object
   * @returns True on success.
   */
  addStickerToSet(
    ownerId: number,
    name: string,
    sticker: tt.InputSticker,
  ): Promise<boolean>

  /**
   * Use this method to move a sticker in a set created by the bot to a specific position
   * @param sticker File identifier of the sticker
   * @param position New sticker position in the set, zero-based
   * @returns True on success.
   */
  setStickerPositionInSet(sticker: string, position: number): Promise<boolean>

  /**
   * Use this method to delete a sticker from a set created by the bot.
   * @param sticker File identifier of the sticker
   * @returns Returns True on success
   */
  deleteStickerFromSet(sticker: string): Promise<boolean>

  /**
   * Use this method to replace an existing sticker in a sticker set with a new one.
   *  The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet.
   * @param userId User identifier of the sticker set owner
   * @param name Sticker set name
   * @param oldSticker File identifier of the replaced sticker
   * @param sticker A JSON-serialized object with information about the added sticker.
   *  If exactly the same sticker had already been added to the set, then the set remains unchanged.
   * @returns True on success.
   */
  replaceStickerInSet(userId: number, name: string, oldSticker: string, sticker: tt.InputSticker): Promise<boolean>

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
   * Informs a user that some of the Telegram Passport elements they provided contains errors.
   * The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change).
   *
   * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason.
   * For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc.
   * Supply some details in the error message to make sure the user knows how to correct the issues.
   * @param userId User identifier
   * @param errors An array describing the errors
   * @returns True on success.
   */
  setPassportDataErrors(
    userId: number,
    errors: tt.PassportElementError[]
  ): Promise<boolean>

  /**
   * Use this method to send copy of exists message.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param message Received message object
   * @param extra Specified params for message
   * @returns On success, the sent Message is returned.
   */
  sendCopy(
    chatId: number | string,
    message?: tt.Message,
    extra?: object
  ): Promise<tt.Message>

  /**
   * Use this method to send copy of exists message.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param fromChatId Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
   * @param messageId Message identifier in the chat specified in from_chat_id
   * @param extra Additional params to send modified copy of message
   * @returns the MessageId of the sent message on success
   */
  copyMessage(
    chatId: number | string,
    fromChatId: number | string,
    messageId: number,
    extra?: tt.ExtraCopyMessage
  ): Promise<tt.MessageId>

  /**
   * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped.
   * Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied.
   * A quiz poll can be copied only if the value of the field correct_option_id is known to the bot.
   * The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param fromChatId Unique identifier for the chat where the original messages were sent (or channel username in the format @channelusername)
   * @param messageIds A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to copy. The identifiers must be specified in a strictly increasing order.
   * @param extra Extra params for copyMessages
   * @returns On success, an array of MessageId of the sent messages is returned.
   */
  copyMessages(
    chatId: number | string,
    fromChatId: number | string,
    messageIds: number[],
    extra?: tt.ExtraCopyMessage
  ): Promise<tt.MessageId[]>

  /**
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param name Invite link name; 0-32 characters
   * @param extra Extra parameters for createChatInviteLink
   * @returns the new invite link as ChatInviteLink object
   */
  createChatInviteLink(
    chatId: number | string,
    name: string,
    extra?: tt.ExtraCreateChatIviteLink
  ): Promise<tt.ChatInviteLink>

  /**
   * Use this method to edit a non-primary invite link created by the bot.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param inviteLink The invite link to edit
   * @param extra Extra parameters for editChatInviteLink
   * @returns the edited invite link as a ChatInviteLink object
   */
  editChatInviteLink(
    chatId: number | string,
    inviteLink: string,
    extra?: tt.ExtraEditChatIviteLink
  ): Promise<tt.ChatInviteLink>

  /**
   * Use this method to revoke an invite link created by the bot.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param inviteLink The invite link to revoke
   * @returns the revoked invite link as a ChatInviteLink object
   */
  revokeChatInviteLink(
    chatId: number | string,
    inviteLink: string
  ): Promise<tt.ChatInviteLink>

  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param userId Unique identifier of the target user
   */
  approveChatJoinRequest(
    chatId: number | string,
    userId: number
  ): Promise<boolean>

  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param userId Unique identifier of the target user
   */
  declineChatJoinRequest(
    chatId: number | string,
    userId: number
  ): Promise<boolean>

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param menuButton A JSON-serialized object for the bot's new menu button. Defaults to MenuButtonDefault
   */
  setChatMenuButton(
    chatId?: number | string,
    menuButton?: tt.MenuButton
  ): Promise<boolean>

  /**
   * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   */
  getChatMenuButton(
    chatId?: number | string,
  ): Promise<tt.MenuButton>

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
