import { Router } from '../../deps.ts';


const router = new Router();

router.get('/', async (ctx) => {
    ctx.response.body = {
        message: "Gracias por usar nuestra API. Para más información envie un correo a: ekiolivier@gmail.com"
    };
});


export { router }