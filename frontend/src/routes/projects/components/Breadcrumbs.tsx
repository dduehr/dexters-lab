import { Link } from "react-router-dom";

export default function Breadcrumbs() {
    // TODO: handle + useMatches
    // https://reactrouter.com/en/main/hooks/use-matches
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><Link to="/projects">Lorem</Link></li>
                <li className="breadcrumb-item active" aria-current="page">ipsum</li>
            </ol>
        </nav>
    )
}