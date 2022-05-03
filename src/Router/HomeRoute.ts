import { Application } from "../../deps.ts";

const app = new Application();

app.get('/', async (ctx) => {
    return {
        message: "Gracias por usar nuestra API. Para más información envie un correo a: ekiolivier@gmail.com"
    };
});


export { app }