import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { Branch } from "../generated-sources/ProjectsApi";

export default function ProjectDetailsBranches() {
    const { projectId, branchId } = useParams();
    const branches = useLoaderData() as Branch[];

    const branch = branches.find(b => b.id === branchId);
    const defaultBadge = <span className="badge text-bg-light">default</span>;

    return (
        <>
            {branch && (<>
                <div>
                    <div className="btn-group dropend">
                        <Link type="button" className="btn btn-secondary" to={`/projects/${projectId}/branches/${branch.id}`}>
                            {branch.name} {branch.default_branch && defaultBadge}
                        </Link>
                        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            {branches.map(b => (
                                <li key={b.id}>
                                    <Link className="dropdown-item" to={`/projects/${projectId}/branches/${b.id}/snapshots`}>
                                        {b.name} {b.default_branch && defaultBadge}
                                    </Link>
                                </li>))
                            }
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" to={`/projects/${projectId}/branches/new`}>New Branch</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Include the <ProjectDetailsSnapshots /> component provided and initialized 
                    by the router (^App.snapshotsLoader) */}

                <Outlet />
            </>)
            }
        </>
    );
}