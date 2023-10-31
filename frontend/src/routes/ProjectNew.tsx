import { Form, Link, useNavigate } from "react-router-dom";

export default function ProjectNew() {
    const navigate = useNavigate();

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/projects">Projects</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">New Project</li>
                        </ol>
                    </nav>
                </div>
                <div className="card-body">
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
                </div>
            </div>
        </div>
    );
}