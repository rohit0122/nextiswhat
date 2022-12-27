// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import {getUsers} from '../../backend/repositories/users';
import middleware from '../../backend/middleware/auth';

const handler = nextConnect().use(middleware).get(async (req, res) => {
    const users = await getUsers();
    const response = {
        statusCode: 200,
        message: 'Users List',
        data: users
    };
    res.status(200).json(response)
});
/*
export default async function handler(req, res) {
  const users = await getUsers();
  const response = {
    statusCode: 200,
    message: 'Users List',
    data: users
  };
  res.status(200).json(response)
}
*/

export default handler;
