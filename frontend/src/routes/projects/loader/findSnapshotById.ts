import { LoaderFunctionArgs } from 'react-router-dom';
import { Guid } from 'guid-typescript';
import { getApi } from '../../../services/backend.ts';
import { Snapshot } from '../../../generated-sources/ProjectsApi/api.ts';

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response|Snapshot> => {
    const { snapshotId } = params;

    if (!Guid.isGuid(snapshotId)) {
        throw new Error(`"${snapshotId}" is not a valid UUID`);
    }   

    const response = await getApi().findSnapshotById(snapshotId as string);

    // TODO: falls nicht gefunden, redirect nach snapshots

    return response.data;
}

export default loader;