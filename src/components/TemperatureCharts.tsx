import TemperatureChart from './TemperatureChart';

const locations = [
  { name: 'Амстердам', lat: 52.3676, lon: 4.9041 },
  { name: 'Нью-Йорк', lat: 40.7128, lon: -74.006 },
  { name: 'Токио', lat: 35.6895, lon: 139.6917 },
];

export default function TemperatureCharts() {
  return (
    <div className="temperature-grid">
      {locations.map((loc) => (
        <div key={loc.name} style={{ height: '100%' }}>
          <TemperatureChart location={loc} />
        </div>
      ))}
    </div>
  );
} 