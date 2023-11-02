import { Form, useNavigate } from "react-router-dom";

export default function ProjectNew() {
    const navigate = useNavigate();

    return (
        <>
            <Form method="post">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="input" className="form-control" name="name" />
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