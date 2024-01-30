import Permission from './permissions.entity'

export default interface User {
  id: number

  userName: string
  email: string

  firstName: string
  lastName: string

  avatarUrl: string

  password: string
  permissions: Permission[]

  birthday: Date

  createdAt: Date
}
