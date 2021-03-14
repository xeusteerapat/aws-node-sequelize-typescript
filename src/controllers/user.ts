import { Request, Response } from 'express';
import { User } from '../models/User';

export const addUser = async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();

  res.status(201).send(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.status(200).send(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.status(200).send(user);
};
