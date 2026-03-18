import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { LinkedEntity, SoftwareApplication } from 'generated/backofficeSchemas';
import { Status } from 'src/utility/enums/status.enum';

export class SoftwareDetailDataSource extends BaseObject implements SoftwareApplication {
  public static readonly KEYS = {
    AUTHOR: 'author',
    CATEGORY: 'category',
    CHANGECOMMENT: 'changeComment',
    CHANGETIMESTAMP: 'changeTimestamp',
    CITATION: 'citation',
    CONTACTPOINT: 'contactPoint',
    CONTRIBUTOR: 'contributor',
    CREATOR: 'creator',
    DESCRIPTION: 'description',
    DOWNLOADURL: 'downloadURL',
    EDITORID: 'editorId',
    FILEPROVENANCE: 'fileProvenance',
    FILESIZE: 'fileSize',
    FUNDER: 'funder',
    GROUPS: 'groups',
    IDENTIFIER: 'identifier',
    INPUTPARAMETER: 'inputParameter',
    INSTALLURL: 'installURL',
    INSTANCECHANGEDID: 'instanceChangedId',
    INSTANCEID: 'instanceId',
    KEYWORDS: 'keywords',
    LICENSEURL: 'licenseURL',
    MAINENTITYOFPAGE: 'mainEntityOfPage',
    MAINTAINER: 'maintainer',
    MEMORYREQUIREMENTS: 'memoryRequirements',
    METAID: 'metaId',
    NAME: 'name',
    OPERATINGSYSTEM: 'operatingSystem',
    OPERATION: 'operation',
    OUTPUTPARAMETER: 'outputParameter',
    PARAMETER: 'paramter',
    PROCESSORREQUIREMENTS: 'processorRequirements',
    PROVIDER: 'provider',
    PUBLISHER: 'publisher',
    RELATEDOPERATION: 'relatedOperation',
    REQUIREMENTS: 'requirements',
    SOFTWARESTATUS: 'softwareStatus',
    SOFTWAREVERSION: 'softwareVersion',
    SPATIAL: 'spatial',
    STATUS: 'status',
    STORAGEREQUIREMENTS: 'storageRequirements',
    TEMPORAL: 'temporal',
    TIMEREQUIRED: 'timeRequired',
    TOBEDELETE: 'toBeDelete',
    UID: 'uid',
    VERSION: 'version',
    VERSIONID: 'versionId',
  };

