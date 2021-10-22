import { Genre } from "../entities/Genre";

export interface IGenresRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<Genre | undefined>;
}
