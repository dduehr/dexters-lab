import { Link } from "react-router-dom";

export default function BranchDetails() {
    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/projects">Projects</Link></li>
                            <li className="breadcrumb-item"><a href="#">Cup Noodle USB Warmer</a></li>
                            <li className="breadcrumb-item"><a href="#">main</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Branch Details</li>
                        </ol>
                    </nav>
                </div>
                <div className="card-body">
                    <h3>Branch "main"</h3>
                    <form>
                        <div className="card p-3 mb-3">
                            <h5>Latest Snapshot</h5>
                            <div className="mb-3">
                                <label htmlFor="parent" className="form-label">Identifier</label>
                                <input type="text" className="form-control" id="parent" readOnly
                                    value="b48b49e3-1e70-4ce1-b5f2-abee311268f8" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="data" className="form-label">Data</label>
                                <textarea className="form-control" id="data" rows={3} readOnly value="Some data ..." />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="data" className="form-label">Comment</label>
                                <textarea className="form-control" id="data" rows={3} readOnly value="Some comments ..." />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="created-by" className="form-label">Author</label>
                                <input type="text" className="form-control" id="created-by" readOnly value="usera" />
                            </div>
                            <div>
                                <label htmlFor="created-at" className="form-label">Created</label>
                                <input type="text" className="form-control" id="created-at" readOnly
                                    value="02.11.2023 09:47:29" />
                            </div>
                        </div>

                        <div className="card p-3">
                            <h5>Initial Snapshot</h5>
                            <div className="mb-3">
                                <label htmlFor="parent" className="form-label">Identifier</label>
                                <input type="text" className="form-control" id="parent" readOnly
                                    value="b48b49e3-1e70-4ce1-b5f2-abee311268f8" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="created-by" className="form-label">Author</label>
                                <input type="text" className="form-control" id="created-by" readOnly value="usera" />
                            </div>
                            <div>
                                <label htmlFor="created-at" className="form-label">Created</label>
                                <input type="text" className="form-control" id="created-at" readOnly
                                    value="02.11.2023 09:47:29" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}