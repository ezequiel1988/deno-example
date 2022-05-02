import { Application } from "./deps.ts";
import { router } from "./src/Router/indexRouter.ts";

const app = new Application();

app.use('/', async (ctx) => {
    ctx.response.body = {
        message: "Gracias por usar nuestra API. Para más información envie un correo a: ekiolivier@gmail.com"
    };
})
app.use(router.routes());

console.log('Server is running on port 8080');

await app.listen({ port: 8080 });