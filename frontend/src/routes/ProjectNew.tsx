import { Link } from "react-router-dom";

export default function ProjectNew() {
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
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="input" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <textarea className="form-control" id="comment" rows={3}></textarea>
                        </div>
                        <nav className="navbar-collapse">
                            <a className="btn btn-primary me-2" role="submit" aria-disabled="true">Save</a>
                            <Link className="btn btn-secondary" role="cancel" aria-disabled="true" to="/projects">Cancel</Link>
                        </nav>
                    </form>
                </div>
            </div>
        </div>
    );
}