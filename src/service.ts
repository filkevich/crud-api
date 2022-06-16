import { TUser } from './types'

const users: Array<TUser> = [
  {
    id: '10',
    username: 'Artiom',
    age: 26,
    hobbies: ['music', 'coding']
  }
]

export default class Service {
  static async getUsers() {

    return users
  }

  static async getUserById(id: string) {
    for (let user of users) {
      if (user.id === id) {

        return user
      }
    }

    return null
  }
}
