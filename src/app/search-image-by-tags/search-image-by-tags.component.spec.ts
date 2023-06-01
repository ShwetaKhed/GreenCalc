import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchImageByTagsComponent } from './search-image-by-tags.component';

describe('SearchImageByTagsComponent', () => {
  let component: SearchImageByTagsComponent;
  let fixture: ComponentFixture<SearchImageByTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchImageByTagsComponent]
    });
    fixture = TestBed.createComponent(SearchImageByTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
