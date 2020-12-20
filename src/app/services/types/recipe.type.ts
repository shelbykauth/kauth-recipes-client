import { v4 as uuid } from 'uuid';
import { Ingredient, IngredientFactory } from './ingredient.type';

export type Recipe = {
  id: string;
  name: string;
  slug: string;
  authors: string[];
  ingredients: Ingredient[];
  directions: string[];
};

export function RecipeFactory(recipe: any): Recipe {
  recipe.id = recipe.id || uuid();
  recipe.name = recipe.name || 'Unknown Dish';
  recipe.slug = recipe.slug || recipe.name.toLowerCase().replace(/ /g, '-');
  recipe.authors = recipe.authors || [];
  recipe.ingredients = recipe.ingredients || [];
  recipe.directions = recipe.directions || [];

  // TODO: use authorFactory, DirectionFactory?
  recipe.authors = recipe.authors.map((author: any) => author);
  recipe.ingredients = recipe.ingredients.map(IngredientFactory);
  recipe.directions = recipe.directions.map((direction: any) => direction);

  return recipe;
}
