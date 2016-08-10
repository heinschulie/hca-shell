/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { PropertyService } from './property.service';

describe('Property Service', () => {
  beforeEachProviders(() => [PropertyService]);

  it('should ...',
      inject([PropertyService], (service: PropertyService) => {
    expect(service).toBeTruthy();
  }));
});
