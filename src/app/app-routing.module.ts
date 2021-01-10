import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DisplaySingleRecipeComponent,
  MainComponent,
  SearchComponent,
} from '~views/index';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'r/:slug', component: DisplaySingleRecipeComponent },
  { path: 'search/:searchTerm', component: SearchComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
