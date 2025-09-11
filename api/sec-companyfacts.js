export default async function handler(req, res) {
  const { cik } = req.query;
  const url = `https://data.sec.gov/api/xbrl/companyfacts/${cik}.json`;
  const r = await fetch(url, {
    headers: { 'User-Agent': 'BubbleHub-StockEval/1.0 (you@example.com)' }
  });
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const data = await r.json();
  res.status(r.ok ? 200 : r.status).json(data);
}
