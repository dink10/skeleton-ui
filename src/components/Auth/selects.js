
export const selectPermissions = (state) => (state.auth.user && state.auth.user.permissions ? state.auth.user.permissions : [])
