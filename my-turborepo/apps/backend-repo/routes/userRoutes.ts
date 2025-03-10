import { Router } from 'express';
import { fetchUserData, updateUserData, userLogin } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', userLogin);
router.use(authMiddleware);
router.get('/fetch-user-data', fetchUserData);
router.put('/update-user-data/:userId', updateUserData);

export default router;