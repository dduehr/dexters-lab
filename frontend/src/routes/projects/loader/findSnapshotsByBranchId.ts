import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { Guid } from 'guid-typescript';
import { getApi } from '../../../services/backend.ts';
import { Snapshot } from '../../../generated/openapi/projects/api.ts';
import { toInt } from '../../../utils/parser.ts';

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response|Snapshot[]> => {
    const { projectId, branchId, pageNr: paramsPageNr } = params;
    const pageNr = toInt(paramsPageNr);

    if (!Guid.isGuid(branchId)) {
        throw new Error(`"${branchId} is not a valid UUID`);
    }
    
    if (pageNr.toString() !== paramsPageNr) {
        return redirect(`/projects/${projectId}/branches/${branchId}/snapshots/page/0`);
    }

    const response = await getApi().findSnapshotsByBranchId(branchId as string, 0, 20);

    return response.data;
}

export default loader;
