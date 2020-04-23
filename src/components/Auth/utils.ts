import IPermission, { TAction } from 'models/permission.model'

export function isResourceAvailable(reqResource: string, permissions: IPermission[] = [], action: TAction): boolean {
  const deniedPolicy = permissions.find(({ resource }) => resource === reqResource)

  if (!deniedPolicy) {
    return true
  }

  if (deniedPolicy.actions && deniedPolicy.actions[0] === '*') {
    return false
  }

  return !deniedPolicy.actions.includes(action)
}

export function getPermissions(reqResource: string, permissions: IPermission[] = []) {
  const permissons = {
    isEditable: true,
    isReadable: true,
    isDeletable: true,
    isCreatable: true,
  }

  if (!reqResource || !permissions) {
    return {
      permissons, allow: true,
    }
  }

  const deniedPolicy = permissions.find(({ resource }) => resource === reqResource)
  if (!deniedPolicy) {
    return {
      permissons, allow: true,
    }
  }
  if (deniedPolicy.actions && deniedPolicy.actions[0] === '*') {
    return { allow: false }
  }

  return {
    permissons: {
      isEditable: !deniedPolicy.actions.includes('U'),
      isReadable: !deniedPolicy.actions.includes('R'),
      isDeletable: !deniedPolicy.actions.includes('D'),
      isCreatable: !deniedPolicy.actions.includes('C'),
    },
    allow: true,
  }
}
