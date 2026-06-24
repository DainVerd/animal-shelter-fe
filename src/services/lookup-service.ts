import apiClient from "../api/api-clients";
import { BaseResponse } from "../models/base-response";
import type { SelectListItem } from "../models/select-list-item";

export const lookupService = {
  /**
   * get list of enum values
   * @param enumName name of Enum (gender, size, temperament)
   */
  async getOptions(
    enumName: string,
  ): Promise<BaseResponse<SelectListItem[]>> {
    const response = await apiClient.get<BaseResponse<SelectListItem[]>>(
      `/api/lookup/${enumName}`
    );
    
    return response.data;
  },

  /**
   * method to download all dropdown items in parallel
   */
  async getAnimalLookups() {
    const [genders, sizes, temperaments] = await Promise.all([
      this.getOptions("gender"),
      this.getOptions("size"),
      this.getOptions("temperament"),
    ]);

    return {
      genders: genders.data || [],
      sizes: sizes.data || [],
      temperaments: temperaments.data || [],
    };
  },
};