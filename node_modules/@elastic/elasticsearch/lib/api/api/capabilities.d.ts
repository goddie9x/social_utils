import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
/**
  * Checks if the specified combination of method, API, parameters, and arbitrary capabilities are supported.
  * @see {@link https://github.com/elastic/elasticsearch/blob/8.19/rest-api-spec/src/yamlRestTest/resources/rest-api-spec/test/README.asciidoc#require-or-skip-api-capabilities | Elasticsearch API documentation}
  */
export default function CapabilitiesApi(this: That, params?: T.CapabilitiesRequest | TB.CapabilitiesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CapabilitiesResponse>;
export default function CapabilitiesApi(this: That, params?: T.CapabilitiesRequest | TB.CapabilitiesRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.CapabilitiesResponse, unknown>>;
export default function CapabilitiesApi(this: That, params?: T.CapabilitiesRequest | TB.CapabilitiesRequest, options?: TransportRequestOptions): Promise<T.CapabilitiesResponse>;
export {};
