import { TestBed } from '@angular/core/testing';

import { AzureBlobService } from './azure-blob-service';

describe('AzureBlobService', () => {
  let service: AzureBlobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureBlobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
