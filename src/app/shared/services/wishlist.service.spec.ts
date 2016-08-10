/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { WishlistService } from './wishlist.service';

describe('Wishlist Service', () => {
  beforeEachProviders(() => [WishlistService]);

  it('should ...',
      inject([WishlistService], (service: WishlistService) => {
    expect(service).toBeTruthy();
  }));
});
