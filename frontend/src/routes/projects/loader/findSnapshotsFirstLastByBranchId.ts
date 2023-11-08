import { LoaderFunctionArgs } from "react-router-dom";
import { Guid } from "guid-typescript";
import { Snapshot } from "../../../generated/openapi/projects";
import { getApi } from "../../../services/backend";

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response | [Snapshot, Snapshot]> => {
    const { branchId } = params

    if (!Guid.isGuid(branchId)) {
        throw new Error(`"${branchId} is not a valid UUID`);
    }

    const firstSnapshotResponse = await getApi().findFirstSnapshotByBranchId(branchId as string)
    const lastSnapshotResponse = await getApi().findLastSnapshotByBranchId(branchId as string)

    return [firstSnapshotResponse.data, lastSnapshotResponse.data];
}

export default loader;