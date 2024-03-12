import { Button, Container, Flex, Stack, Title } from "@mantine/core";
import ProfessorList from "../components/ProfessorList/ProfessorList";
import { useDisclosure } from "@mantine/hooks";
import AddProfessorModal from "../components/AddProfessorModal";

export default function HomePage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <AddProfessorModal opened={opened} close={close} />

      <Container>
        <Stack gap="lg">
          <Flex justify="space-between">
            <Title order={2}>Liste des enseignants actuel</Title>

            <Button
              variant="gradient"
              radius="md"
              gradient={{ from: "violet", to: "indigo", deg: 90 }}
              onClick={open}
            >
              Ajouter un enseignant
            </Button>
          </Flex>

          <ProfessorList />
        </Stack>
      </Container>
    </>
  );
}
