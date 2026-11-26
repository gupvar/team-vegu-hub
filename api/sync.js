const fs = require('fs');
const path = require('path');

const TMP_FILE = path.join('/tmp', 'team_vegu_hub_state.json');
let memoryStore = null;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    if (req.method === 'GET') {
      if (kvUrl && kvToken) {
        const kvRes = await fetch(`${kvUrl}/get/team_vegu_hub_state`, {
          headers: { Authorization: `Bearer ${kvToken}` }
        });
        const kvData = await kvRes.json();
        if (kvData && kvData.result) {
          const parsed = typeof kvData.result === 'string' ? JSON.parse(kvData.result) : kvData.result;
          return res.status(200).json(parsed);
        }
      }
      if (memoryStore) {
        return res.status(200).json(memoryStore);
      }
      if (fs.existsSync(TMP_FILE)) {
        const raw = fs.readFileSync(TMP_FILE, 'utf8');
        return res.status(200).json(JSON.parse(raw));
      }
      return res.status(200).json({ status: 'empty' });
    }

    if (req.method === 'POST') {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      memoryStore = payload;
      try {
        fs.writeFileSync(TMP_FILE, JSON.stringify(payload), 'utf8');
      } catch (e) {}

      if (kvUrl && kvToken) {
        await fetch(`${kvUrl}/set/team_vegu_hub_state`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${kvToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }
      return res.status(200).json({ ok: true, syncedAt: new Date().toISOString() });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
