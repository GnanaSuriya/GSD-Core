import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const adminPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin';
  const authHeader = req.headers.authorization;

  if (authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ error: { message: 'Unauthorized: Invalid admin password' } });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ 
      error: { 
        message: 'Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL in environment',
        code: 'NO_SERVICE_KEY'
      } 
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { data, error } = await supabase
      .from('community_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
