/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ImageViewerComponent } from './image-viewer.component';

describe('Component: ImageViewer', () => {
  it('should create an instance', () => {
    let component = new ImageViewerComponent();
    expect(component).toBeTruthy();
  });
});
