import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesRepository {
  async findOne(id: string) {
    const contents = await readFile('movies.json', 'utf8');
    const movies = JSON.parse(contents);

    return movies[id];
  }

  async findAll() {
    const contents = await readFile('movies.json', 'utf8');
    const movies = JSON.parse(contents);

    return movies;
  }

  async create(movie: string) {
    const contents = await readFile('movies.json', 'utf8');
    const movies = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);

    movies[id] = { id, content: movie };

    await writeFile('movies.json', JSON.stringify(movies));
  }
}
