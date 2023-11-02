import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import { Project } from "../../generated-sources/ProjectsApi";
import BranchesDropEnd from "./components/BranchesDropEnd";
import SnapshotsTable from "./components/SnapshotsTable";

export default function ProjectDetails() {
    const { projectId, branchId } = useParams();
    const { name, comment } = useRouteLoaderData("project") as Project

    return (
        <>
            <h3>{name}</h3>
            <div className="mb-3">{comment}</div>
            {projectId && branchId && (<>
                <BranchesDropEnd projectId={projectId} branchId={branchId} />
                <SnapshotsTable projectId={projectId} branchId={branchId} />
            </>)}
        </>
    );
}