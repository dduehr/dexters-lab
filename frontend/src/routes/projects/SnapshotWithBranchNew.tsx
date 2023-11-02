import { Form, useNavigate } from "react-router-dom";

export default function SnapshotWithBranchNew() {
    const navigate = useNavigate()

    return (
        <>
            <Form method="post">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Branch Name</label>
                    <input type="input" className="form-control" name="branchName" aria-describedby="branchHelp" />
                    <div id="branchHelp" className="form-text">This will be the default branch</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="project" className="form-label">Initial Data</label>
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