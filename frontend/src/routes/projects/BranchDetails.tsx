import { Link, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import { Branch, Snapshot } from "../../generated/openapi/projects";

export default function BranchDetails() {
    const { projectId, branchId } = useParams()
    const { name: branchName } = useRouteLoaderData("branch") as Branch
    const [firstSnapshot, lastSnapshot] = useLoaderData() as [Snapshot, Snapshot]

    return (
        <>
            <h3>Branch {branchName}</h3>
            <form>
                <div id="initialSnapshotAccordion" className="accordion">
                    <div className="accordion-item">
                        <div className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInitialSnapshot">
                                <h5 className="m-0">Initial Snapshot</h5>
                            </button>
                        </div>
                        <div id="collapseInitialSnapshot" className="accordion-collapse collapse" data-bs-parent="#initialSnapshotAccordion">
                            <div className="accordion-body">
                                <div className="mb-3">
                                    <label htmlFor="first-id" className="form-label">Identifier</label>
                                    <Link className="page-link" to={`/projects/${projectId}/branches/${branchId}/snapshots/${firstSnapshot.id}`}>
                                        <input type="text" className="form-control" role="button" id="first-id" readOnly value={firstSnapshot.id} />
                                    </Link>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="first-created-by" className="form-label">Author</label>
                                    <input type="text" className="form-control" id="first-created-by" readOnly value={firstSnapshot.createdBy} />
                                </div>
                                <div>
                                    <label htmlFor="first-created-at" className="form-label">Created</label>
                                    <input type="text" className="form-control" id="first-created-at" readOnly value={firstSnapshot.createdAt} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-3 my-3">
                    <h5>Latest {!lastSnapshot.parentId && '& Initial '}Snapshot</h5>
                    {lastSnapshot.parentId && (
                        <div className="mb-3">
                            <label htmlFor="last-parent" className="form-label">Parent Identifier</label>
                            <Link className="page-link" to={`/projects/${projectId}/branches/${branchId}/snapshots/${lastSnapshot.parentId}`}>
                                <input type="text" className="form-control" role="button" id="last-parent" readOnly value={lastSnapshot.parentId} />
                            </Link>
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="last-id" className="form-label">Identifier</label>
                        <Link className="page-link" to={`/projects/${projectId}/branches/${branchId}/snapshots/${lastSnapshot.id}`}>
                            <input type="text" className="form-control" role="button" id="last-id" readOnly value={lastSnapshot.id} />
                        </Link>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last-data" className="form-label">Data</label>
                        <textarea className="form-control" id="last-data" rows={3} readOnly value={lastSnapshot.data} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last-comment" className="form-label">Comment</label>
                        <textarea className="form-control" id="last-comnment" rows={3} readOnly value={lastSnapshot.comment} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last-created-by" className="form-label">Author</label>
                        <input type="text" className="form-control" id="last-created-by" readOnly value={lastSnapshot.createdBy} />
                    </div>
                    <div>
                        <label htmlFor="last-created-at" className="form-label">Created</label>
                        <input type="text" className="form-control" id="last-created-at" readOnly value={lastSnapshot.createdAt} />
                    </div>
                </div>
            </form>

            <nav className="navbar">
                <div className="container-fluid">
                    <Link className="btn btn-primary" role="button" aria-disabled="true" to={`/projects/${projectId}/branches/${branchId}/snapshots/new`}>New Snapshot</Link>
                </div>
            </nav>
        </>
    );
}