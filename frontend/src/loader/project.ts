import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { getApi } from '../services/backend.ts';
import { Project } from '../generated-sources/ProjectsApi/api.ts';
import { Guid } from 'guid-typescript';

type ProjectLoader = (args: LoaderFunctionArgs) => Promise<Response|Project>;

export const loader: ProjectLoader = async ({ params }: LoaderFunctionArgs): Promise<Response|Project> => {
    const { projectId } = params;

    if (!Guid.isGuid(projectId)) {
        throw new Error(`"${projectId} is not a valid UUID`);
    }
    
    const response = await getApi().findProjectById(projectId as string);
    
    return response.data;
}

export const redirectToDefaultBranch = async (delegate: ProjectLoader, args: LoaderFunctionArgs): Promise<Response|Project> => {
    const { projectId, branchId } = args.params;

    return delegate(args).then(result  => {
        if (!branchId && isProject(result) && result.defaultBranch) {
            return redirect(`/projects/${projectId}/branches/${result.defaultBranch.id}/snapshots`);
        }
        return result;
    });
}

function isProject(value: Response|Project): value is Project {
    return (value as Project).id !== undefined;
}

export default loader;
