import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Agregar esta línea

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  getRandomWord(): Observable<string> {
    return this.http.get<any>('assets/words.json').pipe(
      map((data: any) => { // Agregar el tipo de 'data' si es posible
        const words = data.words;
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
      })
    );
  }
}
