import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInformationCdaDocumentComponent } from './health-information-cda-document.component';

describe('HealthInformationCdaDocumentComponent', () => {
  let component: HealthInformationCdaDocumentComponent;
  let fixture: ComponentFixture<HealthInformationCdaDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInformationCdaDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInformationCdaDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
