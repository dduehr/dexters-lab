import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { LinkContainer } from "react-router-bootstrap";
import { getApi } from "../../../services/backend";
import useFetcher from "../../../hooks/useFetcher";

type SnapshotsTableProps = {
    projectId: string,
    branchId: string
}

export default function SnapshotsTable({ projectId, branchId }: SnapshotsTableProps) {
    const { data: snapshots } = useFetcher(() => getApi().findSnapshotsByBranchId(branchId as string, 0, 20))

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
                    {snapshots?.map(s => (
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