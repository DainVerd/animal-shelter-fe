import { GenericAbortSignal } from "axios";
import { PaginatedList } from "../models/paginated-list";
import PaginationParamsRequest from "../models/requests/pagination-params-request";
import PublicAnimal from "../models/public-animal";
import apiClient from "../api/api-clients";



export const publicService = {
  async getPublicAnimalsList(
    pagination: PaginationParamsRequest,
    signal?: GenericAbortSignal,
  ): Promise<PaginatedList<PublicAnimal>> {
    const response = await apiClient.get("/v1/public/animals", {
      params: { ...pagination },
      signal: signal,
    });
    return response.data;
  }
};