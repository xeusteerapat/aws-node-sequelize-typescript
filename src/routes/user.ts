import { Router } from 'express';
import { getSignedUrlImage } from '../controllers/image';
import { addUser, getUsers, getUser } from '../controllers/user';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', addUser);

router.get('/signed-url/:fileName', getSignedUrlImage);

export default router;
