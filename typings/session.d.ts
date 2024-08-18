/** @format */

import { RegrafContext } from './context'
import { Middleware } from './composer'

export declare function session<TContext extends RegrafContext>(opts?: {
  property?: string
  store?: Map<string, any>
  getSessionKey?: (ctx: TContext) => string
  ttl?: number
}): Middleware<TContext>
