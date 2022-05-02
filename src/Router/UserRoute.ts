import { Router } from '../../deps.ts';
import { verifyUser,
 loginUser,
 createUser,
 getUser,
 getAllUsers } from '../Controller/User/UserController.ts';

const router = new Router();

router.get('/api/v1/users', verifyUser,getAllUsers);
router.get('/api/v1/users/:email', getUser);
router.post('/api/v1/users', createUser);
router.post('/api/v1/users/login', loginUser);

export { router }