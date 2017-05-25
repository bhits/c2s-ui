/* tslint:disable:no-unused-variable */
import {SharePurposePipe} from "./share-purpose.pipe";
import { Pipe, PipeTransform } from '@angular/core';
import {SharePurpose} from "./share-purpose.model";
import {Identifier} from "../../shared/identifier.model";
describe('SharePurposePipe', () => {
  it('create an instance', () => {
    const pipe = new SharePurposePipe();
    expect(pipe).toBeTruthy();
  });

  let pipe = new SharePurposePipe();
  let mockSharePurpose = new SharePurpose();
  let mockIdentifer = new Identifier('system test','value test');
  mockSharePurpose = {description: 'description Test',
  display: 'Display Test',
  id: 1,
  identifier: mockIdentifer};

  it('transforms undefined', () => {
    expect(pipe.transform(mockSharePurpose)).toBeUndefined();
  });
  it('transforms case display', () => {
    expect(pipe.transform(mockSharePurpose,"display")).toBe('Display Test');
  });
  it('transforms case description', () => {
    expect(pipe.transform(mockSharePurpose,"description")).toBe('description Test');
  });
  it('transforms case identifier system', () => {
    expect(pipe.transform(mockSharePurpose,"system")).toBe('system test');
  });
  it('transforms case identifier value', () => {
    expect(pipe.transform(mockSharePurpose,"value")).toBe('value test');
  });
});
