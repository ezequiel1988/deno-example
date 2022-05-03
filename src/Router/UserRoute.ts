import { app } from "./HomeRoute.ts";
import { verifyUser,
    loginUser,
    createUser,
    getUser,
    getAllUsers } from '../Controller/User/UserController.ts';
    

app.get('/api/v1/users', getAllUsers);
app.get('/api/v1/users/:email', getUser);
app.post('/api/v1/users', createUser);
app.post('/api/v1/users/login', loginUser);

export { app }