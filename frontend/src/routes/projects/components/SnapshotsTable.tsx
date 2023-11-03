import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { LinkContainer } from "react-router-bootstrap";
import { getApi } from "../../../services/backend";
import usePageFetcher from "../../../hooks/usePageFetcher";

type SnapshotsTableProps = {
    projectId: string,
    branchId: string
}

export default function SnapshotsTable({ projectId, branchId }: SnapshotsTableProps) {
    const { page } = usePageFetcher(() => getApi().findSnapshotsByBranchId(branchId as string, 0, 10))

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
                    {page?.data?.map(s => (
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
                    <Pagination basePath={`/projects/${projectId}/branches/${branchId}/snapshots/pages`} pageNr={page?.nr || 0} pageCount={page?.count || 1} />
                </div>
            </nav>
        </>
    );
}