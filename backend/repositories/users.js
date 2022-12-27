import prisma from '../connector/prisma';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function getUsers() {
    return await prisma.users.findMany().then(result => result);
}

export async function doSignUp(userData){
    const userInfo = await prisma.users.create({
        data: {
            firstName:userData.firstName,
            lastName:userData.lastName,
            username:userData.email,
            email:userData.email,
            password: userData.password,
            createdAt:'2022-09-07T15:18:36.159Z',
            updatedAt: '2022-09-07T15:18:36.159Z'
        }
    }).catch(function(error){
        console.log('userinfo============', error);
    });
   
    return userInfo;
}

export async function doLogin({username, password}) {
    const userInfo = await prisma.users.findFirst({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
        },
        where: {
            email: username,
            password: password,
            status: true
        }
    }).then(result => result);
    console.log('userInfo', userInfo);

    let data;
    if (userInfo) {
        let tokenData = {
            time: Date(),
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            role: 'admin'
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET);
        data = {
            ... userInfo,
            token
        };
    }
    return data

}
