import { Status } from "../graphql/type";
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from "bcrypt";


const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const isValidStatus = (status: string) => Object.values<string>(Status).includes(status)
const getUser = async (token: string) => {
  try {
    return verify(token.split(" ")[1], process.env.TOKEN_HASH)
  } catch (error) {
    return null
  }
}
const hashPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export { genRanHex, isValidStatus, getUser, hashPassword }