  public readonly author: Array<LinkedEntity> | undefined;
  public readonly category: Array<LinkedEntity> | undefined;
  public readonly changeComment: string | undefined;
  public readonly changeTimestamp: string | undefined;
  public readonly citation: string[] | undefined;
  public readonly contactPoint: LinkedEntity[] | undefined;
  public readonly contributor: LinkedEntity[] | undefined;
  public readonly creator: LinkedEntity[] | undefined;
  public readonly description: string | undefined;
  public readonly downloadURL: string | undefined;
  public readonly editorId?: string | undefined;
  public readonly fileProvenance?: string | undefined;
  public readonly fileSize?: string | undefined;
  public readonly funder?: LinkedEntity[] | undefined;
  public readonly groups?: string[] | undefined;
  public readonly identifier?: LinkedEntity[] | undefined;
  public readonly inputParameter?: LinkedEntity[] | undefined;
  public readonly installURL?: string | undefined;
  public readonly instanceChangedId?: string | undefined;
  public readonly instanceId?: string | undefined;
  public readonly keywords?: string | undefined;
  public readonly licenseURL?: string | undefined;
  public readonly mainEntityOfPage?: string | undefined;
  public readonly maintainer?: LinkedEntity[] | undefined;
  public readonly memoryRequirements?: string | undefined;
  public readonly metaId?: string | undefined;
  public readonly name?: string | undefined;
  public readonly operatingSystem?: string[] | undefined;
  public readonly operation?: string | undefined;
  public readonly outputParameter?: LinkedEntity[] | undefined;
  public readonly parameter?: LinkedEntity[] | undefined;
  public readonly processorRequirements?: string | undefined;
  public readonly provider?: LinkedEntity[] | undefined;
  public readonly publisher?: LinkedEntity[] | undefined;
  public readonly relatedOperation?: LinkedEntity[] | undefined;
  public readonly requirements?: string | undefined;
  public readonly softwareStatus?: string | undefined;
  public readonly softwareVersion?: string | undefined;
  public readonly spatial?: string | undefined;
  public readonly status?: 'ARCHIVED' | 'DISCARDED' | 'DRAFT' | 'SUBMITTED' | 'PUBLISHED' | 'PENDING' | undefined;
  public readonly storageRequirements?: string | undefined;
  public readonly temporal?: string | undefined;
  public readonly timeRequired?: string | undefined;
  public readonly toBeDelete?: string | undefined;
  public readonly uid?: string | undefined;
  public readonly version?: string | undefined;
  public readonly versionId?: string | undefined;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.author = this._getArray(SoftwareDetailDataSource.KEYS.AUTHOR);
    this.category = this._getArray(SoftwareDetailDataSource.KEYS.CATEGORY);
    this.changeComment = this._getString(SoftwareDetailDataSource.KEYS.CHANGECOMMENT);
    this.changeTimestamp = this._getString(SoftwareDetailDataSource.KEYS.CHANGETIMESTAMP);
    this.citation = this._getArray(SoftwareDetailDataSource.KEYS.CITATION);
    this.contactPoint = this._getArray(SoftwareDetailDataSource.KEYS.CONTACTPOINT);
    this.contributor = this._getArray(SoftwareDetailDataSource.KEYS.CONTRIBUTOR);
    this.creator = this._getArray(SoftwareDetailDataSource.KEYS.CREATOR);
    this.description = this._getString(SoftwareDetailDataSource.KEYS.DESCRIPTION);
    this.downloadURL = this._getString(SoftwareDetailDataSource.KEYS.DOWNLOADURL);
    this.editorId = this._getString(SoftwareDetailDataSource.KEYS.EDITORID);
    this.fileProvenance = this._getString(SoftwareDetailDataSource.KEYS.FILEPROVENANCE);
    this.fileSize = this._getString(SoftwareDetailDataSource.KEYS.FILESIZE);
    this.funder = this._getArray(SoftwareDetailDataSource.KEYS.FUNDER);
    this.groups = this._getArray(SoftwareDetailDataSource.KEYS.GROUPS);
    this.identifier = this._getArray(SoftwareDetailDataSource.KEYS.IDENTIFIER);
    this.inputParameter = this._getArray(SoftwareDetailDataSource.KEYS.INPUTPARAMETER);
    this.installURL = this._getString(SoftwareDetailDataSource.KEYS.INSTALLURL);
    this.instanceChangedId = this._getString(SoftwareDetailDataSource.KEYS.INSTANCECHANGEDID);
    this.instanceId = this._getString(SoftwareDetailDataSource.KEYS.INSTANCEID);
    this.keywords = this._getString(SoftwareDetailDataSource.KEYS.KEYWORDS);
    this.licenseURL = this._getString(SoftwareDetailDataSource.KEYS.LICENSEURL);
    this.mainEntityOfPage = this._getString(SoftwareDetailDataSource.KEYS.MAINENTITYOFPAGE);
    this.maintainer = this._getArray(SoftwareDetailDataSource.KEYS.MAINTAINER);
    this.memoryRequirements = this._getString(SoftwareDetailDataSource.KEYS.MEMORYREQUIREMENTS);
    this.metaId = this._getString(SoftwareDetailDataSource.KEYS.METAID);
    this.name = this._getString(SoftwareDetailDataSource.KEYS.NAME);
    this.operatingSystem = this._getArray(SoftwareDetailDataSource.KEYS.OPERATINGSYSTEM);
    this.operation = this._getString(SoftwareDetailDataSource.KEYS.OPERATION);
    this.outputParameter = this._getArray(SoftwareDetailDataSource.KEYS.OUTPUTPARAMETER);
    this.parameter = this._getArray(SoftwareDetailDataSource.KEYS.PARAMETER);
    this.processorRequirements = this._getString(SoftwareDetailDataSource.KEYS.PROCESSORREQUIREMENTS);
    this.provider = this._getArray(SoftwareDetailDataSource.KEYS.PROVIDER);
    this.publisher = this._getArray(SoftwareDetailDataSource.KEYS.PUBLISHER);
    this.relatedOperation = this._getArray(SoftwareDetailDataSource.KEYS.RELATEDOPERATION);
    this.requirements = this._getString(SoftwareDetailDataSource.KEYS.REQUIREMENTS);
    this.softwareStatus = this._getString(SoftwareDetailDataSource.KEYS.SOFTWARESTATUS);
    this.softwareVersion = this._getString(SoftwareDetailDataSource.KEYS.SOFTWAREVERSION);
    this.spatial = this._getString(SoftwareDetailDataSource.KEYS.SPATIAL);
    this.status = this._getValue(SoftwareDetailDataSource.KEYS.STATUS) as Status;
    this.storageRequirements = this._getString(SoftwareDetailDataSource.KEYS.STORAGEREQUIREMENTS);
    this.temporal = this._getString(SoftwareDetailDataSource.KEYS.TEMPORAL);
    this.timeRequired = this._getString(SoftwareDetailDataSource.KEYS.TIMEREQUIRED);
    this.toBeDelete = this._getString(SoftwareDetailDataSource.KEYS.TOBEDELETE);
    this.uid = this._getString(SoftwareDetailDataSource.KEYS.UID);
    this.version = this._getString(SoftwareDetailDataSource.KEYS.VERSION);
    this.versionId = this._getString(SoftwareDetailDataSource.KEYS.VERSIONID);
  }
}
