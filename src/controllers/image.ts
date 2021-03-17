import { Request, Response } from 'express';
import { getPutSignedUrl } from '../config/aws';

export const getSignedUrlImage = async (req: Request, res: Response) => {
  let { fileName } = req.params;
  const url = getPutSignedUrl(fileName);

  res.status(201).send({ url });
};

export const imageUpload = async (req: Request, res: Response) => {
  console.log(req.file.originalname);

  const url = getPutSignedUrl(req.file.originalname);

  res.status(201).send(url);
};
