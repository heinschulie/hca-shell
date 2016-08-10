/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ListCardComponent } from './list-card.component';

describe('Component: ListCard', () => {
  it('should create an instance', () => {
    let component = new ListCardComponent();
    expect(component).toBeTruthy();
  });
});
