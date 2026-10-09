const envContent = "SUPABASE_SERVICE_ROLE_KEY=YOUR_SECRET_KEY\\r\\n";
const manualEnv = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || '';
    value = value.replace(/^(['"])(.*)\1$/, '$2'); // remove quotes
    manualEnv[key] = value;
  }
});
console.log('Value length:', manualEnv.SUPABASE_SERVICE_ROLE_KEY?.length);
console.log('Characters:', manualEnv.SUPABASE_SERVICE_ROLE_KEY?.split('').map(c => c.charCodeAt(0)));
