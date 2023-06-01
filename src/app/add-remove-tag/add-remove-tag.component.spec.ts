import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveTagComponent } from './add-remove-tag.component';

describe('AddRemoveTagComponent', () => {
  let component: AddRemoveTagComponent;
  let fixture: ComponentFixture<AddRemoveTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRemoveTagComponent]
    });
    fixture = TestBed.createComponent(AddRemoveTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
