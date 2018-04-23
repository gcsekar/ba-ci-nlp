import { TestBed, inject } from '@angular/core/testing';

import { SciquestService } from './sciquest.service';

describe('SciquestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SciquestService]
    });
  });

  it('should ...', inject([SciquestService], (service: SciquestService) => {
    expect(service).toBeTruthy();
  }));
});
