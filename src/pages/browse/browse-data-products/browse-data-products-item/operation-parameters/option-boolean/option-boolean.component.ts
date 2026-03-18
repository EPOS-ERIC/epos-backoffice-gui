import { Component, Input } from '@angular/core';
import { ParametersFormService } from '../parameters-form.service';

@Component({
  selector: 'app-option-boolean',
  templateUrl: './option-boolean.component.html',
  styleUrls: ['./option-boolean.component.scss'],
})
export class OptionBooleanComponent {
  @Input() param!: any;
  @Input() disabled = false;

  constructor(private formService: ParametersFormService) {}

  public handleCacheParam(updatedMapping: any): void {
    this.formService.cacheParam(updatedMapping);
  }
}
