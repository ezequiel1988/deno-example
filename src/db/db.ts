import { MongoClient, config } from '../../deps.ts'

const client = new MongoClient();
const URI = config().URI;

    try {
        await client.connect(URI);
        console.log('Connected to database');
        
    } catch (error) {
        console.error(error);
    }

    export const db = client.database('deno');
