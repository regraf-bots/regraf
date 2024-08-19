/** @format */

/// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http'
import { TlsOptions } from 'tls'

import * as tt from './telegram-types.d'

import { RegrafContext } from './context'
import { Composer } from './composer'
import { Telegram, TelegramOptions } from './telegram'

export interface RegrafOptions extends TOptions {
  /**
   * Parse mode
   */
  parseMode?: tt.ParseMode

  /**
   * Telegram options
   */
  telegram?: TelegramOptions

  /**
   * Custom context
   */
  contextType?: RegrafContext

  /**
   * Autoset after launch by botInfo method
   */
  username?: never
}

export interface LaunchPollingOptions {
  /**
   * Poll timeout in seconds
   */
  timeout?: number

  /**
   * Limits the number of updates to be retrieved
   */
  limit?: number

  /**
   * List the types of updates you want your bot to receive
   */
  allowedUpdates?: tt.UpdateType[] | tt.UpdateType | null

  /**
   * Polling stop callback
   */
  stopCallback?: () => void | null
}

export interface LaunchWebhookOptions {
  /**
   * Public domain for webhook. If domain is not specified, hookPath should contain a domain name as well (not only path component).
   */
  domain?: string

  /**
   * Webhook url path; will be automatically generated if not specified
   */
  hookPath?: string

  /**
   * The port to listen on for Telegram calls. If port is omitted or is 0, the operating system will assign an arbitrary unused port.
   */
  port?: number

  /**
   * The host to listen on for Telegram calls. If host is omitted, the server will accept connections on the unspecified IPv6 address (::) when IPv6 is available, or the unspecified IPv4 address (0.0.0.0) otherwise.
   */
  host?: string

  /**
   * TLS server options. Pass null (or omit) to use http.
   */
  tlsOptions?: TlsOptions | null

  /**
   * A callback function suitable for the http[s].createServer() method to handle a request.
   */
  cb?: (req: IncomingMessage, res: ServerResponse) => void
}

export declare class Regraf<
  TContext extends RegrafContext
> extends Composer<TContext> {
  /**
   * Use this property to get/set bot token
   */
  token: string

  /**
   * Use this property to control reply via webhook feature.
   */
  webhookReply: boolean

  /**
   * Use this property to get telegram instance
   */
  telegram: Telegram

  /**
   * Use this property to extend context and support your custom interface
   */
  context: TContext

  /**
   * Regraf options
   */
  options: TOptions

  /**
   * Initialize new Regraf app.
   * @param token Bot token
   * @param options options
   * @example
   * new Regraf(token, options)
   */
  constructor(token: string, options?: RegrafOptions)

  /**
   * Launch bot in long-polling or webhook mode.
   *
   * @param options [See reference to get more]{@link https://telegraf.js.org/#/?id=launch}
   */
  launch(options?: {
    polling?: LaunchPollingOptions
    webhook?: LaunchWebhookOptions
  }): Promise<void>

  /**
   * Start poll updates.
   * @param timeout Poll timeout in seconds
   * @param limit Limits the number of updates to be retrieved
   * @param allowedUpdates List the types of updates you want your bot to receive
   * @param stopCallback Polling stop callback
   */
  startPolling(
    timeout?: number,
    limit?: number,
    allowedUpdates?: tt.UpdateType[] | tt.UpdateType | null,
    stopCallback?: () => void | null
  ): Regraf<TContext>

  /**
   * Start listening @ https://host:port/hookPath for Telegram calls.
   * @param hookPath Webhook url path (see Regraf.setWebhook)
   * @param tlsOptions TLS server options. Pass null to use http
   * @param port Port number
   * @param host Hostname
   * @param cb A callback function suitable for the http[s].createServer() method to handle a request.
   */
  startWebhook(
    hookPath: string,
    tlsOptions?: TlsOptions | null,
    port?: number,
    host?: string,
    cb?: (req: IncomingMessage, res: ServerResponse) => void
  ): Regraf<TContext>

  /**
   * Stop Webhook and polling
   */
  stop(cb?: () => void): Promise<void>

  /**
   * Return a callback function suitable for the http[s].createServer() method to handle a request.
   * You may also use this callback function to mount your regraf app in a Koa/Connect/Express app.
   * @param hookPath Webhook url path (see Regraf.setWebhook)
   */
  webhookCallback(
    hookPath: string
  ): (req: IncomingMessage, res: ServerResponse) => void

  handleUpdates(updates: tt.Update[]): Promise<unknown[]>

  /**
   * Handle raw Telegram update. In case you use centralized webhook server, queue, etc.
   */
  handleUpdate(
    update: tt.Update,
    webhookResponse?: ServerResponse
  ): Promise<unknown>

  private fetchUpdates(): void

  catch(logFn?: Function): void
}

export interface TOptions {
  /**
   * Telegram options
   */
  telegram?: TelegramOptions

  /**
   * Bot username
   */
  username?: string

  /**
   * Handle `channel_post` updates as messages
   */
  channelMode?: boolean

  /**
   * Delay (in seconds) before making a follow-up request to get updates
   */
  retryAfter?: number

  /**
   * Maximum amount of time (in microseconds) for which middlewares execution can pause updates fetching
   */
  handlerTimeout?: number
}