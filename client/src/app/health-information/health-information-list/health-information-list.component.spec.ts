import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HealthInformationListComponent} from './health-information-list.component';

describe('HealthInformationListComponent', () => {
  let component: HealthInformationListComponent;
  let fixture: ComponentFixture<HealthInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthInformationListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
