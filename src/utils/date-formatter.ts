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