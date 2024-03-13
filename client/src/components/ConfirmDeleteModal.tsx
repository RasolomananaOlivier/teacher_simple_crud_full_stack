import { Button, Flex, Modal, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfessor } from "../apis";
import { notifications } from "@mantine/notifications";
import classes from "../styles/notification.module.css";

type Props = {
  professorId: string;
  opened: boolean;
  close: () => void;
};

export default function ConfirmDeleteModal({
  close,
  opened,
  professorId,
}: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProfessor,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["professors"],
      });

      close();

      notifications.show({
        title: "Succès",
        message: "Enseignant supprimé avec succès",
        color: "green",
        autoClose: 5000,
        withCloseButton: true,
        classNames: classes,
      });
    },
    onError: (_) => {
      notifications.show({
        title: "Erreur",
        message: "Une erreur s'est produite",
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        classNames: classes,
      });
    },
  });

  const handleClick = () => {
    mutation.mutate({ id: professorId });
  };

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
          disabled={mutation.isPending}
        >
          Annuler
        </Button>
        <Button
          variant="filled"
          aria-label="Delete"
          radius="md"
          color="pink"
          size="sm"
          onClick={handleClick}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Suppression..." : "Supprimer"}
        </Button>
      </Flex>
    </Modal>
  );
}
