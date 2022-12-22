import bcrypt from "bcrypt";
import { isValidStatus } from "../utils/common";
import { Status, Task, User } from "./type";
import knex from '../database/connection';

import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;

export const resolvers = {
  Query: {
    tasks: async () => {
      try {
        const tasks = await knex<Task>('tasks')
        return tasks  
      } catch (error) {
        throw new Error(error)
      }
    },
    login: async (parent, args, contextValue, info) => {
      try {
        const { email, password } = args

        const user = await knex<User>('users')
          .where('email', email)
          .first()
          
        const match = await bcrypt.compare(password, user.password);
        if(match) {
          const token = sign({ foo: 'bar' }, 'RANDOM_TOKEN');
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
    addTask: async (parent, args, contextValue, info) => {
      try {
        const { title, description, status } = args
        if(!isValidStatus(status)){
          throw new Error("invalid status")
        }

        const newTask = await knex<Task>('tasks')
          .insert({ title, description, status, userId: 1 })
        
        const insertedTask = await knex<Task>('tasks')
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
      
      const task = await knex<Task>('tasks')
        .where('id', id)
        .update({ status })
      
      const updatedTask = await knex<Task>('tasks')
        .where('id', task)
        .first()

      return { ...updatedTask }
    },
    archiveTask: async (parent, args, contextValue, info) => {
      const { id } = args

      const task = await knex<Task>('tasks')
        .where('id', id)
        .update({ status: Status.ARCHIVED })
      
      const updatedTask = await knex<Task>('tasks')
        .where('id', task)
        .first()

      return { ...updatedTask }
    },
    createUser: async (parent, args, contextValue, info) => {
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