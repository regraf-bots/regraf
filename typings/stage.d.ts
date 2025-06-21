/** @format */

import { RegrafContext } from './context'
import { Middleware, Composer, MiddlewareFn } from './composer'

export interface SceneContextOptions {
  sessionName: string
  default?: string
  ttl?: number
}

export interface SceneSession<State = object> {
  state?: State
  current?: string
  expires?: number
}

export interface SceneContext<
  TContext extends SceneContextMessageUpdate<any>,
  State = object
> {
  ctx: TContext

  scenes: Map<string, Scene<TContext, State>>

  options: SceneContextOptions

  readonly session: SceneSession<State>

  state: State

  readonly current: BaseScene<TContext, State> | null

  reset: () => void

  enter: (
    sceneId: string,
    initialState?: Partial<State>,
    silent?: boolean
  ) => Promise<any>

  reenter: () => Promise<any>

  leave: () => Promise<any>
}

export interface SceneContextMessageUpdate<
  State = object
> extends RegrafContext {
  scene: SceneContext<this, State>
}

export interface BaseSceneOptions<
  TContext extends SceneContextMessageUpdate<any>,
  State = object
> {
  handlers: Middleware<TContext>[]
  enterHandlers: Middleware<TContext>[]
  leaveHandlers: Middleware<TContext>[]
  ttl?: number
}

export class BaseScene<
  TContext extends SceneContextMessageUpdate<any>,
  State = object
> extends Composer<TContext> {
  constructor(id: string, options?: Partial<BaseSceneOptions<TContext, State>>)

  id: string

  options: BaseSceneOptions<TContext, State>

  enterHandler: Middleware<TContext>

  leaveHandler: Middleware<TContext>

  ttl?: number

  enter: (...fns: Middleware<TContext>[]) => this

  leave: (...fns: Middleware<TContext>[]) => this

  enterMiddleware: () => Middleware<TContext>

  leaveMiddleware: () => Middleware<TContext>
}

export type Scene<
  TContext extends SceneContextMessageUpdate<any>,
  State = object
> = BaseScene<TContext, State>

export type StageOptions = SceneContextOptions

export class Stage<
  TContext extends SceneContextMessageUpdate<any>,
  State = object
> extends Composer<TContext> {
  constructor(scenes: Scene<TContext, State>[], options?: Partial<StageOptions>)

  register: (...scenes: Scene<TContext, State>[]) => this

  middleware: () => MiddlewareFn<TContext>

  static enter: <S = object>(
    sceneId: string,
    initialState?: Partial<S>,
    silent?: boolean
  ) => Middleware<SceneContextMessageUpdate<S>>

  static reenter: <S = object>() => Middleware<SceneContextMessageUpdate<S>>

  static leave: <S = object>() => Middleware<SceneContextMessageUpdate<S>>
}
