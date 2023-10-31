import { Link, useLoaderData, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Snapshot } from "../generated-sources/ProjectsApi";
import { LinkContainer } from "react-router-bootstrap";

export default function ProjectDetailsSnapshots() {
    const { projectId, branchId } = useParams();
    const snapshots = useLoaderData() as Snapshot[];

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Comment</th>
                        <th scope="col">Author</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {snapshots.map(s => (
                        <LinkContainer key={s.id} to={`/projects/${projectId}/branches/${branchId}/snapshots/${s.id}`}>
                            <tr key={s.id} role="button">
                                <td>{s.comment}</td>
                                <td>{s.createdBy}</td>
                                <td>{s.createdAt}</td>
                            </tr>
                        </LinkContainer>))
                    }
                </tbody>
            </table>
            <nav className="navbar">
                <div className="container-fluid">
                    <Link className="btn btn-primary" role="button" aria-disabled="true" to={`/projects/${projectId}/branches/${branchId}/snapshots/new`}>New Snapshot</Link>
                    <Pagination basePath={`/projects/${projectId}/branches/${branchId}/snapshots/pages`} pageNr={1} pageCount={3} />
                </div>
            </nav>
        </>
    );
}