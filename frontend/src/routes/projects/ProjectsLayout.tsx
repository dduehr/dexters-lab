import { Outlet } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";

export default function ProjectsLayout() {
    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <Breadcrumbs />
                </div>
                <div className="card-body">
                    <Outlet />
                </div>
            </div>
        </div >
    );
}