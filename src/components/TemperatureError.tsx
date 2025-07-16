import { Alert } from '@mantine/core';

export const TemperatureError = ({ error }: { error: string }) => (
  <Alert color="red" title="Ошибка" mt="sm">{error}</Alert>
); 