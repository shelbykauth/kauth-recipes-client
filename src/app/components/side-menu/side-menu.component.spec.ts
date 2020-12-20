import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RecipeService } from '~/services';

import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    const mockRecipeService = jasmine.createSpyObj(['findBySlug']);
    mockRecipeService.findBySlug.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: RecipeService, useValue: mockRecipeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
