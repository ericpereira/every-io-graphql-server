import { Status } from "../tasks/type";
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import * as dotenv from 'dotenv'
dotenv.config()

const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const isValidStatus = (status: string) => Object.values<string>(Status).includes(status)
const getUser = async (token: string) => {
  try {
    return verify(token.split(" ")[1], process.env.TOKEN_HASH)
  } catch (error) {
    return null
  }
}

export { genRanHex, isValidStatus, getUser }