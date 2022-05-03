import { app } from "./src/Router/UserRoute.ts";


app
.start({ port: 8080 });

console.log('Server is running on port 8080');
