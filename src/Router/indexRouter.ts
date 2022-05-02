import { Router } from '../../deps.ts';
import { router as UserRoute } from './UserRoute.ts'
import { router as HomeRoute } from './HomeRoute.ts'


const router = new Router();

router.use(UserRoute.routes())
router.use(HomeRoute.routes())


export { router };