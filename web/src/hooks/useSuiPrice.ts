import { useEffect, useState } from 'react';

// Fetch SUI/USD price from CoinGecko
const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd';

export function useSuiPrice() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      setLoading(true);
      try {
        const res = await fetch(COINGECKO_API);
        const data = await res.json();
        setPrice(data.sui.usd);
        setError(null);
      } catch (err) {
        setError('Failed to fetch SUI price');
      } finally {
        setLoading(false);
      }
    }
    fetchPrice();
    // Optionally refresh every minute
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return { price, loading, error };
}
