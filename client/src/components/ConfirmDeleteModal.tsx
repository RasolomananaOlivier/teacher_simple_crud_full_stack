import { Button, Flex, Modal, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
};

export default function ConfirmDeleteModal({ close, opened }: Props) {
  return (
    <Modal opened={opened} title="Confirmation" onClose={close} centered>
      <Text fw="bold" fz={18}>
        Êtes-vous sûr de vouloir supprimer cet enseignant ?{" "}
      </Text>
      <Flex justify="end" gap="sm" pt="md">
        <Button
          variant="outline"
          aria-label="Cancel"
          radius="md"
          color="gray"
          size="sm"
          onClick={close}
        >
          Annuler
        </Button>
        <Button
          variant="filled"
          aria-label="Delete"
          radius="md"
          color="pink"
          size="sm"
          onClick={close}
        >
          Supprimer
        </Button>
      </Flex>
    </Modal>
  );
}
