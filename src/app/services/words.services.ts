import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { map } from 'rxjs/operators'; // Agregar esta línea

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  words:any[]=[];
  private apiUrl = 'http://localhost:8000/words'; // End-point

  constructor(private http: HttpClient) { }

  /* Obtener palabras desde archivo json local
  

  getRandomWord(): Observable<string> {
    return this.http.get<any>('assets/words.json').pipe(
      map((data: any) => { // Agregar el tipo de 'data' si es posible
        const words = data.words;
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
      })
    );
  }

 */


  async GetWords(): Promise<string> {
    const options = {
      url: 'http://localhost:8000/words'
    };
  
    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      const wordsArray = response.data.map((item: any) => item.word); 
      const randomIndex = Math.floor(Math.random() * wordsArray.length);
      return wordsArray[randomIndex]; // Devuelve la palabra al azar
    } catch (error) {
      console.error("Error al obtener las palabras:", error);
      return ""; 
    }
  }
  
  
}
