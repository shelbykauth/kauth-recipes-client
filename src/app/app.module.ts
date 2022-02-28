import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/views/main/main.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DisplaySingleRecipeComponent } from './components/views/recipes/display-single-recipe/display-single-recipe.component';
import { SearchComponent } from './components/views/search/search.component';
import { AddRecipeComponent } from './components/views/recipes/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/views/recipes/edit-recipe/edit-recipe.component';
import { CurationsComponent } from './components/views/curations/curations.component';
import { RecipeFormComponent } from './components/views/recipes/recipe-form/recipe-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideMenuComponent,
    DisplaySingleRecipeComponent,
    SearchComponent,
    AddRecipeComponent,
    EditRecipeComponent,
    CurationsComponent,
    RecipeFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
