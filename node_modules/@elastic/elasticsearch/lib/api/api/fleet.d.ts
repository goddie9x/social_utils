import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Fleet {
    transport: Transport;
    constructor(transport: Transport);
    /**
      * Deletes a secret stored by Fleet.
      */
    deleteSecret(this: That, params: T.FleetDeleteSecretRequest | TB.FleetDeleteSecretRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetDeleteSecretResponse>;
    deleteSecret(this: That, params: T.FleetDeleteSecretRequest | TB.FleetDeleteSecretRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetDeleteSecretResponse, unknown>>;
    deleteSecret(this: That, params: T.FleetDeleteSecretRequest | TB.FleetDeleteSecretRequest, options?: TransportRequestOptions): Promise<T.FleetDeleteSecretResponse>;
    /**
      * Retrieves a secret stored by Fleet.
      */
    getSecret(this: That, params: T.FleetGetSecretRequest | TB.FleetGetSecretRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetGetSecretResponse>;
    getSecret(this: That, params: T.FleetGetSecretRequest | TB.FleetGetSecretRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetGetSecretResponse, unknown>>;
    getSecret(this: That, params: T.FleetGetSecretRequest | TB.FleetGetSecretRequest, options?: TransportRequestOptions): Promise<T.FleetGetSecretResponse>;
    /**
      * Get global checkpoints. Get the current global checkpoints for an index. This API is designed for internal use by the Fleet server project.
      * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/8.19/get-global-checkpoints.html | Elasticsearch API documentation}
      */
    globalCheckpoints(this: That, params: T.FleetGlobalCheckpointsRequest | TB.FleetGlobalCheckpointsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetGlobalCheckpointsResponse>;
    globalCheckpoints(this: That, params: T.FleetGlobalCheckpointsRequest | TB.FleetGlobalCheckpointsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetGlobalCheckpointsResponse, unknown>>;
    globalCheckpoints(this: That, params: T.FleetGlobalCheckpointsRequest | TB.FleetGlobalCheckpointsRequest, options?: TransportRequestOptions): Promise<T.FleetGlobalCheckpointsResponse>;
    /**
      * Executes several fleet searches with a single API request. The API follows the same structure as the multi search (`_msearch`) API. However, similar to the fleet search API, it supports the `wait_for_checkpoints` parameter.
      * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/8.19/fleet-multi-search.html | Elasticsearch API documentation}
      */
    msearch<TDocument = unknown>(this: That, params: T.FleetMsearchRequest | TB.FleetMsearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetMsearchResponse<TDocument>>;
    msearch<TDocument = unknown>(this: That, params: T.FleetMsearchRequest | TB.FleetMsearchRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetMsearchResponse<TDocument>, unknown>>;
    msearch<TDocument = unknown>(this: That, params: T.FleetMsearchRequest | TB.FleetMsearchRequest, options?: TransportRequestOptions): Promise<T.FleetMsearchResponse<TDocument>>;
    /**
      * Creates a secret stored by Fleet.
      */
    postSecret(this: That, params: T.FleetPostSecretRequest | TB.FleetPostSecretRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetPostSecretResponse>;
    postSecret(this: That, params: T.FleetPostSecretRequest | TB.FleetPostSecretRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetPostSecretResponse, unknown>>;
    postSecret(this: That, params: T.FleetPostSecretRequest | TB.FleetPostSecretRequest, options?: TransportRequestOptions): Promise<T.FleetPostSecretResponse>;
    /**
      * The purpose of the fleet search api is to provide a search api where the search will only be executed after provided checkpoint has been processed and is visible for searches inside of Elasticsearch.
      * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/8.19/fleet-search.html | Elasticsearch API documentation}
      */
    search<TDocument = unknown>(this: That, params: T.FleetSearchRequest | TB.FleetSearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetSearchResponse<TDocument>>;
    search<TDocument = unknown>(this: That, params: T.FleetSearchRequest | TB.FleetSearchRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetSearchResponse<TDocument>, unknown>>;
    search<TDocument = unknown>(this: That, params: T.FleetSearchRequest | TB.FleetSearchRequest, options?: TransportRequestOptions): Promise<T.FleetSearchResponse<TDocument>>;
}
export {};
