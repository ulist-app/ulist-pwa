/* eslint-disable camelcase */
import PouchDb from 'pouchdb-browser'

export class PouchDatasource {
  readonly api: PouchDatabaseApi

  constructor (databaseURL: string) {
    this.api = new PouchDb(databaseURL) as PouchDatabaseApi
  }
}

interface EventEmitter {
  addListener(event: string | symbol, listener: Function): this;

  on(event: string | symbol, listener: Function): this;

  once(event: string | symbol, listener: Function): this;

  removeListener(event: string | symbol, listener: Function): this;

  removeAllListeners(event?: string | symbol): this;

  setMaxListeners(n: number): this;

  getMaxListeners(): number;

  listeners(event: string | symbol): Function[];

  emit(event: string | symbol, ...args: any[]): boolean;

  listenerCount(type: string | symbol): number;

  prependListener(event: string | symbol, listener: Function): this;

  prependOnceListener(event: string | symbol, listener: Function): this;

  eventNames(): Array<string | symbol>;
}

type Fetch = (
  url: string | Request,
  // eslint-disable-next-line no-undef
  opts?: RequestInit
) => Promise<Response>;

interface ConditionOperators {
  /** Match fields "less than" this one. */
  $lt?: any;

  /** Match fields "greater than" this one. */
  $gt?: any;

  /** Match fields "less than or equal to" this one. */
  $lte?: any;

  /** Match fields "greater than or equal to" this one. */
  $gte?: any;

  /** Match fields equal to this one. */
  $eq?: any;

  /** Match fields not equal to this one. */
  $ne?: any;

  /** True if the field should exist, false otherwise. */
  $exists?: boolean | undefined;

  /** One of: "null", "boolean", "number", "string", "array", or "object". */
  $type?: 'null' | 'boolean' | 'number' | 'string' | 'array' | 'object' | undefined;

  /** The document field must exist in the list provided. */
  $in?: any[] | undefined;

  /** The document field must not exist in the list provided. */
  $nin?: any[] | undefined;

  /** Special condition to match the length of an array field in a document. Non-array fields cannot match this condition. */
  $size?: number | undefined;

  /**
   * Divisor and Remainder are both positive or negative integers.
   * Non-integer values result in a 404 status.
   * Matches documents where (field % Divisor == Remainder) is true, and only when the document field is an integer.
   * [divisor, remainder]
   */
  $mod?: [number, number] | undefined;

  /** A regular expression pattern to match against the document field. Only matches when the field is a string value and matches the supplied regular expression. */
  $regex?: string | undefined;

  /** Matches an array value if it contains all the elements of the argument array. */
  $all?: any[] | undefined;

  $elemMatch?: ConditionOperators | undefined;
}

interface CombinationOperators {
  /** Matches if all the selectors in the array match. */
  $and?: Selector[] | undefined;

  /** Matches if any of the selectors in the array match. All selectors must use the same index. */
  $or?: Selector[] | undefined;

  /** Matches if the given selector does not match. */
  $not?: Selector | undefined;

  /** Matches if none of the selectors in the array match. */
  $nor?: Selector[] | undefined;
}

interface Selector extends CombinationOperators {
  [field: string]: Selector | Selector[] | ConditionOperators | any;

  _id?: string | ConditionOperators | undefined;
}

interface Error {
  /**
   * HTTP Status Code during HTTP or HTTP-like operations
   */
  status?: number | undefined;
  name?: string | undefined;
  message?: string | undefined;
  reason?: string | undefined;
  error?: string | boolean | undefined;
  id?: string | undefined;
  rev?: RevisionId | undefined;
}

type Callback<R> = (error: Error | null, result: R | null) => void;
type DocumentId = string;
type DocumentKey = string;
type AttachmentId = string;
type RevisionId = string;
type Availability = 'available' | 'compacted' | 'not compacted' | 'missing';
type AttachmentData = string | Blob | Buffer;

interface Options {
  fetch?: Fetch | undefined;
}

interface BasicResponse {
  /** `true` if the operation was successful; `false` otherwise */
  ok: boolean;
}

interface Response extends BasicResponse {
  /** id of the targeted document */
  id: DocumentId;
  /** resulting revision of the targeted document */
  rev: RevisionId;
}

