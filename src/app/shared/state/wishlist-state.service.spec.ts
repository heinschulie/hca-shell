/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { WishlistStateService } from './wishlist-state.service';

describe('WishlistState Service', () => {
  beforeEachProviders(() => [WishlistStateService]);

  it('should ...',
      inject([WishlistStateService], (service: WishlistStateService) => {
    expect(service).toBeTruthy();
  }));
});
