export type RecipeType = {
  id?: string;
  name: string;
};

export class Recipe implements RecipeType {
  name: string;
  constructor(attr: RecipeType) {
    this.name = attr.name;
  }
}
