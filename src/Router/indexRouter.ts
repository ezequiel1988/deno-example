import { Router } from '../../deps.ts';
import { router as UserRoute } from './UserRoute.ts'

const router = new Router();

router.use(UserRoute.routes())

export { router };