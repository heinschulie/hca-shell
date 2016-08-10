/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { UserStateService } from './user-state.service';

describe('UserState Service', () => {
  beforeEachProviders(() => [UserStateService]);

  it('should ...',
      inject([UserStateService], (service: UserStateService) => {
    expect(service).toBeTruthy();
  }));
});
