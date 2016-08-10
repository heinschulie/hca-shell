/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ScorecardService } from './scorecard.service';

describe('Scorecard Service', () => {
  beforeEachProviders(() => [ScorecardService]);

  it('should ...',
      inject([ScorecardService], (service: ScorecardService) => {
    expect(service).toBeTruthy();
  }));
});
