import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetImageByTagsComponent } from './get-image-by-tags.component';

describe('GetImageByTagsComponent', () => {
  let component: GetImageByTagsComponent;
  let fixture: ComponentFixture<GetImageByTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetImageByTagsComponent]
    });
    fixture = TestBed.createComponent(GetImageByTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
