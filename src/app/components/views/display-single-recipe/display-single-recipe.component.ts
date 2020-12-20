import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Recipe, RecipeService } from '~/services';

@Component({
  selector: 'recipes-display-single-recipe',
  templateUrl: './display-single-recipe.component.html',
  styleUrls: ['./display-single-recipe.component.less'],
})
export class DisplaySingleRecipeComponent implements OnInit, OnDestroy {
  private _slug?: string;
  get slug() {
    return this._slug;
  }
  set slug(value) {
    if (!value) {
      this.recipe = undefined;
      this.slug = undefined;
      return;
    }
    this._slug = value;
    let pipe = this.recipeService.findBySlug(this._slug).pipe(
      tap((recipes) => {
        switch (recipes.length) {
          case 0:
            this.recipe = undefined;
            return;
          case 1:
            this.recipe = recipes[0];
            return;
          default:
            this.router.navigate(['search', this._slug]);
        }
      })
    );
    this.subscriptions.add(pipe.subscribe());
  }
  recipe?: Recipe;

  private subscriptions = new Subscription();

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
