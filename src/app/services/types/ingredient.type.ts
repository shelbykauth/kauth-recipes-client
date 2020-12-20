export type Ingredient = {
  measure?: string;
  name: string;
};

// TODO: Flesh out Ingredient Structure

export function IngredientFactory(ingredient: any): Ingredient {
  ingredient.name = ingredient.name || 'Unknown Ingredient';
  ingredient.measure = ingredient.measure || '1';
  return ingredient;
}
