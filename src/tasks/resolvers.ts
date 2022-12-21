
import { isValidStatus } from "../utils/common";
import { Status, TaskAttributes } from "./type";
import knex from '../database/connection';

export const resolvers = {
  Query: {
    tasks: async () => {
      try {
        const tasks = await knex<TaskAttributes>('tasks')
        return tasks  
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Status: {
    TO_DO: 'To do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    ARCHIVED: 'Archived'
  },
  Mutation: {
    addTask: async (parent, args, contextValue, info) => {
      try {
        const { title, description, status } = args
        if(!isValidStatus(status)){
          throw new Error("invalid status")
        }

        const newTask = await knex<TaskAttributes>('tasks')
          .insert({ title, description, status, userId: 1 })
        
        const insertedTask = await knex<TaskAttributes>('tasks')
          .where('id', newTask)
          .first()

        return { ...insertedTask }
      } catch (error) {
        throw Error(error)
      }
    },
    moveTask: async (parent, args, contextValue, info) => {
      const { id, status } = args
      if(!isValidStatus(status)){
        throw new Error("invalid status")
      }
      
      const task = await knex<TaskAttributes>('tasks')
        .where('id', id)
        .update({ status })
      
      const updatedTask = await knex<TaskAttributes>('tasks')
        .where('id', task)
        .first()

      return { ...updatedTask }
    },
    archiveTask: async (parent, args, contextValue, info) => {
      const { id } = args

      const task = await knex<TaskAttributes>('tasks')
        .where('id', id)
        .update({ status: Status.ARCHIVED })
      
      const updatedTask = await knex<TaskAttributes>('tasks')
        .where('id', task)
        .first()

      return { ...updatedTask }
    }
  }
};