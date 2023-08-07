import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadscreenComponent } from './loadscreen.component';

describe('LoadscreenComponent', () => {
  let component: LoadscreenComponent;
  let fixture: ComponentFixture<LoadscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadscreenComponent]
    });
    fixture = TestBed.createComponent(LoadscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
