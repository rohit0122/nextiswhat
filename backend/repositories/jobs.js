import prisma from  '../connector/prisma';

export async function getJobs() { 
    return await prisma.jobs.findMany().then(result => result); 
}