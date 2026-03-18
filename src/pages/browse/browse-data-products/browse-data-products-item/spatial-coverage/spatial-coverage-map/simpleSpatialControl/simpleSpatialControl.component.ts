import { Component, Input, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Location } from 'generated/backofficeSchemas';
import { Subject } from 'rxjs';
import { SpatialCoverageType } from 'src/utility/enums/spatialCoverageType.enum';

export interface SpatialExtentLocationIndexObj {
  location: string;
  index: number;
}
@Component({
  selector: 'app-simple-spatial-control',
  templateUrl: './simpleSpatialControl.component.html',
  styleUrls: ['./simpleSpatialControl.component.scss'],
})
export class SimpleSpatialControlComponent {
  @Input() index?: number;

  @Input() inputsDisabled = false;

  @Input()
  set spatialExtent(value: Location) {
    if (null != value) {
      this.setSpatialCoverageVariables(value);
      if (value.location?.includes(SpatialCoverageType.POINT)) {
        this.activeCoverageType = SpatialCoverageType.POINT;
      } else {
        this.activeCoverageType = SpatialCoverageType.POLYGON;
      }
    }
  }

  @Output() location = new Subject<SpatialExtentLocationIndexObj>();

  @Output() delete = new Subject<number>();

  @Output() save = new Subject<number>();

  public floatLabelControl = new UntypedFormControl('auto');

  public clearButtonEnabled = false;

  public polygonCoverage = '';

  public activeCoverageType?: SpatialCoverageType;

  public latitude = 0;

  public longitude = 0;

  public spatCovArr: Array<SpatialCoverageType>;

  public spatCovEnum = SpatialCoverageType;

  constructor() {
    this.spatCovArr = Object.values(SpatialCoverageType);
  }

  /**
   * The function sets spatial coverage variables based on the data product's spatial extent.
   */
  private setSpatialCoverageVariables(extent: Location) {
    if (extent.location?.includes(SpatialCoverageType.POINT)) {
      const coordStringArr = this.formatLocationFromObjectToString(extent.location).split(' ');
      const coordNumArr = coordStringArr.map((coordString: string) => Number(coordString));
      this.longitude = coordNumArr[0];
      this.latitude = coordNumArr[1];
    } else {
      this.polygonCoverage = this.formatLocationFromObjectToString(extent.location as string);
    }
  }

  /**
   * The function `formatLocationFromObjectToString` extracts a string representation of a location from
   * an object.
   * @param {string} location - The `location` parameter is a string that represents a location.
   * @returns a string.
   */
  private formatLocationFromObjectToString(location: string): string {
    let regex = /\(\((.*?)\)\)/g;
    if (location.includes(SpatialCoverageType.POINT)) {
      regex = /\((.*?)\)/g;
    }
    const match = regex.exec(location);
    return match !== null ? match[1] : '';
  }

  /**
   * The function `formatLocation` extracts a string representation of a location from
   * an object.
   * @param {string} location - The `location` parameter is a string that represents a location.
   * @returns a string.
   */
  public formatLocation() {
    let spatialExtentLocation = '';
    if (this.activeCoverageType === SpatialCoverageType.POLYGON) {
      spatialExtentLocation = this.activeCoverageType + '((' + this.polygonCoverage + '))';
    } else {
      spatialExtentLocation =
        this.activeCoverageType + '(' + this.longitude.toString() + ' ' + this.latitude.toString() + ')';
    }
    const emitObj: SpatialExtentLocationIndexObj = {
      location: spatialExtentLocation,
      index: this.index as number,
    };
    this.location.next(emitObj);
  }

  public handleDelete() {
    this.delete.next(this.index as number);
  }

  public handleSave() {
    this.save.next(this.index as number);
  }
}
