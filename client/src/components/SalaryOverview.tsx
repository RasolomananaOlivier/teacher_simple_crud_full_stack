import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import { formatCurrency } from "../utils";

type Props = {
  min: number;
  max: number;
  total: number;
};

export default function SalaryOverview({ min, max, total }: Props) {
  return (
    <Box py="xl">
      <Title order={3}>Vue d'ensemble des salaires</Title>

      <Flex my="lg" py="lg" px="xl" bg="indigo" style={{ borderRadius: 10 }}>
        <Stack gap="md" c="white">
          <Text fz={28} fw="bold">
            {formatCurrency(min)} Ar
          </Text>
          <Stack gap="xs">
            <Text fz="md">SALAIRE MINIMUM</Text>
            <Text fz="md">
              {formatCurrency(min)} Ar est le salaire minimum actuellement
            </Text>
          </Stack>
        </Stack>

        <Stack gap="md" c="white">
          <Text fz={28} fw="bold">
            {formatCurrency(max)} Ar
          </Text>
          <Text fz="md">SALAIRE MAXMUM</Text>
          <Text fz="md">
            {formatCurrency(max)} Ar est le salaire maximum actuellement
          </Text>
        </Stack>

        <Stack gap="md" c="white">
          <Text fz={28} fw="bold">
            {formatCurrency(total)} Ar
          </Text>
          <Text fz="md">TOTAL DES SALAIRES</Text>
          <Text fz="md">
            {formatCurrency(total)} Ar est le total des salaires actuel
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
