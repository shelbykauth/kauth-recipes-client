import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySingleRecipeComponent } from './display-single-recipe.component';

describe('DisplaySingleRecipeComponent', () => {
  let component: DisplaySingleRecipeComponent;
  let fixture: ComponentFixture<DisplaySingleRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaySingleRecipeComponent],
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
