import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { Recipe, RecipeFactory } from './types';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _allItems = new BehaviorSubject<Recipe[]>([]);
  public allItems = this._allItems.asObservable();

  private _itemsById: { [x: string]: Recipe } = {};
  private addItemPipe = map((recipe: Recipe) => {
    this._itemsById[recipe.id] = recipe;
    this._itemsById[recipe.slug] = recipe;
  });

  constructor(private http: HttpClient) {
    this.loadAllRecipes();
    this.findBySlug('cake').subscribe((recipes) => console.log(recipes));
    this.allItems
      .pipe(tap((data) => console.log(data, this._itemsById)))
      .subscribe();
  }

  loadAllRecipes() {
    this.http
      .get('/assets/data/original-recipes.json')
      .pipe(
        take(1),
        map((data) => data as Recipe[]),
        map((data) => data.map((recipe) => RecipeFactory(recipe))),
        tap((recipes) => from(recipes).pipe(this.addItemPipe).subscribe()),
        tap((recipes) => this._allItems.next(recipes))
      )
      .subscribe();
  }

  findBySlug(identifier: string): Observable<Recipe[]> {
    identifier = identifier.toLowerCase();
    return this.allItems.pipe(
      map((allRecipes) => {
        if (this._itemsById[identifier]) {
          return [this._itemsById[identifier]];
        }
        let possibleRecipes = allRecipes.filter((recipe) => {
          if (recipe.slug.includes(identifier)) {
            return true;
          }
          if (recipe.id.includes(identifier)) {
            return true;
          }
          return false;
        });
        return possibleRecipes;
      })
    );
  }
}
