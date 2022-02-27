import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipeService } from '~/services';

@Component({
  selector: 'recipes-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  constructor(private recipeService: RecipeService) {
    this.recipes = recipeService.allItems;
  }

  ngOnInit(): void {}
}
