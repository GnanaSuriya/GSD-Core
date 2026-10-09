import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env'), override: true });
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);
