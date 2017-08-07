import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HealthInformationCdaDocumentSectionComponent} from './health-information-cda-document-section.component';

describe('HealthInformationCdaDocumentSectionComponent', () => {
  let component: HealthInformationCdaDocumentSectionComponent;
  let fixture: ComponentFixture<HealthInformationCdaDocumentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthInformationCdaDocumentSectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInformationCdaDocumentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