interface DatabaseInfo {
  /** Name of the database you gave when you called new PouchDB(), and also the unique identifier for the database. */
  db_name: string;

  /** Total number of non-deleted documents in the database. */
  doc_count: number;

  /** Sequence number of the database. It starts at 0 and gets incremented every time a document is added or modified */
  update_seq: number | string;
}

interface Revision<Content extends {}> {
  ok: Document<Content> & RevisionIdMeta;
}

interface RevisionInfo {
  rev: RevisionId;
  status: Availability;
}

interface RevisionDiffOptions {
  [DocumentId: string]: string[];
}

interface RevisionDiff {
  missing?: string[] | undefined;
  possible_ancestors?: string[] | undefined;
}

interface RevisionDiffResponse {
  [DocumentId: string]: RevisionDiff;
}

interface IdMeta {
  _id: DocumentId;
}

interface RevisionIdMeta {
  _rev: RevisionId;
}

interface GetMeta {
  /**
   * Conflicting leaf revisions.
   *
   * Only present if `GetOptions.conflicts` is `true`
   */
  _conflicts?: RevisionId[] | undefined;
  _rev: RevisionId;
  /** Only present if `GetOptions.revs` is `true` */
  _revs_info?: RevisionInfo[] | undefined;
  /** Only present if `GetOptions.revs_info` is `true` */
  _revisions?: {
    ids: RevisionId[];
    start: number;
  } | undefined;

  /** Attachments where index is attachmentId */
  _attachments?: Attachments | undefined;
}

/**
 * Stub attachments are returned by PouchDB by default (attachments option set to false)
 */
interface StubAttachment {
  /**
   * Mime type of the attachment
   */
  content_type: string;

  /**
   * Database digest of the attachment
   */
  digest: string;

  /**
   * Attachment is a stub
   */
  stub: true;

  /**
   * Length of the attachment
   */
  length: number;
}

/**
 * Full attachments are used to create new attachments or returned when the attachments option
 * is true.
 */
interface FullAttachment {
  /**
   * Mime type of the attachment
   */
  content_type: string;

  /** MD5 hash, starts with "md5-" prefix; populated by PouchDB for new attachments */
  digest?: string | undefined;

  /**
   * {string} if `binary` was `false`
   * {Blob|Buffer} if `binary` was `true`
   */
  data: AttachmentData;
}

type Attachment = StubAttachment | FullAttachment;

interface Attachments {
  [attachmentId: string]: Attachment;
}

type NewDocument<Content extends {}> = Content;
type Document<Content extends {}> = Content & IdMeta;
type ExistingDocument<Content extends {}> =
  Document<Content> & RevisionIdMeta;

/** Existing doc or just object with `_id` and `_rev` */
type RemoveDocument = IdMeta & RevisionIdMeta;

type PostDocument<Content extends {}> = NewDocument<Content> & {
  filters?: { [filterName: string]: string } | undefined;
  views?: {
    [viewName: string]: {
      map: string,
      reduce?: string | undefined
    }
  } | undefined;

  /** You can update an existing doc using _rev */
  _rev?: RevisionId | undefined;

  _attachments?: Attachments | undefined;
};

type PutDocument<Content extends {}> = PostDocument<Content> & ChangesMeta & {
  _id?: DocumentId | undefined;
};

interface AllDocsOptions extends Options {
  /**
   * Include attachment data for each document.
   *
   * Requires `include_docs` to be `true`.
   *
   * By default, attachments are Base64-encoded.
   * @see binary
   */
  attachments?: boolean | undefined;
  /**
   * Return attachments as Buffers.
   *
   * Requires `include_docs` to be `true`.
   * Requires `attachments` to be `true`.
   */
  binary?: boolean | undefined;
  /**
   * Include conflict information for each document.
   *
   * Requires `include_docs` to be `true`.
   */
  conflicts?: boolean | undefined;
  /** Reverse ordering of results. */
  descending?: boolean | undefined;
  /** Include contents for each document. */
  include_docs?: boolean | undefined;
  /** Maximum number of documents to return. */
  limit?: number | undefined;
  /**
   * Number of documents to skip before returning.
   *
   * Causes poor performance on IndexedDB and LevelDB.
   */
  skip?: number | undefined;
  /**
   * Include an update_seq value indicating which sequence id
   * of the underlying database the view reflects.
   */
  update_seq?: boolean | undefined;
}

