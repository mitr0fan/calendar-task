import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventsPopupComponent } from './search-events-popup.component';

describe('SearchEventsPopupComponent', () => {
  let component: SearchEventsPopupComponent;
  let fixture: ComponentFixture<SearchEventsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEventsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEventsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
