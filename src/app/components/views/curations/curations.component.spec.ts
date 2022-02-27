import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationsComponent } from './curations.component';

describe('CurationsComponent', () => {
  let component: CurationsComponent;
  let fixture: ComponentFixture<CurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
