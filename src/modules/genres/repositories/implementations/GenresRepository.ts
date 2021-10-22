import { getRepository, Repository } from "typeorm";
import { Genre } from "../../entities/Genre";
import { IGenresRepository } from "../IGenresRepository";

export class GenresRepository implements IGenresRepository {
  private repository: Repository<Genre>;

  constructor() {
    this.repository = getRepository(Genre);
  }

  async create(name: string): Promise<void> {
    const genre = this.repository.create({ name });
    await this.repository.save(genre);
  }
  async findByName(name: string): Promise<Genre | undefined> {
    const genre = await this.repository.findOne({ name });
    return genre;
  }
}
