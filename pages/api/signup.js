// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import { doSignUp } from '../../backend/repositories/users';
import cors from 'cors';

const handler = nextConnect().use(cors()).post(async (req, res) => {
    console.log('Register request');
    console.log(req.body);

    const userInfo = await doSignUp(req.body);
    const response = {
        statusCode: userInfo ? 200 : 404,
        message: userInfo ? 'Users Registered Succesfully' : 'Error while saving.',
        data: userInfo ? userInfo : []
    };
    console.log(response);

    res.status(response.statusCode).json(response)

});
export default handler;
