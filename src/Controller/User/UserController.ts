import { HandlerFunc, bcrypt, createToken, verifyToken, validator, MiddlewareFunc } from "../../../deps.ts";
import { user } from "../../Schema/UserSchema.ts";
import { KEY } from "../../Utils/jwtConst.ts";
import { USER_CREATED } from "../../Utils/userConst.ts";


interface User {
    email: string;
    password: string;
}


export const getAllUsers:HandlerFunc = async() => {     
    try {
        const users = await user.find().toArray();  
        return users;
    } catch (error) {
        console.error(error);
        return {error};
    }
}

export const getUser:HandlerFunc = async (ctx) => {
    try {
        const userFind = await user.findOne({email: ctx.params.email});
        return userFind;
    } catch (error) {
        console.error(error);
       return JSON.stringify({error});
    }
}

export const createUser:HandlerFunc = async (ctx) => {
    try {

        let {email, password } = await ctx.body as User;

        const userFinded = await user.findOne({email});
        if(userFinded){
            return {error: "User already exists"};
        }
        const is_email_validated = validator.isEmail(email, { allow_display_name: true })
        const is_strong_password = validator.isLength(password, { min: 8 })
        
        if(is_email_validated && is_strong_password) {
            const password_hash = await bcrypt.hash(password);
            await user.insertOne({email, password_hash});
             return {message: USER_CREATED};
             
        }

        return {error: "email and password must be valid"};

    } catch (error) {
        console.error(error);
        return JSON.stringify({error});
    }
}

export const loginUser:HandlerFunc = async (ctx) => {
    try {
        let {email, password } = await ctx.body as User;
        const userFind = await user.findOne({email});
        if (typeof userFind !== 'undefined') {
            const password_hash = userFind.password_hash;
            const isValid = await bcrypt.compare(password, password_hash);
            if(!isValid) return {error: "Invalid password"};
                
                let token = await createToken({ alg: "HS512", typ: "JWT" }, {user: userFind._id}, KEY);
                return {message: 'Login Success', token};
        }
    } catch (error) {
        console.error(error);
        return JSON.stringify({error});
    }
}

export const verifyUser: MiddlewareFunc = (next) => async (ctx) => {
    console.log(ctx);
    
    // try {
    //     let bearer_token = ctx.request.headers.get('authorization');
    //     const token = bearer_token && bearer_token.split(' ')[1];
    //     if(token !== null) {
    //         const decoded = await verifyToken(token, KEY);
    //         if (!decoded) {
    //             ctx.response.status = 500
    //             return {message: 'Invalid Token'};
    //         };
    //         return await next(ctx);
    //     }
    // } catch (error) {
    //     console.log(error, 'error');
    //     return  {error: error.message};
    // }
}