import express from 'express';

import { getAllUsers, deleteUser, updateUser , getUserListHandler , getUser  } from '../controllers/users';

export default (router: express.Router) => {
  router.get('/users', getAllUsers);
  router.get('/user', getUserListHandler);
  router.get('/user/profile/:dataUser', getUser);
  router.delete('/users/:id', deleteUser);
  router.patch('/users/:id', updateUser);
  router.put('/users', updateUser);
};
