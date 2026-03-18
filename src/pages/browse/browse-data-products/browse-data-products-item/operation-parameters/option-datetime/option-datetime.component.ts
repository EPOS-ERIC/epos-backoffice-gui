import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-datetime',
  templateUrl: './option-datetime.component.html',
  styleUrls: ['./option-datetime.component.scss'],
})
export class OptionDatetimeComponent {
  @Input() form!: UntypedFormGroup;

  public semanticTags = Object.values(SemanticTag);
}
