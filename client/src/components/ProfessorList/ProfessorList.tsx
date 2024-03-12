import {
  Box,
  Center,
  Grid,
  Pagination,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ProfessorItem from "./ProfessorItem";
import { useQuery } from "@tanstack/react-query";
import { getProfessors } from "../../apis";
import { useState } from "react";

export default function ProfessorList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["professors", page],
    queryFn: () => getProfessors({ page }),
  });

  if (isLoading) {
    return <Center>Chargement...</Center>;
  }

  if (isError) {
    return <Center>Erreur lors du chargement des enseignants</Center>;
  }

  const professors = data?.data;
  const totalResults = data?.meta.total;

  return (
    <Box mb="xl">
      <Stack gap="md" pb="xl" mt="xl">
        <Grid px="md">
          <Grid.Col span={2}>
            <Title order={4}>Numéro</Title>
          </Grid.Col>

          <Grid.Col span={3}>
            <Title order={4}>Nom</Title>
          </Grid.Col>

          <Grid.Col span={2}>
            <Title order={4}>Taux horaire</Title>
          </Grid.Col>

          <Grid.Col span={2.5}>
            <Title order={4}>Nombre d'heures</Title>
          </Grid.Col>

          <Grid.Col span={2.5}>
            <Title order={4}>Actions</Title>
          </Grid.Col>
        </Grid>
        {professors?.map((professor) => (
          <ProfessorItem professor={professor} />
        ))}
      </Stack>
      <Pagination
        total={totalResults ?? 0}
        color="indigo"
        onChange={setPage}
        value={page}
      />
    </Box>
  );
}
