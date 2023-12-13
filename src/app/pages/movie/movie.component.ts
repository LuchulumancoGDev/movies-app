import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[]=[];
  movieImages: MovieImages|null=null;
  movieCredits: MovieCredits|null=null;
  moviesSimilar: Movie[] = [];
  imagesSizes = IMAGES_SIZES;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getPagedMoviesSimilar(id, 1);
    });
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
      console.log(this.movie);
    });
  }

  getMovieCredits(id:string){
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
      this.movieCredits = movieCreditsData;
      console.log(this.movieCredits)
    })
  }

  getPagedMoviesSimilar(id: string, page: number) {
    this.moviesService.searchSimilarMovies(id, page).subscribe((moviesSimilarData) => {
      this.moviesSimilar = moviesSimilarData;
    });
  }

  paginateSimilar(id: string, event: any) {
    this.getPagedMoviesSimilar(id, event.page + 1);
  }

  getMovieVideos(id:string){
    this.moviesService.getMovieVideos(id).subscribe((movieVideosData) => {
      this.movieVideos=movieVideosData;
      console.log(this.movieVideos);

    })
  }

  getMovieImages(id:string){
    this.moviesService.getMovieImages(id).subscribe((movieImagesData) => {
      this.movieImages=movieImagesData;
      console.log(this.movieImages);

    })
  }
}
