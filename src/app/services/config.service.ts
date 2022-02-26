import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  values: any = {
    apiUrl: '/api/',
  };
  values$: BehaviorSubject<any> = new BehaviorSubject(this.values);

  constructor() {
    let recipesClientConfig = (window as any).ng_AppConfig?.recipesClient;
    if (recipesClientConfig) {
      // hand-pick each value
      this.values.apiUrl = recipesClientConfig.apiUrl || '/api/';
    }

    //emit from values$
    this.values$.next(this.values);
  }

  getCurrentValue<T>(key: string): T {
    let keyArray = key.split('.');
    let value = this.values$.value;
    keyArray.forEach((keyPiece) => {
      value = value[keyPiece];
    });
    return value;
  }

  getValue<T>(key: string): Observable<T> {
    let keyArray = key.split('.');
    return this.values$.pipe(pluck(...keyArray));
  }
}
