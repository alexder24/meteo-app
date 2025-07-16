import { SegmentedControl, Group, rem } from '@mantine/core';

interface TimeRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { label: '3ч', value: '3h' },
  { label: '6ч', value: '6h' },
  { label: '12ч', value: '12h' },
  { label: '24ч', value: '24h' },
  { label: '3д', value: '3d' },
  { label: '7д', value: '7d' },
];

export default function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <Group justify="center" mb="md" gap={rem(12)}>
      <SegmentedControl
        data={options}
        value={value}
        onChange={onChange}
        color="blue"
        fullWidth
        radius="md"
        size="md"
        transitionDuration={200}
        style={{ maxWidth: 420 }}
      />
    </Group>
  );
} 