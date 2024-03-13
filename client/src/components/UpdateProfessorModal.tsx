import {
  Button,
  Flex,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { IProfessor } from "../types";
import { Formik, FormikHelpers } from "formik";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfessor } from "../apis";
import classes from "../styles/notification.module.css";
import { ProfessorModalSchema } from "../schemas/professorSchema";

type Props = {
  professor: IProfessor;
  opened: boolean;
  close: () => void;
};

export default function UpdateProfessorModal({
  close,
  opened,
  professor,
}: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfessor,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["professors"],
      });

      notifications.show({
        title: "Succès",
        message: "Enseignant modifié avec succès",
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

  const handleSubmit = async (
    values: IProfessor,
    formikHelpers: FormikHelpers<IProfessor>
  ) => {
    mutation.mutate({
      id: professor._id!,
      ...values,
    });
    formikHelpers.resetForm();
    close();
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Modifier l'enseignant"
      centered
      padding="lg"
    >
      <Formik
        initialValues={professor}
        onSubmit={handleSubmit}
        validationSchema={ProfessorModalSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Nom de l'enseignant"
              radius="md"
              size="md"
              placeholder="Input placeholder"
              withAsterisk
              value={values.name}
              onChange={handleChange}
              disabled={mutation.isPending}
              onBlur={handleBlur}
              name="name"
              error={errors.name && touched.name ? errors.name : null}
            />
            <NumberInput
              radius="md"
              label="Taux horaire"
              withAsterisk
              size="md"
              placeholder="Input placeholder"
              value={values.hourlyRate}
              onChange={(value) => setFieldValue("hourlyRate", value)}
              onBlur={handleBlur}
              disabled={mutation.isPending}
              name="hourlyRate"
              my="sm"
              error={
                errors.hourlyRate && touched.hourlyRate
                  ? errors.hourlyRate
                  : null
              }
            />
            <NumberInput
              radius="md"
              label="Nombre d'heures"
              withAsterisk
              size="md"
              placeholder="Input placeholder"
              value={values.hours}
              onChange={(value) => setFieldValue("hours", value)}
              onBlur={handleBlur}
              disabled={mutation.isPending}
              name="hours"
              error={errors.hours && touched.hours ? errors.hours : null}
            />
            <Flex gap="md" mt="lg">
              <Button
                variant="outline"
                radius="md"
                color="gray"
                fullWidth
                onClick={close}
                disabled={mutation.isPending}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="gradient"
                radius="md"
                gradient={{ from: "violet", to: "indigo", deg: 90 }}
                disabled={mutation.isPending}
                fullWidth
              >
                {mutation.isPending ? "En cours..." : "Sauvegarder"}
              </Button>
            </Flex>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
