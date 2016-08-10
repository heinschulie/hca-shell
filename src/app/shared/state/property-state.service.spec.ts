/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { PropertyStateService } from './property-state.service';

describe('PropertyState Service', () => {
  beforeEachProviders(() => [PropertyStateService]);

  it('should ...',
      inject([PropertyStateService], (service: PropertyStateService) => {
    expect(service).toBeTruthy();
  }));
});
