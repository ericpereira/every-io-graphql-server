import bcrypt from "bcrypt";
import { isValidStatus } from "../utils/common";
import { MyContext, Status, Task, User } from "./type";
import knex from '../database/connection';
import * as dotenv from 'dotenv'
dotenv.config()

import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

export const resolvers = {
  Query: {
    tasks: async (parent, args, contextValue: MyContext) => {
      const { user } = contextValue
      if(!user) throw new Error('Unauthorized')

      try {
        const tasks = await knex<Task>('tasks').where('userId', user.id)
        return tasks  
      } catch (error) {
        throw new Error(error)
      }
    },
    login: async (parent, args) => {
      try {
        const { email, password } = args

        const user = await knex<User>('users')
          .where('email', email)
          .first()
          
        const match = await bcrypt.compare(password, user.password);
        if(match) {
          const token = sign({ id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email }, process.env.TOKEN_HASH);
          return `Bearer ${token}`;
        }
        throw Error('Password incorrect')
      } catch (error) {
        throw Error(error);
      }
    },
  },
  Status: {
    TO_DO: 'To do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    ARCHIVED: 'Archived'
  },
  Mutation: {
    addTask: async (parent, args, contextValue) => {
      try {
        const { user } = contextValue
        if(!user) throw new Error('Unauthorized')

        const { title, description, status } = args
        if(!isValidStatus(status)){
          throw new Error("invalid status")
        }

        const newTask = await knex<Task>('tasks')
          .insert({ title, description, status, userId: user.id })
        
        const insertedTask = await knex<Task>('tasks')
          .where('id', newTask)
          .first()

        return { ...insertedTask }
      } catch (error) {
        throw Error(error)
      }
    },
    moveTask: async (parent, args, contextValue) => {
      try {
        const { user } = contextValue
        if(!user) throw new Error('Unauthorized')

        const { id, status } = args
        if(!isValidStatus(status)){
          throw new Error("invalid status")
        }

        const oldTask = await knex<Task>('tasks').where('id', id).andWhere('userId', user.id).first()
        if(!oldTask) throw new Error('Invalid task id')
        
        await knex<Task>('tasks')
          .where('id', id)
          .andWhere('userId', user.id)
          .update({ status })
        
        const updatedTask = await knex<Task>('tasks')
          .where('id', id)
          .andWhere('userId', user.id)
          .first()

        return { ...updatedTask }
      } catch (error) {
        throw new Error(error)
      }
    },
    archiveTask: async (parent, args, contextValue) => {
      try {
        const { user } = contextValue
        if(!user) throw new Error('Unauthorized')

        const { id } = args

        const oldTask = await knex<Task>('tasks').where('id', id).andWhere('userId', user.id).first()
        if(!oldTask) throw new Error('Invalid task id')

        await knex<Task>('tasks')
          .where('id', id)
          .andWhere('userId', user.id)
          .update({ status: Status.ARCHIVED })

        const updatedTask = await knex<Task>('tasks')
          .where('id', id)
          .andWhere('userId', user.id)
          .first()

        return { ...updatedTask }
      } catch (error) {
        throw new Error(error)
      }
    },
    createUser: async (parent, args) => {
      try {
        const { firstName, lastName, email, password } = args
        const saltRounds = 10;
        
        const hash = bcrypt.hashSync(password, saltRounds);
        
        const newUser = await knex<User>('users')
          .insert({ firstName, lastName, email, password: hash })
        
        const insertedUser = await knex<User>('users')
          .where('id', newUser)
          .first()

        return { ...insertedUser }
      } catch (error) {
        throw Error(error)
      }
    }
  }
};