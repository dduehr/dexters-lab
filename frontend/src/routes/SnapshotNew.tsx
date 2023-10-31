import { Form, Link, useNavigate } from "react-router-dom";

export default function SnapshotNew() {
    const navigate = useNavigate();

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/projects">Projects</Link></li>
                            <li className="breadcrumb-item"><a href="#">Cup Noodle USB Warmer</a></li>
                            <li className="breadcrumb-item"><a href="#">main</a></li>
                            <li className="breadcrumb-item active" aria-current="page">New Snapshot</li>
                        </ol>
                    </nav>
                </div>
                <div className="card-body">
                    <Form method="post">
                        <div className="mb-3">
                            <label htmlFor="data" className="form-label">Data</label>
                            <textarea className="form-control" name="data" rows={3}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <textarea className="form-control" name="comment" rows={3}></textarea>
                        </div>
                        <nav className="navbar-collapse">
                            <button className="btn btn-primary me-2" type="submit" aria-disabled="true">Save</button>
                            <button className="btn btn-secondary" onClick={() => navigate(-1)} aria-disabled="true">Cancel</button>
                        </nav>
                    </Form>
                </div>
            </div>
        </div>
    );
}