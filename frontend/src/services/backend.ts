import { Configuration, DefaultApi } from '../generated/openapi/projects';

export function getApi(): DefaultApi {
    return new DefaultApi(
        new Configuration({
            basePath: import.meta.env.VITE_API_ENDPOINT
        }));
}