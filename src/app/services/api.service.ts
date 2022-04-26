import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '~environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string): Observable<T[]> {
    return this.http
      .get(environment.apiUrl + endpoint)
      .pipe(map((response: any) => (response.data || response) as T[]));
  }
}
