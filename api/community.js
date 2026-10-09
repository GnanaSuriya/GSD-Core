import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { name, email, favoriteVideo, message } = req.body;

    const { error } = await supabase
      .from('community_members')
      .insert([
        { 
          name, 
          email, 
          favorite_video: favoriteVideo,
          message 
        }
      ]);

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Duplicate email' });
      }
      return res.status(400).json({ error: error.message, code: error.code });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
