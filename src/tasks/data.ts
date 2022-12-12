import { Status, TaskAttributes } from "./type";

export const tasksMock: Array<TaskAttributes> = [
  {
    id: '8559cbf257197f06',
    title: 'First task',
    description: 'Hello world task',
    status: Status.TO_DO,
    createdAt: new Date(),
    owner: 'first'
  },
  {
    id: '3bfb2768b442d49f',
    title: 'Second task',
    description: 'Hello world task',
    status: Status.IN_PROGRESS,
    createdAt: new Date(),
    owner: 'first'
  }
]