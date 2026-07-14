import { GenericAbortSignal } from "axios";
import apiClient from "../api/api-clients";
import PaginationParamsViewModel from "../models/requests/pagination-params-request";
import Animal from "../models/animal";
import { PaginatedList } from "../models/paginated-list";

export const animalService = {
  /**
   * endpoint to create animal
   */
  async createAnimal(
    animalToCreate: FormData,
    signal?: GenericAbortSignal,
  ): Promise<number> {
    const response = await apiClient.post<number>(
      "/v1/animals",
      animalToCreate,
      {
        signal: signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },
  async getAnimals(
    model: PaginationParamsViewModel,
    signal?: GenericAbortSignal,
  ): Promise<PaginatedList<Animal>> {
    const response = await apiClient.get("/v1/animals", {
      params: { ...model },
      signal: signal,
    });
    return response.data;
  },
  async getAnimalWithImages(
    animalId: number,
    signal?: GenericAbortSignal,
  ): Promise<Animal> {
    const response = await apiClient.get(`/v1/animals/${animalId}`, {
      signal: signal,
    });

    return response.data;
  },
  async updateAnimal(
    animalToUpdate: FormData,
    signal?: GenericAbortSignal,
  ): Promise<void> {
    const response = await apiClient.put<void>(
      "/v1/animals",
      animalToUpdate,
      {
        signal: signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },
  async deleteAnimal(
    animalId: number,
    signal?: GenericAbortSignal,
  ): Promise<Animal> {
    const response = await apiClient.delete(`/v1/animals/${animalId}`, {
      signal: signal,
    });

    return response.data;
  },
};
