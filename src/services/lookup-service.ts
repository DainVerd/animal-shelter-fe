import apiClient from "../api/api-clients";
import type { SelectListItem } from "../models/select-list-item";

export const lookupService = {
  /**
   * get list of enum values
   * @param enumName name of Enum (gender, size, temperament)
   */
  async getOptions(
    enumName: string,
  ): Promise<SelectListItem[]> {
    const response = await apiClient.get<SelectListItem[]>(
      `/v1/lookup/${enumName}`
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
      genders: genders,
      sizes: sizes,
      temperaments: temperaments,
    };
  },
};