import express from 'express';
import PersonModel from "../db/users";

import { deleteUserById, getUsers, getUserById , getUserList } from '../db/users';


export const hiApi = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserListHandler = async (req: express.Request, res: express.Response) => {
  try {
    const { limit, offset } = req.query;
    const userList = await getUserList(parseInt(limit as string), parseInt(offset as string));
    return res.status(200).json(userList);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { dataUser } = req.params;

    if (!dataUser || !dataUser.includes('-')) {
      return res.status(400).json({ message: 'Invalid request format' });
    }

    const [firstName, lastName] = dataUser.split('-');
    
    const user = await PersonModel.findOne({ firstName, lastName });

    if (!user) {
      return res.status(300).json({ message: 'User not found' });
    }

    return res.status(200).json(user.toObject());
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    
    const { UrlWebSiteForUser , idUser } = req.body;

    if (!UrlWebSiteForUser) {
      return res.sendStatus(400);
    }

    const user = await getUserById(idUser);
    
    user.UrlWebSiteForUser = UrlWebSiteForUser;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}