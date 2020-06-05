import { TAction } from 'models/permission.model'

export const UNAUTHORIZED_STATUS = 401

export const ACTIONS: {create: TAction; read: TAction; update: TAction; delete: TAction} = {
  create: 'C',
  read: 'R',
  update: 'U',
  delete: 'D',
}

export const RESOURCES = {
  example: 'ui:example',
}
