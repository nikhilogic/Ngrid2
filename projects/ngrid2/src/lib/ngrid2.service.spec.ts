import { TestBed } from '@angular/core/testing';

import { Ngrid2Service } from './ngrid2.service';

describe('Ngrid2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ngrid2Service = TestBed.get(Ngrid2Service);
    expect(service).toBeTruthy();
  });
});
