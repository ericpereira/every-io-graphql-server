export type User = {
  id: number
  firstName?: string
  lastName?: string
  email: string
  password: string
  createdAt?: Date
  token?: string
}

export type UserPayload = {
  id: number
  name: string
  email: string
  iat: number
}

export interface MyContext {
  user?: UserPayload;
}


export type Task = {
  id?: number
  title: string
  description?: string
  status: Status
  createdAt?: Date
  updatedAt?: Date
  disabledAt?: Date
  userId: number
}


export enum Status {
  TO_DO = 'To do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
  ARCHIVED = 'Archived'
}

export const typeDefs = `
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    createdAt: String
    token: String
  }

  type Task {
    id: ID
    title: String
    description: String
    status: Status
    createdAt: String
    updatedAt: String
    disabledAt: String
    userId: String
  }

  type Query {
    tasks: [Task]
    login(email: String, password: String): String
  }

  type Mutation {
    addTask(title: String, description: String, status: String): Task
    moveTask(id: ID, status: Status): Task
    archiveTask(id: ID): Task
    createUser(firstName: String, lastName: String, email: String, password: String): User
  }

  enum Status {
    TO_DO
    IN_PROGRESS
    DONE
    ARCHIVED
  }
`;