interface AllDocsWithKeyOptions extends AllDocsOptions {
  /** Constrain results to documents matching this key. */
  key: DocumentKey;
}

interface AllDocsWithKeysOptions extends AllDocsOptions {
  /** Constrains results to documents matching any of these keys. */
  keys: DocumentId[];
}

interface AllDocsWithinRangeOptions extends AllDocsOptions {
  /** Low end of range, or high end if `descending` is `true`. */
  startkey: DocumentKey;
  /** High end of range, or low end if `descending` is `true`. */
  endkey: DocumentKey;
  /**
   * Include any documents identified by `endkey`.
   *
   * Defaults to `true`.
   */
  inclusive_end?: boolean | undefined;
}

interface AllDocsMeta {
  /** Only present if `conflicts` is `true` */
  _conflicts?: RevisionId[] | undefined;

  _attachments?: Attachments | undefined;
}

interface AllDocsResponse<Content extends {}> {
  /** The `skip` if provided, or in CouchDB the actual offset */
  offset: number;
  total_rows: number;
  update_seq?: number | string | undefined;
  rows: Array<{
    /** Only present if `include_docs` was `true`. */
    doc?: ExistingDocument<Content & AllDocsMeta> | undefined;
    id: DocumentId;
    key: DocumentKey;
    value: {
      rev: RevisionId;
      deleted?: boolean | undefined;
    }
  }>;
}

interface BulkDocsOptions extends Options {
  new_edits?: boolean | undefined;
}

interface BulkGetOptions extends Options {
  docs: Array<{ id: string; rev?: RevisionId | undefined }>;
  revs?: boolean | undefined;
  attachments?: boolean | undefined;
  binary?: boolean | undefined;
}

interface BulkGetResponse<Content extends {}> {
  results: Array<{
    id: string,
    docs: Array<{ ok: Content & GetMeta } | { error: Error }>
  }>;
}

interface ChangesMeta {
  _conflicts?: RevisionId[] | undefined;
  _deleted?: boolean | undefined;
  _attachments?: Attachments | undefined;
}

interface ChangesOptions {
  /**
   * Does "live" changes.
   */
  live?: boolean | undefined;

  /**
   * Start the results from the change immediately after the given sequence number.
   * You can also pass `'now'` if you want only new changes (when `live` is `true`).
   *
   */
  since?: 'now' | number | string | undefined;

  /**
   * Request timeout (in milliseconds).
   */
  timeout?: number | false | undefined;

  /** Include contents for each document. */
  include_docs?: boolean | undefined;

  /** Maximum number of documents to return. */
  limit?: number | false | undefined;

  /** Include conflicts. */
  conflicts?: boolean | undefined;

  /** Include attachments. */
  attachments?: boolean | undefined;

  /** Return attachment data as Blobs/Buffers, instead of as base64-encoded strings. */
  binary?: boolean | undefined;

  /** Reverse the order of the output documents. */
  descending?: boolean | undefined;

  /**
   * For http adapter only, time in milliseconds for server to give a heartbeat to keep long connections open.
   * Defaults to 10000 (10 seconds), use false to disable the default.
   */
  heartbeat?: number | false | undefined;

  /**
   * Reference a filter function from a design document to selectively get updates.
   * To use a view function, pass '_view' here and provide a reference to the view function in options.view.
   * See filtered changes for details.
   */
  filter?: string | ((doc: any, params: any) => any) | undefined;

  /** Only show changes for docs with these ids (array of strings). */
  doc_ids?: string[] | undefined;

  /**
   * Object containing properties that are passed to the filter function, e.g. {"foo:"bar"},
   * where "bar" will be available in the filter function as params.query.foo.
   * To access the params, define your filter function like function (doc, params).
   */
  query_params?: { [paramName: string]: any } | undefined;

  /**
   * Specify a view function (e.g. 'design_doc_name/view_name' or 'view_name' as shorthand for 'view_name/view_name') to act as a filter.
   * Documents counted as “passed” for a view filter if a map function emits at least one record for them.
   * Note: options.filter must be set to '_view' for this option to work.
   */
  view?: string | undefined;

