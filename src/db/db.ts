import { MongoClient } from '../../deps.ts'

const client = new MongoClient();

    try {
        await client.connect('mongodb+srv://admin:1q2w3e4r5t@example.oevro.mongodb.net/deno-db?authMechanism=SCRAM-SHA-1&retryWrites=true&w=majority');
        console.log('Connected to database');
        
    } catch (error) {
        console.error(error);
    }

    export const db = client.database('deno');
