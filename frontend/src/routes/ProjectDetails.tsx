import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { Project } from "../generated-sources/ProjectsApi";

export default function ProjectDetails() {
    const { projectId, branchId } = useParams();
    const project = useLoaderData() as Project;

    {/* If this component was requested with the short URL "/projects/:projectId", i.e. without
        brach specification, then the loader (^App.redirectToDefaultBranch(projectLoader, args))
        tries to determine the branchId of the project default branch and in case of success 
        redirects to "/project/:projectId/branches/:branchId". */}

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/projects">Projects</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Project Details</li>
                        </ol>
                    </nav>
                </div>
                <div className="card-body">
                    <h3>{project.name}</h3>
                    {project.comment && <div className="mb-3">{project.comment}</div> }
                    {branchId ? (

                        /* If the URL contained a branchId parameter, then include the
                           <ProjectDetailsBranches /> component provided and initialized
                           by the router (^App.branchesLoader) */

                        <Outlet />) : (

                        /* Otherwise the project does not have a branch yet */

                        <Link className="btn btn-primary" role="button" aria-disabled="true" to={`/projects/${projectId}/branches/new`}>
                            New Branch
                        </Link>)
                    }
                </div>
            </div>
        </div>
    );
}