import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Profiling {
    transport: Transport;
    constructor(transport: Transport);
    /**
      * Returns basic information about the status of Universal Profiling.
      * @see {@link https://www.elastic.co/guide/en/observability/8.19/universal-profiling.html | Elasticsearch API documentation}
      */
    flamegraph(this: That, params: T.ProfilingFlamegraphRequest | TB.ProfilingFlamegraphRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ProfilingFlamegraphResponse>;
    flamegraph(this: That, params: T.ProfilingFlamegraphRequest | TB.ProfilingFlamegraphRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ProfilingFlamegraphResponse, unknown>>;
    flamegraph(this: That, params: T.ProfilingFlamegraphRequest | TB.ProfilingFlamegraphRequest, options?: TransportRequestOptions): Promise<T.ProfilingFlamegraphResponse>;
    /**
      * Extracts raw stacktrace information from Universal Profiling.
      * @see {@link https://www.elastic.co/guide/en/observability/8.19/universal-profiling.html | Elasticsearch API documentation}
      */
    stacktraces(this: That, params: T.ProfilingStacktracesRequest | TB.ProfilingStacktracesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ProfilingStacktracesResponse>;
    stacktraces(this: That, params: T.ProfilingStacktracesRequest | TB.ProfilingStacktracesRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ProfilingStacktracesResponse, unknown>>;
    stacktraces(this: That, params: T.ProfilingStacktracesRequest | TB.ProfilingStacktracesRequest, options?: TransportRequestOptions): Promise<T.ProfilingStacktracesResponse>;
    /**
      * Returns basic information about the status of Universal Profiling.
      * @see {@link https://www.elastic.co/guide/en/observability/8.19/universal-profiling.html | Elasticsearch API documentation}
      */
    status(this: That, params?: T.ProfilingStatusRequest | TB.ProfilingStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ProfilingStatusResponse>;
    status(this: That, params?: T.ProfilingStatusRequest | TB.ProfilingStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ProfilingStatusResponse, unknown>>;
    status(this: That, params?: T.ProfilingStatusRequest | TB.ProfilingStatusRequest, options?: TransportRequestOptions): Promise<T.ProfilingStatusResponse>;
    /**
      * Extracts a list of topN functions from Universal Profiling.
      * @see {@link https://www.elastic.co/guide/en/observability/8.19/universal-profiling.html | Elasticsearch API documentation}
      */
    topnFunctions(this: That, params: T.ProfilingTopnFunctionsRequest | TB.ProfilingTopnFunctionsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ProfilingTopnFunctionsResponse>;
    topnFunctions(this: That, params: T.ProfilingTopnFunctionsRequest | TB.ProfilingTopnFunctionsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ProfilingTopnFunctionsResponse, unknown>>;
    topnFunctions(this: That, params: T.ProfilingTopnFunctionsRequest | TB.ProfilingTopnFunctionsRequest, options?: TransportRequestOptions): Promise<T.ProfilingTopnFunctionsResponse>;
}
export {};
