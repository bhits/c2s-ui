import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HealthInformationDocumentComponent} from './health-information-document.component';

describe('HealthInformationDocumentComponent', () => {
  let component: HealthInformationDocumentComponent;
  let fixture: ComponentFixture<HealthInformationDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthInformationDocumentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInformationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
