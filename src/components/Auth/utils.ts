import IPermission, { TAction } from 'models/permission.model'
import { ACTIONS } from 'root-constants'

const NUMBER_OF_AVAILABLE_ACTIONS = 4

export function isResourceAvailable(reqResource: string, deniedResources: IPermission[] = [], action: TAction): boolean {
  const deniedPolicy = deniedResources.find(({ resource }) => resource === reqResource)

  if (!deniedPolicy) {
    return true
  }

  if (deniedPolicy.actions && deniedPolicy.actions.length === NUMBER_OF_AVAILABLE_ACTIONS) {
    return false
  }

  return !deniedPolicy.actions.includes(action)
}

export function getPermissions(reqResource: string, deniedResources: IPermission[] = []) {
  const permissions = {
    isEditable: true,
    isReadable: true,
    isDeletable: true,
    isCreatable: true,
  }

  if (!reqResource || !permissions) {
    return {
      permissions, allow: true,
    }
  }

  const deniedPolicy = deniedResources.find(({ resource }) => resource === reqResource)
  if (!deniedPolicy) {
    return {
      permissions, allow: true,
    }
  }
  if (deniedPolicy.actions && deniedPolicy.actions.length === NUMBER_OF_AVAILABLE_ACTIONS) {
    return { allow: false }
  }

  return {
    permissions: {
      isEditable: !deniedPolicy.actions.includes(ACTIONS.update),
      isReadable: !deniedPolicy.actions.includes(ACTIONS.read),
      isDeletable: !deniedPolicy.actions.includes(ACTIONS.delete),
      isCreatable: !deniedPolicy.actions.includes(ACTIONS.create),
    },
    allow: true,
  }
}
