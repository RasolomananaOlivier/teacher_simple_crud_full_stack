import { ActionIcon, Card, Flex, Grid, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import UpdateProfessorModal from "../UpdateProfessorModal";
import { IProfessor } from "../../types";
import { formatCurrency } from "../../utils";

type Props = {
  professor: IProfessor;
};

export default function ProfessorItem({ professor }: Props) {
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);

  return (
    <>
      <ConfirmDeleteModal
        professorId={professor._id!}
        opened={deleteModalOpened}
        close={closeDeleteModal}
      />
      <UpdateProfessorModal
        professor={professor}
        opened={editModalOpened}
        close={closeEditModal}
      />

      <Card shadow="sm" radius="md">
        <Grid>
          <Grid.Col span={1}>
            <Text>{professor.code}</Text>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text fw="bold">{professor.name}</Text>
          </Grid.Col>

          <Grid.Col span={2}>
            <Text>{formatCurrency(professor.hourlyRate)}</Text>
          </Grid.Col>

          <Grid.Col span={2}>
            <Text>{professor.hours}</Text>
          </Grid.Col>

          <Grid.Col span={2}>
            <Text>
              {formatCurrency(professor.hours * professor.hourlyRate)}
            </Text>
          </Grid.Col>

          <Grid.Col span={2}>
            <Flex gap="xs">
              <ActionIcon
                variant="filled"
                color="blue"
                onClick={openEditModal}
                title="Modifier"
                p={2}
              >
                <IconEdit />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                color="red"
                onClick={openDeleteModal}
                title="Supprimer"
                p={2}
              >
                <IconTrash />
              </ActionIcon>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}
