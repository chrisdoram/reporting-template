import { times } from 'lodash'
import { faker } from '@faker-js/faker'
import { User } from '@domain/user'
import { Report } from '@domain/report'
import { Grid } from '@domain/grid'

type Data = {
  users: User[]
  Reports: Report[]
  grids: Grid[]
}

const getUser = (n: number): User => {
  return {
    id: n.toString(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  }
}

const getReport = (n: number): Report => {
  return {
    id: n.toString(),
    userId: faker.datatype.number({ min: 0, max: 4 }).toString(),
    model: {
      global: { tabEnableClose: false },
      borders: [],
      layout: {
        type: 'row',
        weight: 100,
        children: [
          {
            type: 'tabset',
            weight: 50,
            selected: 0,
            children: [
              {
                type: 'tab',
                name: 'One',
                component: 'button',
              },
              {
                type: 'tab',
                name: 'Two',
                component: 'button',
              },
            ],
          },
        ],
      },
    },
    description: faker.lorem.sentence(),
    name: `${faker.random.word()}-${faker.random.word()}`,
  }
}

const getGrid = (n: number): Grid => {
  return {
    id: n.toString(),
    reportId: faker.datatype.number({ min: 0, max: 9 }).toString(),
  }
}

export const getRandomData = (): Data => {
  return {
    users: times(5, (n) => getUser(n)),
    Reports: times(10, (n) => getReport(n)),
    grids: times(20, (n) => getGrid(n)),
  }
}
