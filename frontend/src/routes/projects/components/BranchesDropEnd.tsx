import { Link } from "react-router-dom";
import { getApi } from "../../../services/backend";
import useFetcher from "../../../hooks/useFetcher";
import ProjectDetailsSnapshots from "./SnapshotsTable";

type BranchesDropEndProps = {
    projectId: string,
    branchId: string
}

export default function BranchesDropEnd({ projectId, branchId }: BranchesDropEndProps) {
    const { data: branches } = useFetcher(() => getApi().findBranchesByProjectId(projectId, 0, 100))

    const branch = branches?.find(b => b.id === branchId)
    const defaultBadge = <span className="badge text-bg-light">default</span>;

    // TODO: Error if not found (valid/existing id?)

    return (
        <>
            {branch && (
                <div className="btn-group dropend">
                    <Link type="button" className="btn btn-secondary" to={`/projects/${projectId}/branches/${branch.id}`}>
                        {branch.name} {branch.default_branch && defaultBadge}
                    </Link>
                    <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        {branches?.map(b => (
                            <li key={b.id}>
                                <Link className="dropdown-item" to={`/projects/${projectId}/branches/${b.id}/snapshots`}>
                                    {b.name} {b.default_branch && defaultBadge}
                                </Link>
                            </li>))
                        }
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to={`/projects/${projectId}/branches/new`}>New Branch</Link></li>
                    </ul>
                </div>)
            }
        </>
    );
}