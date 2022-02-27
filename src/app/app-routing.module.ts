import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurationsComponent } from './components/views/curations/curations.component';
import { MainComponent } from './components/views/main/main.component';
import { AddRecipeComponent } from './components/views/recipes/add-recipe/add-recipe.component';
import { DisplaySingleRecipeComponent } from './components/views/recipes/display-single-recipe/display-single-recipe.component';
import { EditRecipeComponent } from './components/views/recipes/edit-recipe/edit-recipe.component';
import { SearchComponent } from './components/views/search/search.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'r/edit/:id', component: EditRecipeComponent },
  { path: 'r/add', component: AddRecipeComponent },
  { path: 'lists', component: CurationsComponent },
  { path: 'r/:slug', component: DisplaySingleRecipeComponent },
  { path: 'search/:searchTerm', component: SearchComponent },
  { path: 'search', component: SearchComponent, data: { searchTerm: '' } },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
