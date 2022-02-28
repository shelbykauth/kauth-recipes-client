import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { Recipe, RecipeService } from '~/services';
import { RecipeFactory } from '~/services/types';

@Component({
  selector: 'recipes-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  public icons = icons;

  public recipe: Recipe = RecipeFactory({});
  public formGroups = {
    id: new FormControl(this.recipe.id),
    name: new FormControl(this.recipe.name),
    slug: new FormControl(this.recipe.slug),
    authors: [this.createSimpleControl(), this.createSimpleControl()],
    ingredients: [this.createIngredientControl()],
    directions: [this.createSimpleControl()],
    notes: [this.createSimpleControl()],
  };
  public recipeFormGroup = new FormGroup({
    id: this.formGroups.id,
    name: this.formGroups.name,
    slug: this.formGroups.slug,
    authors: new FormArray(this.formGroups.authors),
    ingredients: new FormArray(this.formGroups.ingredients),
    directions: new FormArray(this.formGroups.directions),
    notes: new FormArray(this.formGroups.notes),
  });
  public get formGroupAuthors() {
    return (this.recipeFormGroup.controls.authors as FormArray)
      .controls as FormControl[];
  }

  constructor(
    public recipeService: RecipeService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  createSimpleControl() {
    return new FormControl('');
  }
  createIngredientControl() {
    return new FormGroup({
      measure: new FormGroup({
        quantity: new FormControl(1),
        unit: new FormControl('count'),
      }),
      name: new FormControl('Some Ingredient'),
    });
  }
  getFormControlArray(formArray: FormArray) {
    return formArray.controls as FormControl[];
  }

  addArrControl(
    arr: AbstractControl[],
    controlFunction: () => AbstractControl,
    i: number
  ) {
    i = i ?? arr.length - 1;
    arr.splice(i, 0, controlFunction());
  }
  removeArrControl(arr: FormControl[], i: number) {
    if (typeof i !== 'number') {
      return;
    }
    arr.splice(i, 1);
  }
  moveUpArrControl(arr: FormControl[], i: number) {
    if (typeof i !== 'number' || i < 1 || i > arr.length - 1) {
      return;
    }
    let item = arr.splice(i, 1);
    arr.splice(i - 1, 0, ...item);
  }
  moveDownArrControl(arr: FormControl[], i: number) {
    if (typeof i !== 'number' || i < 0 || i > arr.length - 2) {
      return;
    }
    let item = arr.splice(i, 1);
    arr.splice(i + 1, 0, ...item);
  }
}
