import Gender from "../enums/gender";

const genderDisplayMap = new Map<number, string>([
  [Gender.Male, "Male"],
  [Gender.Female, "Female"],
]);

export const formatGenderName = (gender: number | null | undefined): string => {
  if (!gender && gender !== 0)
    return "No Gender";

  return genderDisplayMap.get(gender) || gender.toString();
};