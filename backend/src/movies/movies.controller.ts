import { Controller } from '@nestjs/common';
import { Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dtos';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(public moviesService: MoviesService) {}

  @Get()
  listMovies() {
    return this.moviesService.findAll();
  }

  @Post()
  addMovie(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body.name);
  }

  @Get('/:id')
  async getMovie(@Param('id') id: string) {
    const movie = await this.moviesService.findOne(id);

    if (!movie) {
      throw new NotFoundException('movie not found');
    }
    return movie;
  }
}
