import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const users = ['David', 'Anke', 'Alice', 'Zied'];

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  const isNameknow = users.includes(newUser.name);

  if (isNameknow) {
    response.status(409).send('User is available');
  } else users.unshift(newUser.name);
  response.send(`${newUser.name} added`);
});

app.delete('/api/users/:name', (request, response) => {
  const usersIndex = users.indexOf(request.params.name);
  if (usersIndex === -1) {
    response.status(404).send('User ist not available');
    return;
  }
  users.splice(usersIndex, 1);
  response.send('Deleted');
});

app.get('/api/users/:name', (request, response) => {
  const isNameknow = users.includes(request.params.name);
  if (isNameknow) {
    response.send(request.params.name);
  } else {
    response.status(404).send('User ist not available');
  }
});

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
