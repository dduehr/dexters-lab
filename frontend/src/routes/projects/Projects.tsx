import { Link, useLoaderData } from "react-router-dom";
import Pagination from "./components/Pagination";
import { Project } from "../../generated/openapi/projects";
import { Page } from "../../types/page";

export default function Projects() {
    const page = useLoaderData() as Page<Project[]>

    // TODO: if page.nr == 0 && page.data.length == 0 redirect to "/projects/new"

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {page.data.map((project) => (
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
                    <Pagination basePath="/projects/pages" pageNr={page.nr} pageCount={page.count} />
                </div>
            </nav>
        </>
    );
}