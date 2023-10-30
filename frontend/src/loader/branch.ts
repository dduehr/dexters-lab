import { LoaderFunctionArgs } from 'react-router-dom';
import { getApi } from '../services/backend.ts';
import { Branch } from '../generated-sources/ProjectsApi/api.ts';
import { Guid } from 'guid-typescript';

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response|Branch> => {
    const { branchId } = params;

    if (!Guid.isGuid(branchId)) {
        throw new Error(`"${branchId} is not a valid UUID`);
    }   

    const response = await getApi().findBranchById(branchId as string);

    return response.data;
}

export default loader;