import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { Recipe } from './types';
import { RecipeType } from './types/recipe.type';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _allItems = new BehaviorSubject<Recipe[]>([]);
  public allItems = this._allItems.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllRecipes();
    this.allItems.pipe(tap((data) => console.log(data))).subscribe();
  }

  loadAllRecipes() {
    this.http
      .get('/assets/data/original-recipes.json')
      .pipe(
        take(1),
        map((data) => data as RecipeType[]),
        map((data) => data.map((recipe) => new Recipe(recipe))),
        tap((recipes) => this._allItems.next(recipes))
      )
      .subscribe();
  }
}
