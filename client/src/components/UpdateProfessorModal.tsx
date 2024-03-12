import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};

export default function UpdateProfessorModal({ close, opened }: Props) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Modifier l'enseignant"
      centered
      padding="lg"
    >
      <Stack gap="md">
        <TextInput
          label="Nom de l'enseignant"
          radius="md"
          placeholder="Input placeholder"
          withAsterisk
        />
        <NumberInput
          radius="md"
          label="Taux horaire"
          withAsterisk
          placeholder="Input placeholder"
        />

        <NumberInput
          radius="md"
          label="Nombre d'heures"
          withAsterisk
          placeholder="Input placeholder"
        />

        <Flex gap="md">
          <Button
            variant="outline"
            radius="md"
            color="gray"
            fullWidth
            onClick={close}
          >
            Annuler
          </Button>
          <Button
            variant="gradient"
            radius="md"
            gradient={{ from: "violet", to: "indigo", deg: 90 }}
            fullWidth
          >
            Sauvegarder
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
