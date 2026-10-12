import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../src/api/api-clients";
import { publicService } from "../../src/services/public-service";
import type { PaginatedList } from "../../src/models/paginated-list";
import type PublicAnimal from "../../src/models/public-animal";
import Gender from "../../src/enums/gender";

vi.mock("../../src/api/api-clients", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(apiClient.get);

describe("publicService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getPublicAnimalsList", () => {
    it("requests public animals using the supplied pagination parameters", async () => {
      const pagination = {
        pageNumber: 2,
        pageSize: 12,
        sortBy: "name",
        isDescending: true,
      };
      const responseData: PaginatedList<PublicAnimal> = {
        items: [
          {
            id: 7,
            name: "Milo",
            gender: Gender.Female,
            dateOfBirth: "2022-04-03",
            url: "https://example.com/milo.jpg",
          },
        ],
        pageNumber: 2,
        totalPages: 3,
        totalCount: 25,
        hasNextPage: true,
        hasPreviousPage: true,
      };
      mockedGet.mockResolvedValueOnce({ data: responseData });

      const result = await publicService.getPublicAnimalsList(pagination);

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith("/v1/public/animals", {
        params: pagination,
        signal: undefined,
      });
      expect(result).toBe(responseData);
    });

    it("passes the abort signal to the API client", async () => {
      const pagination = { pageNumber: 1, pageSize: 6 };
      const controller = new AbortController();
      const responseData: PaginatedList<PublicAnimal> = {
        items: [],
        pageNumber: 1,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
      mockedGet.mockResolvedValueOnce({ data: responseData });

      await publicService.getPublicAnimalsList(
        pagination,
        controller.signal,
      );

      expect(mockedGet).toHaveBeenCalledWith("/v1/public/animals", {
        params: pagination,
        signal: controller.signal,
      });
    });

    it("propagates errors from the API client", async () => {
      const requestError = new Error("Request failed");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(
        publicService.getPublicAnimalsList({ pageNumber: 1, pageSize: 6 }),
      ).rejects.toBe(requestError);
    });
  });
});
