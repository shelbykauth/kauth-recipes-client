import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RecipeService } from '~/services';

import { DisplaySingleRecipeComponent } from './display-single-recipe.component';

describe('DisplaySingleRecipeComponent', () => {
  let component: DisplaySingleRecipeComponent;
  let fixture: ComponentFixture<DisplaySingleRecipeComponent>;

  beforeEach(async () => {
    const mockRecipeService = jasmine.createSpyObj(['findBySlug']);
    mockRecipeService.findBySlug.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [DisplaySingleRecipeComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: RecipeService, useValue: mockRecipeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySingleRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
