import AnimalImage from "./animal-image";

export interface Animal {
  id: number;
  name: string;
  gender: number;
  temperament: number;
  breed: string;
  size: number;
  isVaccinated: boolean;
  isSterilized: boolean;
  description: string;
  healthNote?: string;
  dateOfBirth: string;
  images: AnimalImage[];
}
export default Animal;