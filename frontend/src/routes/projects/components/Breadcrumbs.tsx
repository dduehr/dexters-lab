import { Link, useMatches } from "react-router-dom";
import { init } from "../../../utils/array";

export type Breadcrumb = (data: unknown) => string

export default function Breadcrumbs() {
    const matches = useMatches()

    const [crumbs, current] = init(matches
        .filter(match => match.handle)
        .map(match => {
            const crumb = match.handle as Breadcrumb
            return { pathname: match.pathname, text: crumb(match.data) }
        }))

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
                {crumbs.map((crumb, index) => (
                    <li key={index} className="breadcrumb-item"><Link to={crumb.pathname}>{crumb.text}</Link></li>
                ))}
                {current && <li className="breadcrumb-item active" aria-current="page">{current.text}</li>}
            </ol>
        </nav>
    )
}