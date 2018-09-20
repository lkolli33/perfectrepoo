import { TestBed, inject } from '@angular/core/testing';

import { SharedcontrolsService } from './sharedcontrols.service';

describe('SharedcontrolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedcontrolsService]
    });
  });

  it('should be created', inject([SharedcontrolsService], (service: SharedcontrolsService) => {
    expect(service).toBeTruthy();
  }));
});
