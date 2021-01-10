import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/views/main/main.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DisplaySingleRecipeComponent } from './components/views/display-single-recipe/display-single-recipe.component';
import { SearchComponent } from './components/views/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideMenuComponent,
    DisplaySingleRecipeComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/recipes' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
