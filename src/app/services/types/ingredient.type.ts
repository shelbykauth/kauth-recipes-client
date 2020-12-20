import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HasName } from './has-name.type';

export type Ingredient = HasName & {
  measure: string;
  name: string;
  link: {
    type: string;
    id: string;
  };
  linkedItem?: Observable<HasName>;
};

// TODO: Flesh out Ingredient Structure

export function IngredientFactory(ingredient: any): Ingredient {
  ingredient.name = ingredient.name || 'Unknown Ingredient';
  ingredient.measure = ingredient.measure || '1';
  ingredient.linkedItem = ingredient.linkedItem || undefined;

  if (ingredient.linkedItem instanceof Observable) {
    console.log(
      ingredient.linkedItem
        .pipe(
          tap((value: HasName) => {
            console.log(ingredient.name);
            ingredient.name = value?.name || 'Unknown Link';
          })
        )
        .subscribe()
    );
  }

  return ingredient;
}