  /**
   * Filter using a query/pouchdb-find selector. Note: Selectors are not supported in CouchDB 1.x.
   * Cannot be used in combination with the filter option.
   */
  selector?: Selector | undefined;

  /**
   * (previously options.returnDocs): Is available for non-http databases and defaults to true.
   * Passing false prevents the changes feed from keeping all the documents in memory – in other
   * words complete always has an empty results array, and the change event is the only way to get the event.
   * Useful for large change sets where otherwise you would run out of memory.
   */
  return_docs?: boolean | undefined;

  /**
   * Only available for http databases, this configures how many changes to fetch at a time.
   * Increasing this can reduce the number of requests made. Default is 25.
   */
  batch_size?: number | undefined;

  /**
   * Specifies how many revisions are returned in the changes array.
   * The default, 'main_only', will only return the current “winning” revision;
   * 'all_docs' will return all leaf revisions (including conflicts and deleted former conflicts).
   * Most likely you won’t need this unless you’re writing a replicator.
   */
  style?: 'main_only' | 'all_docs' | undefined;

  /**
   * Only available for http databases. Specifies that seq information only be generated every N changes.
   * Larger values can improve changes throughput with CouchDB 2.0 and later.
   * Note that last_seq is always populated regardless.
   */
  seq_interval?: number | undefined;
}

interface ChangesResponseChange<Content extends {}> {
  id: string;
  seq: number | string;
  changes: Array<{ rev: string }>;
  deleted?: boolean | undefined;
  doc?: ExistingDocument<Content & ChangesMeta> | undefined;
}

interface ChangesResponse<Content extends {}> {
  status: string;
  last_seq: number | string;
  results: Array<ChangesResponseChange<Content>>;
}

interface Changes<Content extends {}> extends EventEmitter, Promise<ChangesResponse<Content>> {
  on(event: 'change', listener: (value: ChangesResponseChange<Content>) => any): this;

  on(event: 'complete', listener: (value: ChangesResponse<Content>) => any): this;

  on(event: 'error', listener: (value: any) => any): this;

  cancel(): void;
}

interface GetOptions extends Options {
  /** Include list of conflicting leaf revisions. */
  conflicts?: boolean | undefined;
  /** Specific revision to fetch */
  rev?: RevisionId | undefined;
  /** Include revision history of the document. */
  revs?: boolean | undefined;
  /**
   * Include a list of revisions of the document, and their
   * availability.
   */
  revs_info?: boolean | undefined;

  /** Include attachment data. */
  attachments?: boolean | undefined;

  /** Return attachment data as Blobs/Buffers, instead of as base64-encoded strings. */
  binary?: boolean | undefined;

  /** Forces retrieving latest “leaf” revision, no matter what rev was requested. */
  latest?: boolean | undefined;
}

interface GetOpenRevisions extends Options {
  /**
   * Fetch all leaf revisions if open_revs="all" or fetch all leaf
   * revisions specified in open_revs array. Leaves will be returned
   * in the same order as specified in input array.
   */
  open_revs: 'all' | RevisionId[];

  /** Include revision history of the document. */
  revs?: boolean | undefined;
}

interface CompactOptions extends Options {
  interval?: number | undefined;
}

interface PutOptions extends Options {
  force?: boolean | undefined;
}

interface RemoveAttachmentResponse extends BasicResponse {
  id: DocumentId;
  rev: RevisionId;
}

interface PouchDatabaseApi<Content extends {} = {}> extends EventEmitter {
  /** The name passed to the PouchDB constructor and unique identifier of the database. */
  name: string;

  /** Fetch all documents matching the given options. */
  allDocs<Model>(options?: AllDocsWithKeyOptions | AllDocsWithKeysOptions | AllDocsWithinRangeOptions | AllDocsOptions):
    Promise<AllDocsResponse<Content & Model>>;

