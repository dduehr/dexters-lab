import { Configuration, DefaultApi } from '../generated-sources/ProjectsApi';

export function getApi(): DefaultApi {
    const baseUrl = 'http://localhost:8090';

    return new DefaultApi(
        new Configuration({
            basePath: baseUrl 
        }));
}