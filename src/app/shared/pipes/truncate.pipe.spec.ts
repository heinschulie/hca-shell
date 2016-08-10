/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { Truncate } from './truncate.pipe';

describe('Pipe: Truncate', () => {
  it('create an instance', () => {
    let pipe = new Truncate();
    expect(pipe).toBeTruthy();
  });
});
