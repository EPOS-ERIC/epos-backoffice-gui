import { Component, Input } from '@angular/core';
import { FormArray, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActiveToggle } from '../toggle.interface';

@Component({
  selector: 'app-option-complex',
  templateUrl: './option-complex.component.html',
  styleUrl: './option-complex.component.scss',
})
export class OptionComplexComponent {
  @Input() id: string = '';

  @Input() form!: UntypedFormGroup;

  @Input() disableAddNewValue!: boolean;

  private readonly clickedIndex!: number;

  public activeToggles: ActiveToggle[] = [];

  public getControls(field: string) {
    return (this.form.get(field) as FormArray).controls;
  }

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

  // public disableSelect(index: number): boolean {
  //   const canSelectMultiple = this.form.get('multipleValues')?.value === true;

  //   // const selectedAsDefaults = this.getControls('items').filter((item) => item.value.asDefault === true);
  //   // TODO: 'selectedAsDefaults' is not defined.
  //   const selectedAsDefaults = [];
  //   if (this.clickedIndex === index) {
  //     return false;
  //   }
  //   return !canSelectMultiple || selectedAsDefaults.length > 0;
  // }
}
