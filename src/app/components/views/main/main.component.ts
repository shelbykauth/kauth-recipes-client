import { Component, OnInit } from '@angular/core';
import { RecipeService } from '~services/recipe.service';

@Component({
  selector: 'recipes-view-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(private reicpeService:RecipeService) { }

  ngOnInit(): void {
  }

}
