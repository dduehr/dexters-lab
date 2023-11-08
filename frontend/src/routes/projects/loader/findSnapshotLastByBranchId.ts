import { LoaderFunctionArgs } from "react-router-dom";
import { Guid } from "guid-typescript";
import { Snapshot } from "../../../generated/openapi/projects";
import { getApi } from "../../../services/backend";

const loader = async ({ params }: LoaderFunctionArgs): Promise<Response | Snapshot> => {
    const { branchId } = params

    if (!Guid.isGuid(branchId)) {
        throw new Error(`"${branchId} is not a valid UUID`);
    }

    const response = await getApi().findLastSnapshotByBranchId(branchId as string)

    return response.data
}

export default loader;