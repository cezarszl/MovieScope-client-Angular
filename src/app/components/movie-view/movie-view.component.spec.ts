import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieViewComponent } from './movie-view.component';

describe('MovieViewComponent', () => {
  let component: MovieViewComponent;
  let fixture: ComponentFixture<MovieViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
