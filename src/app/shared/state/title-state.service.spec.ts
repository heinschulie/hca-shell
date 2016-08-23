/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { TitleStateService } from './title-state.service';

describe('Service: TitleState', () => {
  beforeEach(() => {
    addProviders([TitleStateService]);
  });

  it('should ...',
    inject([TitleStateService],
      (service: TitleStateService) => {
        expect(service).toBeTruthy();
      }));
});
