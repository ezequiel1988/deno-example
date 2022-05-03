import { MongoClient } from '../../deps.ts'

const client = new MongoClient();

    try {
        await client.connect('');
        console.log('Connected to database');
        
    } catch (error) {
        console.error(error);
    }

    export const db = client.database('deno');
