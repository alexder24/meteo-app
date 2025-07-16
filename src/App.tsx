import { MantineProvider, Container, Title } from '@mantine/core';
import TemperatureCharts from './components/TemperatureCharts';

function App() {
  return (
    <MantineProvider theme={{}}>
      <Container py="md" style={{ maxWidth: 1920, margin: '0 auto' }}>
        <Title mb="lg" style={{ textAlign: 'center', color: '#2e2e2e' }}>История температур 🌡️</Title>
        <TemperatureCharts />
      </Container>
    </MantineProvider>
  );
}

export default App;
