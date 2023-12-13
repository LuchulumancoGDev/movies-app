import { Component, OnInit } from '@angular/core';
import { Genre, GenresDto } from 'src/app/models/genre';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit{
  
  genres:Genre[] =[];
  
  constructor(private moviesService: MoviesService) {}
  
  ngOnInit(): void {
    this.moviesService.getMoviesGenres().subscribe((genresData)=>{
      this.genres = genresData;
    });
  }

 

}
