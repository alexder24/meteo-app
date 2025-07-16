import { useState } from 'react';
import { Title } from '@mantine/core';
import TimeRangeSelector from './TimeRangeSelector';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTemperatureData } from '../hooks/useTemperatureData';
import { TemperatureLoader } from './TemperatureLoader';
import { TemperatureError } from './TemperatureError';
import { TemperatureNoData } from './TemperatureNoData';
import type { TimeRange } from '../utils/temperature';

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface TemperatureChartProps {
  location: Location;
}

export default function TemperatureChart({ location }: TemperatureChartProps) {
  const [range, setRange] = useState<TimeRange>('24h');
  const { data, loading, error } = useTemperatureData(location.lat, location.lon, range);

  return (
    <div>
      <Title order={3} mb="sm" style={{ textAlign: 'center', color: '#228be6' }}>{location.name}</Title>
      <TimeRangeSelector value={range} onChange={v => setRange(v as TimeRange)} />
      {loading && <TemperatureLoader />}
      {error && <TemperatureError error={error} />}
      {!loading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={t => range === '3d' || range === '7d' ? t : t.slice(11, 16)} minTickGap={16} />
            <YAxis domain={['auto', 'auto']} unit="°C" allowDecimals />
            <Tooltip formatter={(v: number) => `${v}°C`} labelFormatter={l => range === '3d' || range === '7d' ? l : l.replace('T', ' ')} />
            <Line type="monotone" dataKey="temp" stroke="#228be6" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {!loading && !error && data.length === 0 && <TemperatureNoData />}
    </div>
  );
} 