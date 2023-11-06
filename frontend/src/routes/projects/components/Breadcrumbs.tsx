import { Link, useMatches } from "react-router-dom";
import { init } from "../../../utils/array";

export type Breadcrumb = {
    crumb: (data: unknown) => string
    subPath?: (data: unknown) => string
    active?: (data: unknown) => boolean
}

export default function Breadcrumbs() {
    const matches = useMatches()

    const [crumbs, current] = init(matches
        .filter(match => (match.handle as Breadcrumb | undefined)?.crumb)
        .map(match => {
            const breadcrumb = match.handle as Breadcrumb
            return {
                pathname: match.pathname + (breadcrumb.subPath ? '/' + breadcrumb.subPath(match.data) : ''),
                text: breadcrumb.crumb(match.data),
                active: breadcrumb.active ? breadcrumb.active(match.data) : true
            }
        }))

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
                {crumbs.map((crumb, index) => (
                    <li key={index} className="breadcrumb-item">
                        {crumb.active ? (<Link to={crumb.pathname}>{crumb.text}</Link>) : crumb.text}
                    </li>
                ))}
                {current && <li className="breadcrumb-item active" aria-current="page">
                    {current.text}
                </li>}
            </ol>
        </nav>
    )
}