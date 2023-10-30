import { Link, useLoaderData } from "react-router-dom";
import { Project } from "../generated-sources/ProjectsApi";

export default function SnapshotWithBranchNew() {
    const project = useLoaderData() as Project;

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/projects">Projects</Link></li>
                            <li className="breadcrumb-item"><a href={`/projects/${project.id}`}>{project.name}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">New Branch</li>
                        </ol>
                    </nav>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Branch Name</label>
                            <input type="input" className="form-control" id="name" aria-describedby="branchHelp" />
                                <div id="branchHelp" className="form-text">This will be the default branch</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="project" className="form-label">Initial Data</label>
                            <textarea className="form-control" id="project" rows={3}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <textarea className="form-control" id="comment" rows={3}></textarea>
                        </div>
                        <nav className="navbar-collapse">
                            <a className="btn btn-primary me-2" role="submit" aria-disabled="true">Save</a>
                            <a className="btn btn-secondary" role="cancel" aria-disabled="true">Cancel</a>
                        </nav>
                    </form>
                </div>
            </div>
        </div>
    );
}