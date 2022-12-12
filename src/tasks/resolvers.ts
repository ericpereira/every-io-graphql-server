
import { genRanHex } from "../utils/common";
import { tasksMock } from "./data";
import { Status, TaskAttributes } from "./type";

let tasks = tasksMock

export const resolvers = {
  Query: {
    tasks: () => tasks
  },
  Status: {
    TO_DO: 'To do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    ARCHIVED: 'Archived'
  },
  Mutation: {
    addTask: (parent, args, contextValue, info) => {
      const { title, description, status } = args
      let id = ''
      do {
        id = genRanHex(16)  
      } while (tasks.filter(task => task.id === id).length > 0)

      const newTask: TaskAttributes = { title, description, status, id , owner: 'me', createdAt: new Date() }
      tasks.push(newTask)
      return newTask
    },
    moveTask: (parent, args, contextValue, info) => {
      const { id, status } = args
      const task = tasks.filter(t => t.id === id)[0]
      tasks = tasks.filter(t => t.id !== id) //remove old item;
      const newTask: TaskAttributes = { ...task, status, updatedAt: new Date(), disabledAt: status === Status.ARCHIVED ? new Date() : null }
      tasks.push(newTask)

      return newTask
    },
    archiveTask: (parent, args, contextValue, info) => {
      const { id } = args
      const task = tasks.filter(t => t.id === id)[0]
      tasks = tasks.filter(t => t.id !== id) //remove old item
      const newTask = { ...task, status: Status.ARCHIVED, disabledAt: new Date() }
      tasks.push(newTask)

      return newTask
    }
  }
};