import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  async getUsers(page: number, limit: number, filters: Record<string, string>) {
    return new Promise(resolve => {
      setTimeout(() => {
        const users = [
          {
            id: 1,
            name: 'John Doe',
            biografia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            id: 2,
            name: 'Sylvino Prevot',
            biografia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 5 ',
          },
          {
            id: 3,
            name: 'Sylvino Prevot junior',
            biografia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 6',
          },
        ]
          .filter(user => Object.keys(filters).every(key => user[key].includes(filters[key])))
          .slice((page - 1) * limit, page * limit)

        if (users.length === 0) {
          return resolve({
            message: 'No users found',
            status: 404,
          })
        }

        resolve(users)
      }, 1000)
    })
  }
}
