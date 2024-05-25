import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = 'http://localhost:8000/api/records';

  constructor(private http: HttpClient) { }

  getTopRecords(limit: number = 5): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(records => {
        return records
          .sort((a, b) => b.puntos - a.puntos) 
          .slice(0, limit);
      })
    );
  }

  addRecord(record: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, record, { headers });
  }


}
