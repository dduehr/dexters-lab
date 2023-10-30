import { Link, useLoaderData, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Project } from "../generated-sources/ProjectsApi";
import { toInt } from "../utils/parser";

export default function Projects() {
    const { pageNr } = useParams();
    const pageCount = 3;  // ToDo read page count from response header in loader function
    const projects = useLoaderData() as Project[]

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item active" aria-current="page">Projects</li>
                        </ol>
                    </nav>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td><Link to={`/projects/${project.id}`}>{project.name}</Link></td>
                                    <td>{project.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav className="navbar">
                        <div className="container-fluid">
                            <Link className="btn btn-primary" role="button" aria-disabled="true" to="/projects/new">New Project</Link>
                            <Pagination basePath="/projects/page" pageNr={toInt(pageNr)} pageCount={pageCount} />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}