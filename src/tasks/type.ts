export type TaskAttributes = {
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

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `  
  # This "Book" type defines the queryable fields for every book in our data source.

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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(title: String, description: String, status: String): Task
    moveTask(id: ID, status: Status): Task
    archiveTask(id: ID): Task
  }

  enum Status {
    TO_DO
    IN_PROGRESS
    DONE
    ARCHIVED
  }
`;