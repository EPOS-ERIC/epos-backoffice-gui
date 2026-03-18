import { Component, Input } from '@angular/core';
import { FormArray, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActiveToggle } from '../toggle.interface';

@Component({
  selector: 'app-option-integer',
  templateUrl: './option-integer.component.html',
  styleUrls: ['./option-integer.component.scss'],
})
export class OptionIntegerComponent {
  @Input() form!: UntypedFormGroup;
  @Input() disableAddNewValue!: boolean;
  @Input() disabled!: boolean;

  public hideAddNewValue = false;
  public activeToggles: ActiveToggle[] = [];

  public handleAddNewValue(): void {
    const values = this.form.get('paramValue') as FormArray;
    values.push(new FormControl('', Validators.required));
  }

  public removeItem(index: number) {
    const value = this.form.get('paramValue') as FormArray;
    value.removeAt(index);
  }

  public handleValueChange(index: number): void {
    const values = this.form.get('paramValue') as FormArray;
    this.form.get('defaultValue')?.setValue(values.at(index).value);
  }

  public isChecked(index: number): boolean {
    const defaultValue = this.form.get('defaultValue')?.value;
    const values = this.form.get('paramValue') as FormArray;
    if (null != defaultValue) {
      return defaultValue === values.at(index).value;
    }
    return false;
  }

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

  // public disableSelect(index: number): boolean {
  //   // const canSelectMultiple = this.form.get('multipleValues')?.value === true;
  //   // const selectedAsDefaults = this.getControls('value').filter((item) => item.value.asDefault === true);

  //   // if (this.clickedIndex === index) {
  //   return false;
  //   // }
  //   // return !canSelectMultiple || selectedAsDefaults.length > 0;
  // }

  // public handleDefaultToggleChange(event: MatSlideToggleChange, index: number): void {
  //   const clickedIndex = Number(event.source._switchElement.nativeElement.id);
  //   if (event.checked === true) {
  //     this.clickedIndex = clickedIndex;
  //   }

  //   this.activeToggles = [];
  //   this.activeToggles.push({
  //     id: index,
  //     active: event.checked,
  //   });
  // }
}
