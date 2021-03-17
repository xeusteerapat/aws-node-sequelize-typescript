import { NextFunction, Response, Request } from 'express';
import AWS = require('aws-sdk');
import dotenv from 'dotenv';

dotenv.config();

const { AWS_PROFILE, AWS_REGION, AWS_MEDIA_BUCKET } = process.env;

//Configure AWS
var credentials = new AWS.SharedIniFileCredentials({ profile: AWS_PROFILE });
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: AWS_REGION,
  // params: { Bucket: AWS_MEDIA_BUCKET },
});

/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('getObject', {
    Bucket: AWS_MEDIA_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl(key: string) {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('putObject', {
    Bucket: AWS_MEDIA_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

// ### Another way to upload file ### //
const S33 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export async function uploadFileToAws(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const imagemin = require('imagemin');

  const { buffer } = req.file;

  const image = await imagemin.buffer(buffer);

  const params = {
    Bucket: AWS_MEDIA_BUCKET as string,
    Key: req.file.originalname,
    Body: image,
    ContentType: 'image/png',
    ACL: 'public-read',
  };

  interface UploadSuccess {
    ETag: string;
    ServerSideEncryption: string;
    Location: string;
    key: string;
    Key: string;
    Bucket: string;
  }

  const uploadResult: UploadSuccess = await new Promise((resolve, reject) => {
    S33.upload(params, (err: any, data: any) =>
      err == null ? resolve(data) : next(reject(err))
    );
  });

  res.send({ uploadUrl: uploadResult.Location });
}
