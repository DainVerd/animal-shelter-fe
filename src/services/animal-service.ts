import { GenericAbortSignal } from "axios";
import BaseResponse from "../models/base-response";
import apiClient from "../api/api-clients";

export const animalService = {
  /**
   * endpoint to create animal
   */
  async createAnimal(
    animalToCreate: FormData,
    signal?: GenericAbortSignal,
  ): Promise<BaseResponse<number>> {
    const response = await apiClient.post<BaseResponse<number>>(
      "/v1/animals",
      animalToCreate,
      { 
        signal: signal,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      },
    );

    return response.data;
  },
};
