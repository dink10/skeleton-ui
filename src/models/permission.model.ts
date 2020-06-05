
export type TAction = 'C' | 'R' | 'U' | 'D'
export type TEffect = 'allow' | 'deny'

export default interface IPermission {
  resource: string
  actions: TAction[]
  effect: TEffect
}
