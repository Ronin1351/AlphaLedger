export default async function handler(req, res) {
  const { cik } = req.query;
  if (!/^\d{10}$/.test(String(cik || ''))) {
    res.status(400).json({ error: 'bad CIK' }); return;
  }
  const url = `https://data.sec.gov/api/xbrl/companyfacts/${cik}.json`;
  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'UnifiedStockEvaluator/1.0 (you@example.com)',
        'Accept': 'application/json'
      }
    });
    const text = await r.text();
    if (!r.ok) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(r.status).json({ error: true, status: r.status, body: text.slice(0, 2000) });
    }
    let data; try { data = JSON.parse(text); } catch { return res.status(502).json({ error:true, status:502, body:'Invalid JSON from SEC' }); }
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error:true, message:String(e) });
  }
}
