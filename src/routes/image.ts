import { Router } from 'express';
import { imageUpload } from '../controllers/image';

const router = Router();
import multer from 'multer';

const uploadFile = multer({
  storage: multer.memoryStorage(),
}).single('file');

router.post('/image/upload', uploadFile, imageUpload);

export default router;
