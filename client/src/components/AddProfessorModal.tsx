import {
  Button,
  Dialog,
  Flex,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, FormikHelpers } from "formik";
import { PostProfessorParams, postProfessor } from "../apis";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import * as Yup from "yup";
import { notifications } from "@mantine/notifications";
import classes from "../styles/notification.module.css";

type Props = {
  opened: boolean;
  close: () => void;
};

const initialValues: PostProfessorParams = {
  name: "",
  hourlyRate: 0,
  hours: 0,
};

const AddProfessorModalSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le nom de l'enseignant doit être fourni")
    .min(3, "Le nom de l'enseignant doit comporter au moins 3 caractères")
    .max(255, "Le nom de l'enseignant doit comporter au plus 255 caractères"),
  hourlyRate: Yup.number()
    .required("Le taux horaire est requis")
    .min(2500, "Le taux horaire doit être au moins 2500 Ar")
    .max(7500, "Le taux horaire doit être au plus 7500 Ar"),
  hours: Yup.number().required("Le nombre d'heures est requis"),
});

export default function AddProfessorModal({ close, opened }: Props) {
  const queryClient = useQueryClient();

  const [notificationOpened, { toggle, close: closeNotification }] =
    useDisclosure(false);

  const mutation = useMutation({
    mutationFn: postProfessor,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["professors"],
      });
    },
  });

  const handleSubmit = async (
    values: PostProfessorParams,
    formikHelpers: FormikHelpers<PostProfessorParams>
  ) => {
    mutation.mutate(values);
    formikHelpers.resetForm();
    close();
  };

  useEffect(() => {
    if (mutation.isError) {
      notifications.show({
        title: "Erreur",
        message: "Une erreur s'est produite",
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        classNames: classes,
      });
    } else if (mutation.isSuccess) {
      notifications.show({
        title: "Succès",
        message: "Enseignant ajouté avec succès",
        color: "green",
        autoClose: 5000,
        withCloseButton: true,
        classNames: classes,
      });
    }

    mutation.reset();
  }, [mutation.isError, mutation.isSuccess, toggle]);

  return (
    <>
      <Dialog
        opened={notificationOpened}
        withCloseButton
        onClose={closeNotification}
        size="lg"
        radius="md"
        position={{ top: 20, right: 20 }}
      >
        You are now obligated to give a star to Mantine project on GitHub
      </Dialog>

      <Modal
        opened={opened}
        onClose={close}
        title="Nouveau enseignant"
        centered
        padding="lg"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={AddProfessorModalSchema}
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
                  {mutation.isPending ? "En cours..." : "Ajouter"}
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
