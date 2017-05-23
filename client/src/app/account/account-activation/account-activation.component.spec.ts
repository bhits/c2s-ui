/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {AccountService} from "../shared/account.service";
import { AccountActivationComponent } from './account-activation.component';

describe('AccountActivationComponent', () => {
  let component: AccountActivationComponent;
  let fixture: ComponentFixture<AccountActivationComponent>;

  //async before each
  beforeEach(async(() => {
    // declare account service stub
    let accountServiceStub={

    };
    TestBed.configureTestingModule({
      declarations: [ AccountActivationComponent ],
      providers: [{provide: AccountService, useValue: accountServiceStub }]//
    })
    .compileComponents();
  }));

  //synchronous before each
  beforeEach(() => {
    fixture = TestBed.createComponent(AccountActivationComponent);
    component = fixture.componentInstance;// AccountActivationComponent test instance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
