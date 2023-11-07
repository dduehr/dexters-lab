import { Configuration, DefaultApi } from '../generated/openapi/projects';

export function getApi(): DefaultApi {
    const baseUrl = 'http://localhost:8099';

    return new DefaultApi(
        new Configuration({
            basePath: baseUrl 
        }));
}