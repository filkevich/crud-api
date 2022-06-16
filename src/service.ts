import { TUser, TId } from './interfaces'

const users: TUser[] = [
  {
    id: 1,
    username: 'Artiom',
    age: 26,
    hobbies: ['music', 'coding']
  }
]

export default class Service {
  static async getUsers() {
    return users
  }

  static async getUserById(id: TId) {

  }
}
