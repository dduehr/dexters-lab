import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Branch, Snapshot } from "../../generated/openapi/projects";

export default function BranchDetails() {
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
                                    <label htmlFor="parent" className="form-label">Identifier</label>
                                    <input type="text" className="form-control" id="parent" readOnly value={firstSnapshot.id} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="created-by" className="form-label">Author</label>
                                    <input type="text" className="form-control" id="created-by" readOnly value={firstSnapshot.createdBy} />
                                </div>
                                <div>
                                    <label htmlFor="created-at" className="form-label">Created</label>
                                    <input type="text" className="form-control" id="created-at" readOnly value={firstSnapshot.createdAt} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-3 my-3">
                    <h5>Latest Snapshot</h5>
                    <div className="mb-3">
                        <label htmlFor="parent" className="form-label">Identifier</label>
                        <input type="text" className="form-control" id="parent" readOnly value={lastSnapshot.id} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="data" className="form-label">Data</label>
                        <textarea className="form-control" id="data" rows={3} readOnly value={lastSnapshot.data} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="data" className="form-label">Comment</label>
                        <textarea className="form-control" id="data" rows={3} readOnly value={lastSnapshot.comment} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="created-by" className="form-label">Author</label>
                        <input type="text" className="form-control" id="created-by" readOnly value={lastSnapshot.createdBy} />
                    </div>
                    <div>
                        <label htmlFor="created-at" className="form-label">Created</label>
                        <input type="text" className="form-control" id="created-at" readOnly value={lastSnapshot.createdAt} />
                    </div>
                </div>

            </form>
        </>
    );
}