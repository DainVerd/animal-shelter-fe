import * as yup from "yup";

export const animalSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name is too short"),
  gender: yup
    .mixed()
    .required("Please select a gender"),
  size: yup
    .mixed()
    .required("Please select a size"),
  temperament: yup
    .mixed()
    .required("Temperament is required"),
  dob: yup
    .date()
    .required("Date of birth is required"),
  description: yup
    .string()
    .max(500, "Description is too long")
    .required("Description is required"),
  photos: yup
    .array()
    .min(1, "Please upload at least one photo")
    .required("Photos are required"),
  healthNote: yup
    .string()
    .max(500, "Note is too long")
    .nullable(),
});
