import { useState, useEffect } from 'react';
import type { TimeRange } from '../utils/temperature';
import { buildTemperatureApiUrl, aggregateChartData, rangeToHours } from '../utils/temperature';

export function useTemperatureData(lat: number, lon: number, range: TimeRange) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const url = buildTemperatureApiUrl(lat, lon, range);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        const json = await res.json();
        const times: string[] = json.hourly.time;
        const temps: number[] = json.hourly.temperature_2m;
        const now = new Date();
        const end = now.toISOString().split('.')[0] + 'Z';
        const start = new Date(now.getTime() - rangeToHours[range] * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z';
        const filtered = times.map((t, i) => ({ time: t, temp: temps[i] }))
          .filter((d) => {
            const dt = new Date(d.time).getTime();
            return dt >= new Date(start).getTime() && dt <= new Date(end).getTime();
          });
        setData(aggregateChartData(filtered, range));
      } catch (e: any) {
        setError(e.message === 'Failed to fetch'
          ? 'Не удалось получить данные с сервера'
          : e.message || 'Ошибка');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [lat, lon, range]);

  return { data, loading, error };
} 