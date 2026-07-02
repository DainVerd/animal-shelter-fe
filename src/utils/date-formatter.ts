import { format, isValid, parseISO } from "date-fns";
import { DATE_FORMATS } from "../constants";

export const formatDate = (
  dateInput: Date | string | undefined | null,
  includeTime: boolean = false
): string => {
  if (!dateInput) return "—";

  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  if (!isValid(date)) return "Invalid date";

  const formatString = includeTime 
    ? DATE_FORMATS.DATE_TIME 
    : DATE_FORMATS.DATE_ONLY;

  return format(date, formatString);
};

export const calculateAge = (birthDate: string | Date): string => {
  const birth = new Date(birthDate);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    years--;
  }
  return years === 0 ? "Under 1 year" : `${years} years`;
};