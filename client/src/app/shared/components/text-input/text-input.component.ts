import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
@ViewChild('input', {static: true}) input: ElementRef | undefined;
@Input() type = 'text';
@Input() label: string | undefined;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }


  // tslint:disable-next-line: typedef
  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }

  // tslint:disable-next-line: typedef
  onChange(event: any) {}
  // tslint:disable-next-line: typedef
  onTouched() {}

  writeValue(obj: any): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.input!.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }



}
