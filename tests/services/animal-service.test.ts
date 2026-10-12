import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../src/api/api-clients";
import { animalService } from "../../src/services/animal-service";
import Gender from "../../src/enums/gender";
import type Animal from "../../src/models/animal";
import type { PaginatedList } from "../../src/models/paginated-list";

vi.mock("../../src/api/api-clients", () => ({
  default: {
    delete: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

const mockedDelete = vi.mocked(apiClient.delete);
const mockedGet = vi.mocked(apiClient.get);
const mockedPost = vi.mocked(apiClient.post);
const mockedPut = vi.mocked(apiClient.put);

const animal: Animal = {
  id: 7,
  name: "Milo",
  gender: Gender.Male,
  temperament: 1,
  breed: "Mixed",
  size: 2,
  isVaccinated: true,
  isSterilized: true,
  description: "Friendly shelter animal",
  healthNote: "Healthy",
  dateOfBirth: "2022-04-03",
  images: [
    {
      id: 10,
      url: "https://example.com/milo.jpg",
      key: "milo.jpg",
      isMain: true,
    },
  ],
};

describe("animalService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createAnimal", () => {
    it("posts multipart animal data and returns its identifier", async () => {
      const controller = new AbortController();
      const formData = new FormData();
      formData.append("name", "Milo");
      mockedPost.mockResolvedValueOnce({ data: 7 });

      const result = await animalService.createAnimal(
        formData,
        controller.signal,
      );

      expect(mockedPost).toHaveBeenCalledOnce();
      expect(mockedPost).toHaveBeenCalledWith("/v1/animals", formData, {
        signal: controller.signal,
        headers: { "Content-Type": "multipart/form-data" },
      });
      expect(result).toBe(7);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not create animal");
      mockedPost.mockRejectedValueOnce(requestError);

      await expect(animalService.createAnimal(new FormData())).rejects.toBe(
        requestError,
      );
    });
  });

  describe("getAnimals", () => {
    it("requests and returns a paginated animal list", async () => {
      const controller = new AbortController();
      const pagination = {
        pageNumber: 2,
        pageSize: 12,
        sortBy: "name",
        isDescending: true,
      };
      const responseData: PaginatedList<Animal> = {
        items: [animal],
        pageNumber: 2,
        totalPages: 3,
        totalCount: 25,
        hasNextPage: true,
        hasPreviousPage: true,
      };
      mockedGet.mockResolvedValueOnce({ data: responseData });

      const result = await animalService.getAnimals(
        pagination,
        controller.signal,
      );

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith("/v1/animals", {
        params: pagination,
        signal: controller.signal,
      });
      expect(result).toBe(responseData);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not load animals");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(
        animalService.getAnimals({ pageNumber: 1, pageSize: 12 }),
      ).rejects.toBe(requestError);
    });
  });

  describe("getAnimalWithImages", () => {
    it("requests and returns an animal by identifier", async () => {
      const controller = new AbortController();
      mockedGet.mockResolvedValueOnce({ data: animal });

      const result = await animalService.getAnimalWithImages(
        animal.id,
        controller.signal,
      );

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith(`/v1/animals/${animal.id}`, {
        signal: controller.signal,
      });
      expect(result).toBe(animal);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not load animal");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(animalService.getAnimalWithImages(999)).rejects.toBe(
        requestError,
      );
    });
  });

  describe("updateAnimal", () => {
    it("puts multipart animal data and returns no value", async () => {
      const controller = new AbortController();
      const formData = new FormData();
      formData.append("id", String(animal.id));
      mockedPut.mockResolvedValueOnce({ data: undefined });

      const result = await animalService.updateAnimal(
        formData,
        controller.signal,
      );

      expect(mockedPut).toHaveBeenCalledOnce();
      expect(mockedPut).toHaveBeenCalledWith("/v1/animals", formData, {
        signal: controller.signal,
        headers: { "Content-Type": "multipart/form-data" },
      });
      expect(result).toBeUndefined();
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not update animal");
      mockedPut.mockRejectedValueOnce(requestError);

      await expect(animalService.updateAnimal(new FormData())).rejects.toBe(
        requestError,
      );
    });
  });

  describe("deleteAnimal", () => {
    it("deletes and returns the animal", async () => {
      const controller = new AbortController();
      mockedDelete.mockResolvedValueOnce({ data: animal });

      const result = await animalService.deleteAnimal(
        animal.id,
        controller.signal,
      );

      expect(mockedDelete).toHaveBeenCalledOnce();
      expect(mockedDelete).toHaveBeenCalledWith(
        `/v1/animals/${animal.id}`,
        { signal: controller.signal },
      );
      expect(result).toBe(animal);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not delete animal");
      mockedDelete.mockRejectedValueOnce(requestError);

      await expect(animalService.deleteAnimal(999)).rejects.toBe(
        requestError,
      );
    });
  });
});
