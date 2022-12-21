import { Status, TaskAttributes } from "./type";

export const tasksMock: Array<TaskAttributes> = [
  {
    id: 1,
    title: 'First task',
    description: 'Hello world task',
    status: Status.TO_DO,
    createdAt: new Date(),
    userId: 1
  },
  {
    id: 1,
    title: 'Second task',
    description: 'Hello world task',
    status: Status.IN_PROGRESS,
    createdAt: new Date(),
    userId: 1
  }
]