import { Status } from "../tasks/type";

const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const isValidStatus = (status: string) => Object.values<string>(Status).includes(status)
export { genRanHex, isValidStatus }