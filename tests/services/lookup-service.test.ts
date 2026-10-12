import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../src/api/api-clients";
import { lookupService } from "../../src/services/lookup-service";
import type { SelectListItem } from "../../src/models/select-list-item";

vi.mock("../../src/api/api-clients", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(apiClient.get);

describe("lookupService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getOptions", () => {
    it("requests and returns options for the supplied enum", async () => {
      const options: SelectListItem[] = [
        { value: "1", text: "Female" },
        { value: "2", text: "Male" },
      ];
      mockedGet.mockResolvedValueOnce({ data: options });

      const result = await lookupService.getOptions("gender");

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith("/v1/lookup/gender");
      expect(result).toBe(options);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not load options");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(lookupService.getOptions("size")).rejects.toBe(
        requestError,
      );
    });
  });

  describe("getAnimalLookups", () => {
    it("requests all animal lookups and returns them by category", async () => {
      const genders: SelectListItem[] = [
        { value: "1", text: "Female" },
      ];
      const sizes: SelectListItem[] = [
        { value: "2", text: "Medium" },
      ];
      const temperaments: SelectListItem[] = [
        { value: "3", text: "Friendly" },
      ];
      mockedGet
        .mockResolvedValueOnce({ data: genders })
        .mockResolvedValueOnce({ data: sizes })
        .mockResolvedValueOnce({ data: temperaments });

      const result = await lookupService.getAnimalLookups();

      expect(mockedGet).toHaveBeenCalledTimes(3);
      expect(mockedGet).toHaveBeenNthCalledWith(1, "/v1/lookup/gender");
      expect(mockedGet).toHaveBeenNthCalledWith(2, "/v1/lookup/size");
      expect(mockedGet).toHaveBeenNthCalledWith(
        3,
        "/v1/lookup/temperament",
      );
      expect(result).toEqual({ genders, sizes, temperaments });
    });

    it("rejects when an animal lookup request fails", async () => {
      const requestError = new Error("Could not load sizes");
      mockedGet
        .mockResolvedValueOnce({ data: [] })
        .mockRejectedValueOnce(requestError)
        .mockResolvedValueOnce({ data: [] });

      await expect(lookupService.getAnimalLookups()).rejects.toBe(
        requestError,
      );
    });
  });

  describe("getAvailableUserRoles", () => {
    it("requests and returns assignable user roles", async () => {
      const roles: SelectListItem[] = [
        { value: "Admin", text: "Administrator" },
        { value: "User", text: "User" },
      ];
      mockedGet.mockResolvedValueOnce({ data: roles });

      const result = await lookupService.getAvailableUserRoles();

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith("/v1/lookup/user-roles");
      expect(result).toBe(roles);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not load user roles");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(lookupService.getAvailableUserRoles()).rejects.toBe(
        requestError,
      );
    });
  });
});
