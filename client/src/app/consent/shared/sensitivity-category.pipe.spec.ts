/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SensitivityCategoryPipe } from './sensitivity-category.pipe';
import {ShareSensitivityCategory} from "./share-sensitivity-category.model";
import {Identifier} from "../../shared/identifier.model";

describe('ShareSensitivityCategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new SensitivityCategoryPipe();
    expect(pipe).toBeTruthy();
  });

  let pipe = new SensitivityCategoryPipe();
  let mockShareSensitivityCategory = new ShareSensitivityCategory();
  let mockIdentifer = new Identifier('system test','value test');
  mockShareSensitivityCategory = {description: 'description Test',
    display: 'Display Test',
    id: 1,
    identifier: mockIdentifer};

  it('transforms undefined', () => {
    expect(pipe.transform(mockShareSensitivityCategory)).toBeUndefined();
  });
  it('transforms case display', () => {
    expect(pipe.transform(mockShareSensitivityCategory,"display")).toBe('Display Test');
  });
  it('transforms case description', () => {
    expect(pipe.transform(mockShareSensitivityCategory,"description")).toBe('description Test');
  });
  it('transforms case identifier system', () => {
    expect(pipe.transform(mockShareSensitivityCategory,"system")).toBe('system test');
  });
  it('transforms case identifier value', () => {
    expect(pipe.transform(mockShareSensitivityCategory,"value")).toBe('value test');
  });

});
