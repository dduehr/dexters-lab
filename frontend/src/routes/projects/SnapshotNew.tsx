import { Form, useNavigate } from "react-router-dom";

export default function SnapshotNew() {
    const navigate = useNavigate();

    return (
        <>
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
        </>
    );
}