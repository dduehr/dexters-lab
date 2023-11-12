import { Link, useLoaderData, useParams } from "react-router-dom";
import { Snapshot } from "../../generated/openapi/projects";

export default function SnapshotDetails() {
    const { projectId, branchId } = useParams()
    const snapshot = useLoaderData() as Snapshot

    return (
        <>
            <h3>{!snapshot.parentId && 'Initial '}Snapshot</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Identifier</label>
                    <input type="text" className="form-control" id="name" readOnly value={snapshot.id} />
                </div>
                <div className="mb-3">
                    <label htmlFor="data" className="form-label">Data</label>
                    <textarea className="form-control" id="data" rows={3} readOnly value={snapshot.data} />
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea className="form-control" id="comment" rows={3} readOnly value={snapshot.comment || undefined} />
                </div>
                <div className="mb-3">
                    <label htmlFor="created-by" className="form-label">Author</label>
                    <input type="text" className="form-control" id="created-by" readOnly value={snapshot.createdBy} />
                </div>
                <div className="mb-4">
                    <label htmlFor="created-at" className="form-label">Created</label>
                    <input type="text" className="form-control" id="created-at" readOnly value={snapshot.createdAt} />
                </div>
                {snapshot.parentId && (
                    <div className="card p-3">
                        <h5>Parent</h5>
                        <div className="mb-3">
                            <label htmlFor="parent" className="form-label">Identifier</label>
                            <Link className="page-link" to={`/projects/${projectId}/branches/${branchId}/snapshots/${snapshot.parentId}`}>
                                <input type="text" className="form-control" role="button" id="parent" readOnly value={snapshot.parentId} />
                            </Link>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
}