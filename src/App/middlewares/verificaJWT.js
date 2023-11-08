var jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const hasToken = request.headers.authorization;

  if (!hasToken) {
    console.log(request.url);
    console.log(request.method);
    if (request.url === '/users/login') {
      console.log('caiu aqui');
      return next();
    }

    if (request.url === '/users' && request.method === 'POST') {
      return next();
    }
  } else {
    console.log('continuou nessa merda');
    return response.status(401).json({ error: 'Missing Access Token' });
  }

  const accessToken = hasToken.split(' ')[1];

  jwt.verify(accessToken, process.env.JWT_SECRET, function(err, res) {
    if (err) {
      return response.status(401).json({ error: 'Invalid Access Token' });
    } else {
      next();
    }
  });
}
