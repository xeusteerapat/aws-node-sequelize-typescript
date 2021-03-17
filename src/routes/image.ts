import { Router } from 'express';
import { imageUpload } from '../controllers/image';

const router = Router();
import multer from 'multer';
import { uploadFileToAws } from '../config/aws';

const uploadFile = multer({
  storage: multer.memoryStorage(),
}).single('file');

router.post('/image/upload', uploadFile, imageUpload);
router.post('/image/aws', uploadFile, uploadFileToAws);

export default router;
