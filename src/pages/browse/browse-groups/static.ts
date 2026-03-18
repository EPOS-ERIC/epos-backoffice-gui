import { GroupEnum } from 'src/shared/enums/group.enum';
import { FilterItem } from 'src/shared/interfaces/form.interface';
import { UserGroupRequestStatus } from 'src/utility/enums/userGroupRequestStatus.enum';

export const statusOptions: FilterItem[] = [
  {
    option: '',
    label: 'Any',
  },
  {
    option: UserGroupRequestStatus.NONE,
    label: 'None',
  },
  {
    option: UserGroupRequestStatus.PENDING,
    label: 'Pending',
  },
  {
    option: UserGroupRequestStatus.ACCEPTED,
    label: 'Accepted',
  },
];

export const groupOptions = [
  {
    option: '',
    label: 'No filter',
  },
  {
    option: GroupEnum.ALL,
    label: 'All',
  },
  {
    option: GroupEnum.SEISOMOLOGY,
    label: 'Seismology',
  },
  {
    option: GroupEnum.NEAR_FAULT_OBSERVATORIES,
    label: 'Near Fault Observatories',
  },
  {
    option: GroupEnum.GNSS_DATA_AND_PRODUCTS,
    label: 'GNSS Data and Products',
  },
  {
    option: GroupEnum.VOLCANO_OBSERVATIONS,
    label: 'Volcano Observations',
  },
  {
    option: GroupEnum.SATELLITE_DATA,
    label: 'Satellite Data',
  },
  {
    option: GroupEnum.GEOMAGNETIC_OBSERVATIONS,
    label: 'Geomagnetic Observations',
  },
  {
    option: GroupEnum.ANTHROPOGENIC_HAZARDS,
    label: 'Anthropogenic Hazards',
  },
  {
    option: GroupEnum.GEOLOGICAL_INFORMATION_AND_MODELING,
    label: 'Geological Information and Modeling',
  },
  {
    option: GroupEnum.MULTI_SCALE_LABORATORIES,
    label: 'Multi-scale Laboratories',
  },
  {
    option: GroupEnum.TSUNAMI,
    label: 'Tsunami',
  },
];
