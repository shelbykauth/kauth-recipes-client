import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap, pluck, tap } from 'rxjs/operators';
import { Recipe, RecipeService } from '~/services';

@Component({
  selector: 'recipes-display-single-recipe',
  templateUrl: './display-single-recipe.component.html',
  styleUrls: ['./display-single-recipe.component.less'],
})
export class DisplaySingleRecipeComponent implements OnInit, OnDestroy {
  recipe?: Recipe;

  private slug: string = '';
  private subscriptions = new Subscription();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let navPipe = this.route.params.pipe(
      pluck('slug'),
      tap((slug) => (this.slug = slug)),
      mergeMap((slug) => this.recipeService.findBySlug(slug)),
      tap((recipes) => {
        switch (recipes.length) {
          case 0:
            this.recipe = undefined;
            return;
          case 1:
            this.recipe = recipes[0];
            return;
          default:
            this.router.navigate(['search', this.slug]);
        }
      })
    );
    this.subscriptions.add(navPipe.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
