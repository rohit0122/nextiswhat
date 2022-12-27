import nextConnect from 'next-connect';
import { verifyToken } from './utils';

const middleware = nextConnect();

/* Sample using middleware */
/* middleware.use(database).use(session).use(passport.initialize()).use(passport.session()); */

/* Set restricted public access / put any api access that is restricted in here */
const restricted = ['/api/users'];

/*
 * @params {request, response, callback} default Request and Response
 * @return {object} object if true, response message if false and continue
 */
export default middleware.use(async (req, res, next) => {
  let authHeader = req.headers.authorization || '';
  let user = {};

  if (!restricted.includes(req.url) && !authHeader) {
    return next();
  }
  if (authHeader) {
    let sessionID = authHeader.split(' ')[1];
    if (sessionID) {
      user = verifyToken(sessionID);
      if (user) {
        console.log('user=================', user); 
        /* Could put check against users tables in database  User.find({email:user.email}) */
        req.user = user;
      } else {
        res.statusCode = 401;
        return res.send({
          statusCode: 401,
          message: 'Expired',
          data:[]
        });
      }
    } else {
      res.statusCode = 401;
      return res.send({
        statusCode: 401,
        message: 'Wrong Token',
        data:[]
      });
    }
  } else {
    res.statusCode = 401;
    return res.send({
      statusCode: 401,
      message: 'Unauthorized',
      data:[]
    });
  }
  return next();
});
