import { Router } from 'express';
import { addUser, getUsers, getUser } from '../controllers/user';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', addUser);

export default router;
