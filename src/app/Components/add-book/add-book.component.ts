import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GenreService } from '../../Services/genre.service';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  createBookForm: FormGroup;
  genres: Array<any> = [];
  allGenres;

  constructor(
    private formBuilder: FormBuilder,
    private genreService: GenreService,
    private bookService: BookService,
  ) {
    this.getGenres()
    this.validator()
  }

  ngOnInit(): void {
  }

  validator(){
    this.createBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      numberPages: [''],
      publsher: ['', Validators.required],
      genre: ['', Validators.required],
    })
  }

  getGenres(){
    this.genreService.getAll().subscribe(
      (genre)=>{
        this.allGenres = genre
        //console.log('---> ', this.allGenres)
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  saveGenre(event){
    if(this.genres.includes(event.target.value)){
      const index = this.genres.indexOf(event.target.value)//Conocer la posición del elemento en el arreglo
      this.genres.splice(index, 1)
      //splice => Eliminar ó agregar 
      /**
       * Eliminar => splice(posiciónDelElemento, 1)
       * agregar => splice(posiciónDelElemento, 0, 'Pepito', 'Pepita')
       */
    }else{
      this.genres.push(event.target.value);
    }

    let value: any = '';
    if(this.genres.length > 0){
        value = this.genres
    }

    this.createBookForm.get('genre').setValue(value)
  }

  saveBook(){
    if(this.createBookForm.valid){
      this.bookService.createBook(this.createBookForm.value).subscribe(
        (dataBook) => {
          console.log(dataBook)
          alert('Libro creado exitosamente')
        },
        (error) => {
          console.error('Error: ', error)
        }
      )
    }else{
      alert('Todos los campos deben estar llenos')
    }
  }

}
