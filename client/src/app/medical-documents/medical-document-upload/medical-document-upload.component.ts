import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../core/notification.service";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ValidationService} from "../../shared/validation.service";
import {UploadMedicalDocument} from "../shared/upload-medical-document.model";
import {MedicalDocumentsService} from "../shared/medical-documents.service";
import {UploadedDocument} from "../../shared/uploaded-document.model";


@Component({
  selector: 'c2s-medical-document-upload',
  templateUrl: './medical-document-upload.component.html',
  styleUrls: ['./medical-document-upload.component.scss']
})
export class MedicalDocumentUploadComponent implements OnInit {
  uploadDocumentForm: FormGroup;
  @ViewChild('fileInputElement') fileInputElement: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private validationService: ValidationService,
              private medicalDocumentsService: MedicalDocumentsService) {
  }

  ngOnInit() {
    this.uploadDocumentForm = this.initUploadDocumentFormGroup();
  }

  handleSubmit(): void {
    const docToUpload = this.prepareUploadDocument();

    console.log(this.uploadDocumentForm.value);
    console.log(this.fileInputElement);
    console.log(docToUpload);

    // TODO: Invoke service call to actually upload document
  }

  private initUploadDocumentFormGroup() {
    return this.formBuilder.group({
      documentName: [null,
        [
          Validators.minLength(ValidationRules.MEDICAL_DOCUMENT_NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.MEDICAL_DOCUMENT_NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      documentTypeCodeId: [null, Validators.required],
    });
  }

  private prepareUploadDocument(): UploadMedicalDocument {
    const formModel = this.uploadDocumentForm.value;
    const fileToUpload = this.fileInputElement.nativeElement.files[0];
    return {
      file: fileToUpload,
      documentName: formModel.documentName,
      documentTypeCodeId: formModel.documentTypeCodeId,
    };
  }
}
