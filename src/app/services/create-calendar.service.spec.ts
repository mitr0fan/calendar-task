import { TestBed } from '@angular/core/testing';

import { CreateCalendarService } from './create-calendar.service';

describe('CreateCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateCalendarService = TestBed.get(CreateCalendarService);
    expect(service).toBeTruthy();
  });
});
