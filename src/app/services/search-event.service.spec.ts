import { TestBed } from '@angular/core/testing';

import { SearchEventService } from './search-event.service';

describe('SearchEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchEventService = TestBed.get(SearchEventService);
    expect(service).toBeTruthy();
  });
});
