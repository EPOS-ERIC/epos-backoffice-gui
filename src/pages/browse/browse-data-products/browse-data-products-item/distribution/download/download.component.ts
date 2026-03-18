import { Component, Input, OnInit, Output } from '@angular/core';
import { FormatTypes } from '../formats';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Distribution } from 'generated/backofficeSchemas';
import { HelpersService } from 'src/services/helpers.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-distribution-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DistributionDownloadComponent implements OnInit {
  @Input() urlInvalid: boolean | undefined = false;

  @Input() distribution!: Distribution;

  @Output() distributionChange = new Subject<Distribution>();

  constructor(private readonly formBuilder: FormBuilder, private readonly helpersService: HelpersService) {}

  public formats = FormatTypes;

  public form!: FormGroup;

  private initForm(): void {
    this.form = this.formBuilder.group({
      format: new FormControl(this.distribution?.format),
      downloadURL: new FormControl(this.distribution?.downloadURL, [
        Validators.required,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (control: AbstractControl): { [key: string]: any } | null => {
          if (this.helpersService.isValidHttpUrl(control.value)) {
            return null;
          } else {
            control.markAsTouched();
            return { 'error-class': control.value };
          }
        },
      ]),
    });

    this.form.valueChanges.subscribe(() => {
      this.distribution.format = this.form.get('format')?.value;
      this.distribution.downloadURL = this.helpersService.formatArrayVal(this.form.get('downloadURL')?.value);
      this.distributionChange.next(this.distribution);
    });
  }

  public ngOnInit(): void {
    this.initForm();
  }
}
