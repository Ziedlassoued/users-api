import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use((request, _response, next) => {
  console.log('Request received', request.url);
  next();
});

app.use(express.json());

app.use(cookieParser());

const users = [
  {
    name: 'David',
    username: 'Dave',
    password: 'aaa',
  },
  {
    name: 'Anke',
    username: 'Anke99',
    password: 'bbb',
  },
  {
    name: 'Alice',
    username: 'Alice77',
    password: 'kkk',
  },
  {
    name: 'Zied',
    username: 'Zied66',
    password: 'bbb',
  },
];

app.get('/api/me', (request, response) => {
  const username = request.cookies.username;
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    response.send(foundUser);
  } else {
    response.status(404).send('User not found');
  }
});

app.post('/api/login/', (request, response) => {
  const validUser = users.find(
    (user) =>
      user.username === request.body.username &&
      user.password === request.body.password
  );
  if (validUser) {
    response.setHeader('Set-Cookie', `username=${validUser.username}`);
    response.send('login successful');
  } else {
    response.status(401).send('username or password is incorrect');
  }
});

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  const isNameknow = users.includes(newUser.name);

  if (isNameknow) {
    response.status(409).send('User is available');
  } else users.unshift(newUser);
  response.send(`${newUser.name} added`);
});

app.delete('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    const filtered = users.filter(
      (user) => user.username != request.params.username
    );
    response.send(filtered);
  } else {
    response.status(404).send('User ist not available');
  }
});

app.get('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);

  if (user) {
    response.send(user);
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
