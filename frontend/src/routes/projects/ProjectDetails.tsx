import { useParams, useRouteLoaderData } from "react-router-dom";
import { Project } from "../../generated/openapi/projects";
import BranchesDropEnd from "./components/BranchesDropEnd";
import SnapshotsTable from "./components/SnapshotsTable";
import { toInt } from "../../utils/parser";

export default function ProjectDetails() {
    const { projectId, branchId, pageNr } = useParams();
    const { name, comment } = useRouteLoaderData("project") as Project

    return (
        <>
            <h3>{name}</h3>
            <div className="mb-3">{comment}</div>
            {projectId && branchId && (<>
                <BranchesDropEnd projectId={projectId} branchId={branchId} />
                <SnapshotsTable projectId={projectId} branchId={branchId} pageNr={toInt(pageNr)}/>
            </>)}
        </>
    );
}