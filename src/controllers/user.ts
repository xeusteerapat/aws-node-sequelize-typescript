import { Request, Response } from 'express';
import { getGetSignedUrl } from '../config/aws';
import { User } from '../models/User';

export const addUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, profileUrl } = req.body;

  const user = new User({
    firstname,
    lastname,
    email,
    profileUrl,
  });

  await user.save();

  res.status(201).send(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  users.map(user => (user.profileUrl = getGetSignedUrl(user.profileUrl)));

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