  /**
   * Create, update or delete multiple documents. The docs argument is an array of documents.
   * If you omit an _id parameter on a given document, the database will create a new document and assign the ID for you.
   * To update a document, you must include both an _id parameter and a _rev parameter,
   * which should match the ID and revision of the document on which to base your updates.
   * Finally, to delete a document, include a _deleted parameter with the value true.
   */
  bulkDocs<Model>(docs: Array<PutDocument<Content & Model>>,
                  options: BulkDocsOptions | null,
                  callback: Callback<Array<Response | Error>>): void;

  /**
   * Create, update or delete multiple documents. The docs argument is an array of documents.
   * If you omit an _id parameter on a given document, the database will create a new document and assign the ID for you.
   * To update a document, you must include both an _id parameter and a _rev parameter,
   * which should match the ID and revision of the document on which to base your updates.
   * Finally, to delete a document, include a _deleted parameter with the value true.
   */
  bulkDocs<Model>(docs: Array<PutDocument<Content & Model>>,
                  options?: BulkDocsOptions): Promise<Array<Response | Error>>;

  /** Compact the database */
  compact(options?: CompactOptions): Promise<Response>;

  /** Compact the database */
  compact(options: CompactOptions,
          callback: Callback<Response>): void;

  /** Destroy the database */
  destroy(options: Options | null,
          callback: Callback<any>): void;

  /** Destroy the database */
  destroy(options?: Options | null): Promise<void>;

  /** Fetch a document */
  get<Model>(docId: DocumentId,
             options: GetOptions | null,
             callback: Callback<Document<Content & Model> & GetMeta>
  ): void;

  /** Fetch a document */
  get<Model>(docId: DocumentId,
             options: GetOpenRevisions,
             callback: Callback<Array<Revision<Content & Model>>>
  ): void;

  /** Fetch a document */
  get<Model>(docId: DocumentId,
             options?: GetOptions
  ): Promise<Document<Content & Model> & GetMeta>;

  /** Fetch a document */
  get<Model>(docId: DocumentId,
             options: GetOpenRevisions
  ): Promise<Array<Revision<Content & Model>>>;

  /**
   * Create a new document without providing an id.
   *
   * You should prefer put() to post(), because when you post(), you are
   * missing an opportunity to use allDocs() to sort documents by _id
   * (because your _ids are random).
   *
   * @see {@link https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html|PouchDB Pro Tips}
   */
  post<Model>(doc: PostDocument<Content & Model>,
              options: Options | null,
              callback: Callback<Response>): void;

  /**
   * Create a new document without providing an id.
   *
   * You should prefer put() to post(), because when you post(), you are
   * missing an opportunity to use allDocs() to sort documents by _id
   * (because your _ids are random).
   *
   * @see {@link https://pouchdb.com/2014/06/17/12-pro-tips-for-better-code-with-pouchdb.html|PouchDB Pro Tips}
   */
  post<Model>(doc: PostDocument<Content & Model>,
              options?: Options): Promise<Response>;

  /**
   * Create a new document or update an existing document.
   *
   * If the document already exists, you must specify its revision _rev,
   * otherwise a conflict will occur.
   * There are some restrictions on valid property names of the documents.
   * If you try to store non-JSON data (for instance Date objects) you may
   * see inconsistent results.
   */
  put<Model>(doc: PutDocument<Content & Model>,
             options: PutOptions | null,
             callback: Callback<Response>): void;

  /**
   * Create a new document or update an existing document.
   *
   * If the document already exists, you must specify its revision _rev,
   * otherwise a conflict will occur.
   * There are some restrictions on valid property names of the documents.
   * If you try to store non-JSON data (for instance Date objects) you may
   * see inconsistent results.
   */
  put<Model>(doc: PutDocument<Content & Model>,
             options?: PutOptions): Promise<Response>;

  /** Remove a doc from the database */
  remove(doc: RemoveDocument,
         options: Options,
         callback: Callback<Response>): void;

  /** Remove a doc from the database */
  remove(docId: DocumentId,
         revision: RevisionId,
         options: Options,
         callback: Callback<Response>): void;

  /** Remove a doc from the database */
  remove(doc: RemoveDocument,
         options?: Options): Promise<Response>;

  /** Remove a doc from the database */
  remove(docId: DocumentId,
         revision: RevisionId,
         options?: Options): Promise<Response>;

  /** Get database information */
  info(callback: Callback<DatabaseInfo>): void;

  /** Get database information */
  info(): Promise<DatabaseInfo>;

