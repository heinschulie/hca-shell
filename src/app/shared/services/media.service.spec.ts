/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { MediaService } from './media.service';

describe('Service: Image', () => {
  beforeEach(() => {
    addProviders([MediaService]);
  });

  it('should ...',
    inject([MediaService],
      (service: MediaService) => {
        expect(service).toBeTruthy();
      }));
});
