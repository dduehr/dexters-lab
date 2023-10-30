import { LoaderFunctionArgs } from 'react-router-dom';
import { getApi } from '../services/backend.ts';
import { Branch } from '../generated-sources/ProjectsApi/api.ts';
import { Guid } from 'guid-typescript';

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response|Branch[]> => {
    const { projectId } = params;

    if (!Guid.isGuid(projectId)) {
        throw new Error(`"${projectId} is not a valid UUID`);
    }   

    const response = await getApi().findBranchesByProjectId(projectId as string);

    return response.data;
}

export default loader;