  /**
   * A list of changes made to documents in the database, in the order they were made.
   * It returns an object with the method cancel(), which you call if you don’t want to listen to new changes anymore.
   *
   * It is an event emitter and will emit a 'change' event on each document change,
   * a 'complete' event when all the changes have been processed, and an 'error' event when an error occurs.
   * Calling cancel() will unsubscribe all event listeners automatically.
   */
  changes<Model>(options: ChangesOptions | null,
                 callback: Callback<Changes<Content & Model>>): void;

  /**
   * A list of changes made to documents in the database, in the order they were made.
   * It returns an object with the method cancel(), which you call if you don’t want to listen to new changes anymore.
   *
   * It is an event emitter and will emit a 'change' event on each document change,
   * a 'complete' event when all the changes have been processed, and an 'error' event when an error occurs.
   * Calling cancel() will unsubscribe all event listeners automatically.
   */
  changes<Model>(options?: ChangesOptions): Changes<Content & Model>;

  /** Close the database */
  close(callback: Callback<any>): void;

  /** Close the database */
  close(): Promise<void>;

  /**
   * Attaches a binary object to a document.
   * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
   * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
   */
  putAttachment(docId: DocumentId,
                attachmentId: AttachmentId,
                rev: RevisionId,
                attachment: AttachmentData,
                type: string,
                callback: Callback<Response>): void;

  /**
   * Attaches a binary object to a document.
   * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
   * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
   */
  putAttachment(docId: DocumentId,
                attachmentId: AttachmentId,
                rev: RevisionId,
                attachment: AttachmentData,
                type: string): Promise<Response>;

  /**
   * Attaches a binary object to a document.
   * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
   * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
   */
  putAttachment(docId: DocumentId,
                attachmentId: AttachmentId,
                attachment: AttachmentData,
                type: string,
                callback: Callback<Response>): void;

  /**
   * Attaches a binary object to a document.
   * This method will update an existing document to add the attachment, so it requires a rev if the document already exists.
   * If the document doesn’t already exist, then this method will create an empty document containing the attachment.
   */
  putAttachment(docId: DocumentId,
                attachmentId: AttachmentId,
                attachment: AttachmentData,
                type: string): Promise<Response>;

  /** Get attachment data */
  getAttachment(docId: DocumentId,
                attachmentId: AttachmentId,
                options: { rev?: RevisionId | undefined },
                callback: Callback<Blob | Buffer>): void;

  /** Get attachment data */
  getAttachment(docId: DocumentId,
                attachmentId: AttachmentId,
                options?: { rev?: RevisionId | undefined }): Promise<Blob | Buffer>;

  /** Get attachment data */
  getAttachment(docId: DocumentId,
                attachmentId: AttachmentId,
                callback: Callback<Blob | Buffer>): void;

  /** Delete an attachment from a doc. You must supply the rev of the existing doc. */
  removeAttachment(docId: DocumentId,
                   attachmentId: AttachmentId,
                   rev: RevisionId,
                   callback: Callback<RemoveAttachmentResponse>): void;

  /** Delete an attachment from a doc. You must supply the rev of the existing doc. */
  removeAttachment(docId: DocumentId,
                   attachmentId: AttachmentId,
                   rev: RevisionId): Promise<RemoveAttachmentResponse>;

  /** Given a set of document/revision IDs, returns the document bodies (and, optionally, attachment data) for each ID/revision pair specified. */
  bulkGet<Model>(options: BulkGetOptions,
                 callback: Callback<BulkGetResponse<Content & Model>>): void;

  /** Given a set of document/revision IDs, returns the document bodies (and, optionally, attachment data) for each ID/revision pair specified. */
  bulkGet<Model>(options: BulkGetOptions): Promise<BulkGetResponse<Content & Model>>;

  /** Given a set of document/revision IDs, returns the subset of those that do not correspond to revisions stored in the database */
  revsDiff(diff: RevisionDiffOptions,
           callback: Callback<RevisionDiffResponse>): void;

  /** Given a set of document/revision IDs, returns the subset of those that do not correspond to revisions stored in the database */
  revsDiff(diff: RevisionDiffOptions): Promise<RevisionDiffResponse>;
}
