export type TimeRange = '3h' | '6h' | '12h' | '24h' | '3d' | '7d';

export const rangeToHours: Record<TimeRange, number> = {
  '3h': 3,
  '6h': 6,
  '12h': 12,
  '24h': 24,
  '3d': 72,
  '7d': 168,
};

export function buildTemperatureApiUrl(lat: number, lon: number, range: TimeRange) {
  const now = new Date();
  const end = now.toISOString().split('.')[0] + 'Z';
  const start = new Date(now.getTime() - rangeToHours[range] * 60 * 60 * 1000).toISOString().split('.')[0] + 'Z';
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&start_date=${start.slice(0,10)}&end_date=${end.slice(0,10)}`;
}

export function aggregateChartData(data: { time: string, temp: number }[], range: TimeRange) {
  if (range === '3d' || range === '7d') {
    const dayMap: Record<string, { sum: number; count: number }> = {};
    data.forEach(({ time, temp }) => {
      const day = time.slice(0, 10);
      if (!dayMap[day]) dayMap[day] = { sum: 0, count: 0 };
      dayMap[day].sum += temp;
      dayMap[day].count += 1;
    });
    return Object.entries(dayMap).map(([day, { sum, count }]) => ({
      time: day,
      temp: +(sum / count).toFixed(1),
    }));
  }
  return data;
} 