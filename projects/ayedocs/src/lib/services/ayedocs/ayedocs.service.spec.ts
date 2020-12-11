import { TestBed } from '@angular/core/testing';

import { AyedocsService } from './ayedocs.service';

describe('AyedocsService', () => {
  let service: AyedocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyedocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
