import {Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadOutput, UploadInput, UploadFile, humanizeBytes} from 'ngx-uploader';
import {NotificationService} from "../../core/notification.service";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ValidationService} from "../../shared/validation.service";
import {DocumentToUploadMetadata} from "../shared/document-to-upload-metadata.model";
import {MedicalDocumentsService} from "../shared/medical-documents.service";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {UploadedDocumentTypeCode} from "../../shared/uploaded-document-type-code.model";
import {FileValidator} from "../../shared/file-validator.directive";


@Component({
  selector: 'c2s-medical-document-upload',
  templateUrl: './medical-document-upload.component.html',
  styleUrls: ['./medical-document-upload.component.scss']
})
export class MedicalDocumentUploadComponent implements OnInit {
  @Output() uploadedDocumentAdded = new EventEmitter<UploadedDocument>();
  @Input() documentTypeCodesList: UploadedDocumentTypeCode[];

  // A direct reference to the HTML form element as a ViewChild is necessary to properly reset file type input element (see resetUploadForm method below for details)
  @ViewChild('uploadForm') uploadForm: ElementRef;

  maxDescriptionLength: string = ValidationRules.MEDICAL_DOCUMENT_DESC_MAX_LENGTH.toString();

  uploadDocumentForm: FormGroup;
  files: UploadFile[];
  public uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private validationService: ValidationService,
              private medicalDocumentsService: MedicalDocumentsService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.uploadDocumentForm = this.initUploadDocumentFormGroup();
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'done') {
      if(!output.file.response.hasOwnProperty('error')){
        let newUploadedDocument: UploadedDocument = output.file.response;
        this.uploadedDocumentAdded.emit(newUploadedDocument);
        this.notificationService.i18nShow("MEDICAL_DOCUMENTS.UPLOAD_MEDICAL_DOCUMENT.UPLOAD_FORM.UPLOAD_SUCCESS");
      }else{
        this.medicalDocumentsService.handleShowUploadedDocumentListError(output.file.response.status.toString());
      }
    }
  }

  startUpload(): void {
    if(this.validationService.isValidForm(this.uploadDocumentForm)) {
      const formModel = this.uploadDocumentForm.value;
      let documentToUploadMetadata: DocumentToUploadMetadata = new DocumentToUploadMetadata();

      documentToUploadMetadata.documentName = formModel.documentName;
      documentToUploadMetadata.documentTypeCodeId = formModel.documentTypeCodeId;

      if(formModel.description){
        documentToUploadMetadata.description = formModel.description;
      }

      const event = this.medicalDocumentsService.prepareDocumentUpload(documentToUploadMetadata);
      this.uploadInput.emit(event);
      this.resetUploadForm();
    }else{
      this.notificationService.i18nShow("MEDICAL_DOCUMENTS.UPLOAD_MEDICAL_DOCUMENT.UPLOAD_FORM.FORM_INVALID_ERROR");
    }
  }

  private resetUploadForm(): void {
    // Reset FormGroup
    this.uploadDocumentForm.reset();
    // Manually reset native form element to clear out file input element (file input element currently not natively supported in FormGroup)
    this.uploadForm.nativeElement.reset();
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
      description: [null,
        [
          Validators.maxLength(ValidationRules.MEDICAL_DOCUMENT_DESC_MAX_LENGTH)
        ]
      ],
      fileUploadInput: [null,
        [
          FileValidator.validate
        ]
      ]
    });
  }
}
