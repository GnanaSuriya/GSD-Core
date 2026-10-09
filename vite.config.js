import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      {
        name: 'admin-api',
        configureServer(server) {
          server.middlewares.use('/api/admin/submissions', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            
            // Dynamically load env on each request manually to bypass any Vite caching
            const envPath = path.resolve(process.cwd(), '.env');
            let manualEnv = { ...env };
            if (fs.existsSync(envPath)) {
              const envContent = fs.readFileSync(envPath, 'utf-8');
              envContent.split('\n').forEach(line => {
                const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
                if (match) {
                  let key = match[1];
                  let value = match[2] || '';
                  value = value.replace(/^(['"])(.*)\1$/, '$2'); // remove quotes
                  manualEnv[key] = value;
                }
              });
            }
            
            // 1. Verify simple admin password from header
            const adminPassword = manualEnv.VITE_ADMIN_PASSWORD || 'admin';
            const authHeader = req.headers.authorization;
            if (authHeader !== `Bearer ${adminPassword}`) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: { message: 'Unauthorized: Invalid admin password' } }));
              return;
            }

            // 2. Load server-side credentials
            const supabaseUrl = manualEnv.VITE_SUPABASE_URL;
            const supabaseServiceRoleKey = manualEnv.SUPABASE_SERVICE_ROLE_KEY;
            
            if (!supabaseServiceRoleKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ 
                error: { 
                  message: 'Missing SUPABASE_SERVICE_ROLE_KEY in environment', 
                  details: 'Add SUPABASE_SERVICE_ROLE_KEY to your .env file to allow the secure backend to bypass RLS and fetch submissions.',
                  code: 'NO_SERVICE_KEY'
                } 
              }));
              return;
            }

            try {
              // 3. Create Supabase client with service-role key (bypasses RLS)
              const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
              const { data, error } = await supabase
                .from('community_members')
                .select('*')
                .order('created_at', { ascending: false });

              if (error) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error }));
              } else {
                res.end(JSON.stringify({ data }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: { message: err.message } }));
            }
          });
        }
      }
    ],
  }
})
