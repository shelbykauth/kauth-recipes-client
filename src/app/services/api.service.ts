import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getData<T>(endpoint: string): Observable<T[]> {
    return this.http
      .get(this.config.values.apiUrl + endpoint)
      .pipe(map((response: any) => (response.data || response) as T[]));
  }
}
