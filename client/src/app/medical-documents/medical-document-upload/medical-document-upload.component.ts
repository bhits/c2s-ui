import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadOutput, UploadInput, UploadFile, humanizeBytes} from 'ngx-uploader';
import {NotificationService} from "../../core/notification.service";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ValidationService} from "../../shared/validation.service";
import {MedicalDocumentsService} from "../shared/medical-documents.service";
import {UploadedDocument} from "../../shared/uploaded-document.model";
import {ProfileService} from "../../security/shared/profile.service";
import {C2sUiApiUrlService} from "../../shared/c2s-ui-api-url.service";
import {TokenService} from "../../security/shared/token.service";
import {ExceptionService} from "../../core/exception.service";


@Component({
  selector: 'c2s-medical-document-upload',
  templateUrl: './medical-document-upload.component.html',
  styleUrls: ['./medical-document-upload.component.scss']
})
export class MedicalDocumentUploadComponent implements OnInit {
  @Output() uploadedDocumentAdded = new EventEmitter<UploadedDocument>();

  uploadDocumentForm: FormGroup;
  files: UploadFile[];
  public uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;

  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private notificationService: NotificationService,
              private validationService: ValidationService,
              private exceptionService: ExceptionService,
              private medicalDocumentsService: MedicalDocumentsService,
              private c2sUiApiUrlService: C2sUiApiUrlService,
              private profileService: ProfileService) {
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
        // FIXME: Add i18n support
        this.notificationService.show("Successfully uploaded medical document");
      }else{
        // FIXME: Add i18n support and improve error message
        console.log(output.file.response);
        this.notificationService.show("An error has occurred");
      }
    }
  }

  startUpload(): void {
    const formModel = this.uploadDocumentForm.value;

    // FIXME: Move everything below except the actual code which fires 'emit' to service.
    let currentUserMrn: string = this.profileService.getUserMrn();
    let phrDocumentsUrl = this.c2sUiApiUrlService.getPhrBaseUrl().concat("/uploadedDocuments/patients/").concat(currentUserMrn).concat("/documents");

    let customHeaders = {};

    let token = this.tokenService.getAccessToken();

    if (token && token['access_token']) {
      let access_token = token['access_token'];
      let access_token_string = 'Bearer ' + access_token;
      customHeaders = {
        "Authorization": access_token_string
      };
    }else{
      // FIXME: Replace this with proper error handling.
      throw new Error("token variable check failed");
    }

    const event: UploadInput = {
      type: 'uploadAll',
      fieldName: 'file',
      url: phrDocumentsUrl,
      method: 'POST',
      data: {
        documentName: formModel.documentName,
        documentTypeCodeId: formModel.documentTypeCodeId
      },
      concurrency: 1, // set sequential uploading of files with concurrency 1
      headers: customHeaders
    };

    this.uploadInput.emit(event);
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
}
