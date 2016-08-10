/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ScorecardStateService } from './scorecard-state.service';

describe('ScorecardState Service', () => {
  beforeEachProviders(() => [ScorecardStateService]);

  it('should ...',
      inject([ScorecardStateService], (service: ScorecardStateService) => {
    expect(service).toBeTruthy();
  }));
});
