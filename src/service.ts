import { IncomingMessage } from 'http'
import { Stream } from 'stream'
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

  static async createUser(req: IncomingMessage) {
    let buffer = [] as Buffer[] || []
    let body = ''

    req.on('data', chunk => {
      console.log(chunk)
      buffer.push(chunk)
    })
    req.on('end', () => {body = Buffer.concat(buffer).toString()})

    console.log(buffer)

    return null
  }
}
