import * as Yup from "yup";

export const ProfessorModalSchema = Yup.object().shape({
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
