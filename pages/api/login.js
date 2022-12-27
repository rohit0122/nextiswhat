// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import { doLogin } from '../../backend/repositories/users';
import cors from 'cors';

const handler = nextConnect().use(cors()).post(async (req, res) => {
    console.log('Login request');
    console.log(req.body);

    const userInfo = await doLogin(req.body);
    const response = {
        statusCode: userInfo ? 200 : 404,
        message: userInfo ? 'Users data' : 'User not found',
        data: userInfo ? userInfo : []
    };
    console.log(response);

    res.status(response.statusCode).json(response)

});
export default handler;

/*
export default async function handler(req, res) {
    console.log('Login request');
    const userInfo = await doLogin(req.body);
    const response = {
        statusCode: userInfo ? 200 : 404,
        message: 'Users data',
        data: userInfo
    };
    res.status(response.statusCode).json(response)
}
*/
