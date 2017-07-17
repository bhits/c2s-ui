import {Directive, HostListener} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from "@angular/forms";

@Directive({
  selector: "input[type=file]",
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor, multi: true}
  ]
})
export class FileValueAccessor implements ControlValueAccessor {
  value: any;
  control: FormControl = new FormControl();

  @HostListener('change', ['$event.target.files']) onChange(_) {
  }

  @HostListener('onTouched') onTouched() {
  }

  writeValue(value) {
    this.control.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
