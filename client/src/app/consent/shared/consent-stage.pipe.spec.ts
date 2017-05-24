/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ConsentStagePipe } from './consent-stage.pipe';

describe('ConsentStagePipe', () => {

  // Arrange
  let pipe = new ConsentStagePipe();
  type ArgType = "text" | "icon" | "color";
  let argTypeTest : ArgType ;
  let testValue : any;
  // Assert
  it('create an instance', () => {
    //const pipe = new ConsentStagePipe();
    expect(pipe).toBeTruthy();
  });

  it('pipe transforms', () => {
    //const pipe = new ConsentStagePipe();

    expect(pipe.transform(testValue,"text")).toBe("test");
  });


});
