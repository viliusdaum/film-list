import { MoviesRepository } from './movies.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  constructor(public moviesRepo: MoviesRepository) {}

  async findOne(id: string) {
    return this.moviesRepo.findOne(id);
  }

  findAll() {
    return this.moviesRepo.findAll();
  }

  create(content: string) {
    return this.moviesRepo.create(content);
  }
}
