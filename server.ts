import { Application } from "./deps.ts";
import { router } from "./src/Router/indexRouter.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());


console.log('Server is running on port 8080');

await app.listen({ port: 8080 });