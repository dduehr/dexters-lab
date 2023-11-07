import { LoaderFunctionArgs } from 'react-router-dom';
import { Guid } from 'guid-typescript';
import { getApi } from '../../../services/backend.ts';
import { Project } from '../../../generated/openapi/projects/api.ts';

export type ProjectLoader = (args: LoaderFunctionArgs) => Promise<Response|Project>;

const loader: ProjectLoader = async ({ params }: LoaderFunctionArgs): Promise<Response|Project> => {
    const { projectId } = params;

    if (!Guid.isGuid(projectId)) {
        throw new Error(`"${projectId} is not a valid UUID`);
    }
    
    const response = await getApi().findProjectById(projectId as string);

    // TODO: Falls nicht gefunden => Error
    
    return response.data;
}

export default loader
