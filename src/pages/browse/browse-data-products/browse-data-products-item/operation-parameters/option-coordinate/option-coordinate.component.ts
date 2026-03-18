import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CoordinateType } from 'src/utility/enums/coordinateType.enum';

@Component({
  selector: 'app-option-coordinate',
  templateUrl: './option-coordinate.component.html',
  styleUrls: ['./option-coordinate.component.scss'],
})
export class OptionCoordinateComponent {
  @Input() form!: UntypedFormGroup;

  public coordinateTypes = Object.values(CoordinateType);
}
