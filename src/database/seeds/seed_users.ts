import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    const saltRounds = 10;
    const password = bcrypt.hashSync("Pass@123", saltRounds);

    await knex("users").insert([
        {
          id: 1,
          firstName: "Eric",
          lastName: "Pereira",
          email: "eric.pereira@hotmail.com",
          password
        },
        {
          id: 2,
          firstName: "Travis",
          lastName: "Scott",
          email: "travisscott@hotmail.com",
          password
        },
    ]);
};
