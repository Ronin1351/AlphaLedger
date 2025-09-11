export default async function handler(req, res) {
  const r = await fetch('https://www.sec.gov/files/company_tickers.json', {
    headers: { 'User-Agent': 'BubbleHub-StockEval/1.0 (you@example.com)' }
  });
  res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate'); // 7 days
  res.setHeader('Access-Control-Allow-Origin', '*');
  const data = await r.json();
  res.status(r.ok ? 200 : r.status).json(data);
}
