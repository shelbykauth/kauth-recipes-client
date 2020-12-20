import { Component, OnInit } from '@angular/core';
import { RecipeService } from '~/services';

@Component({
  selector: 'recipes-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less'],
})
export class SideMenuComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}
}
