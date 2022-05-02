import { RouterMiddleware, bcrypt, createToken, verifyToken, validator } from "../../../deps.ts";
import { user } from "../../Schema/UserSchema.ts";
import { KEY } from "../../Utils/jwtConst.ts";
import { USER_CREATED } from "../../Utils/userConst.ts";

export const getAllUsers:RouterMiddleware<string> = async(ctx) => {     
    try {
        const users = await user.find().toArray();
        
        ctx.response.body = users;
        ctx.response.status = 200;
    } catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = JSON.stringify({error});
    }
}

export const getUser:RouterMiddleware<string> = async (ctx) => {
    try {        
        const userFind = await user.findOne({email: ctx.params.email});
       ctx. response.body = userFind;
       ctx. response.status = 200;
    } catch (error) {
        console.error(error);
       ctx. response.status = 500;
       ctx. response.body = JSON.stringify({error});
    }
}

export const createUser:RouterMiddleware<string> = async (ctx) => {
    try {        
        let {email, password } = await ctx.request.body().value;

        const userFinded = await user.findOne({email});
        if(userFinded){
            ctx.response.status = 409;
            ctx.response.body = {error: "User already exists"};
            return;
        }
        const is_email_validated = validator.isEmail(email, { allow_display_name: true })
        const is_strong_password = validator.isLength(password, { min: 8 })
        
        if(is_email_validated && is_strong_password) {
            const password_hash = await bcrypt.hash(password);
            await user.insertOne({email, password_hash});
             ctx.response.body = {message: USER_CREATED};
             ctx.response.status = 200;
             return
        }

        ctx.response.status = 400;
        ctx.response.body = {error: "email and password must be valid"};

    } catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = JSON.stringify({error});
    }
}

export const loginUser:RouterMiddleware<string> = async (ctx) => {
    try {
        let {email, password } = await ctx.request.body().value;
        const userFind = await user.findOne({email});
        if (typeof userFind !== 'undefined') {
            const password_hash = userFind.password_hash;

            const isValid = await bcrypt.compare(password, password_hash);
            if(!isValid) return ctx.response.status = 401;
                
                let token = await createToken({ alg: "HS512", typ: "JWT" }, {user: userFind._id}, KEY);
                ctx.response.body = {message: 'Login Success', token};
                ctx.response.status = 200;
        }
    } catch (error) {
        console.error(error);
        ctx.response.status = 500;
        ctx.response.body = JSON.stringify({error});
    }
}

export const verifyUser:RouterMiddleware<string> = async (ctx, next) => {
    try {
        let bearer_token = ctx.request.headers.get('authorization');
        const token = bearer_token && bearer_token.split(' ')[1];
        if(token !== null) {
            const decoded = await verifyToken(token, KEY);
            if (!decoded) {
                ctx.response.status = 500
                ctx.response.body = {message: 'Invalid Token'};
            };
            ctx.response.body = decoded;
            return await next();
        }
    } catch (error) {
        console.log(error, 'error');
        ctx.response.status = 500;
        ctx.response.body = {error: error.message};
    }
}