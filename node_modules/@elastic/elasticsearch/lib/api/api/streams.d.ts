import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Streams {
    transport: Transport;
    constructor(transport: Transport);
    /**
      * Disable logs stream. Turn off the logs stream feature for this cluster.
      * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch#TODO | Elasticsearch API documentation}
      */
    logsDisable(this: That, params?: T.StreamsLogsDisableRequest | TB.StreamsLogsDisableRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.StreamsLogsDisableResponse>;
    logsDisable(this: That, params?: T.StreamsLogsDisableRequest | TB.StreamsLogsDisableRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.StreamsLogsDisableResponse, unknown>>;
    logsDisable(this: That, params?: T.StreamsLogsDisableRequest | TB.StreamsLogsDisableRequest, options?: TransportRequestOptions): Promise<T.StreamsLogsDisableResponse>;
    /**
      * Enable logs stream. Turn on the logs stream feature for this cluster. NOTE: To protect existing data, this feature can be turned on only if the cluster does not have existing indices or data streams that match the pattern `logs|logs.*`. If those indices or data streams exist, a `409 - Conflict` response and error is returned.
      * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch#TODO | Elasticsearch API documentation}
      */
    logsEnable(this: That, params?: T.StreamsLogsEnableRequest | TB.StreamsLogsEnableRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.StreamsLogsEnableResponse>;
    logsEnable(this: That, params?: T.StreamsLogsEnableRequest | TB.StreamsLogsEnableRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.StreamsLogsEnableResponse, unknown>>;
    logsEnable(this: That, params?: T.StreamsLogsEnableRequest | TB.StreamsLogsEnableRequest, options?: TransportRequestOptions): Promise<T.StreamsLogsEnableResponse>;
    /**
      * Get the status of streams. Get the current status for all types of streams.
      * @see {@link https://www.elastic.co/docs/api/doc/elasticsearch#TODO | Elasticsearch API documentation}
      */
    status(this: That, params?: T.StreamsStatusRequest | TB.StreamsStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.StreamsStatusResponse>;
    status(this: That, params?: T.StreamsStatusRequest | TB.StreamsStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.StreamsStatusResponse, unknown>>;
    status(this: That, params?: T.StreamsStatusRequest | TB.StreamsStatusRequest, options?: TransportRequestOptions): Promise<T.StreamsStatusResponse>;
}
export {};
