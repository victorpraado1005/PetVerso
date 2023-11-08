var jwt = require('jsonwebtoken');

exports.isAuth = async (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(401).json({ error: 'Missing Access Token' });
  }

  const token = request.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, function(err, res) {
      if (err) {
        return response.status(401).json({ error: 'Invalid Access Token' });
      } else {
        next();
      }
    });

}
