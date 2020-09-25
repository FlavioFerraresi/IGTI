import http from 'http';

http
  .createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/teste') {
      res.write('get /teste executado com sucesso');
    } else {
      res.write('helo world 2!');
    }

    res.statusCode = 200;
    res.end();
  })
  .listen(8080);
