import { Configuration, DefaultApi } from '../generated/openapi/projects';
import config from '../../configuration.json'

export function getApi(): DefaultApi {
    return new DefaultApi(
        new Configuration({
            basePath: config.backendUrl 
        }));
}