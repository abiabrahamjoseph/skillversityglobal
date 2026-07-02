import type { Access, AccessArgs, PayloadRequest } from 'payload'

import type { User } from '@/payload-types'

const getRole = (user?: User | null) => {
  // Existing production users will not have role until the migration runs.
  // Treat missing role as admin to avoid locking out the current owner account.
  return (user as any)?.role || 'admin'
}

export const isAdminUser = (user?: User | null) => Boolean(user) && getRole(user) === 'admin'

export const isEditorUser = (user?: User | null) => {
  const role = getRole(user)
  return Boolean(user) && (role === 'admin' || role === 'editor')
}

export const adminOnly: Access<User> = ({ req: { user } }) => isAdminUser(user)

export const adminOrEditor: Access<User> = ({ req: { user } }) => isEditorUser(user)

export const canAccessAdmin = ({ req: { user } }: AccessArgs<User>) => isEditorUser(user)

export const canRunJobs = ({ req }: { req: PayloadRequest }): boolean => {
  if (isAdminUser(req.user as User | null)) return true

  const secret = process.env.CRON_SECRET
  if (!secret) return false

  const authHeader = req.headers.get('authorization')
  return authHeader === `Bearer ${secret}`
}
