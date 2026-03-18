import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SemanticTag } from 'src/utility/enums/semanticTag.enum';

@Component({
  selector: 'app-option-date',
  templateUrl: './option-date.component.html',
  styleUrls: ['./option-date.component.scss'],
})
export class OptionDateComponent {
  @Input() form!: UntypedFormGroup;

  public semanticTags = Object.values(SemanticTag);
}
