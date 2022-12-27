// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import { getJobs } from '../../backend/repositories/jobs';
import middleware from '../../backend/middleware/auth';

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const jobs = await getJobs();
    const response = {
      statusCode: 200,
      message: 'Jobs List',
      data: jobs
    };
    res.status(200).json(response)
  });

/*export default async function handler(req, res) {
  const jobs = await getJobs();
  const response = {
    statusCode: 200,
    message: 'Jobs List',
    data: jobs
  };
  res.status(200).json(response)
}*/

export default handler;