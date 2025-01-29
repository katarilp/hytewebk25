import e from 'express';

const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

//listaa kaikki käyttäjät

const getUsers = (req, res) => {
  res.json(users);
};

// create new user

const addUser = (req, res) => {
  console.log('addUser request body', req.body);
  const {username, password, email} = req.body;
  if (username && password && email) {
    const latestID = users[users.length - 1].id;
    const newUser = {
      id: latestID + 1,
      username: username,
      password: password,
      email: email,
    };
    users.push(newUser);
    res.status(201);
    return res.json({message: 'User added'});
  }
  res.status(400);
  return res.json({message: 'Request is missing username, password or email property!'});
};

// get user by username & password

const getUser = (req, res) => {
  console.log('getUser', req.params.username);
  const user = users.find(
    (user) =>
      user.username == req.params.username &&
      user.password == req.params.password,
  );
  console.log('user found', user);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

// get user by id
const getUserById = (req, res) => {
  console.log('getUserById', req.params.id);
  const user = users.find((user) => user.id == req.params.id);
  console.log('user found', user);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
};


//kirjautuminen
const login = (req, res) => {
  const{username, password} = req.body;
  if(!username) {
    return res.status(401).json({message: 'Username missing!'});
  }
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    res.json({message: 'Login successful', user});
  } else {
    res.status(401).json({message: 'Invalid username or password!'});
  }
};


export {getUser, addUser, getUsers, getUserById, login};
