import type { ProblemDetails } from "./problem-details";

export class ApiError extends Error {
  status: number;
  title: string;
  errors?: string[];

  constructor(problemDetails: ProblemDetails) {
    super(problemDetails.detail);
    this.name = "ApiError";
    this.status = problemDetails.status;
    this.title = problemDetails.title;
    this.errors = problemDetails.errors;
  }
}
