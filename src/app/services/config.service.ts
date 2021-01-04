import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private defaultConfig = {
    useRealApi: false,
    apiUrl: '/assets/data/',
  };
  private _useRealApi = false;
  private _apiUrl = '/assets/data/';
  constructor(private http: HttpClient) {
    try {
      const remoteConfig = firebase.remoteConfig();
      console.log(remoteConfig);
    } catch (err) {
      console.error(err);
    }
  }

  initialize() {}

  get useRealApi() {
    return this._useRealApi;
  }
  get apiUrl() {
    return this._apiUrl;
  }
}
