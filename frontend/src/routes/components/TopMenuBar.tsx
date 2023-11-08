import classNames from "classnames";
import { useLocation } from "react-router-dom"

export default function TopMenuBar() {
    const { pathname } = useLocation();

    return (
        <nav id="top-menu" className="navbar navbar-expand-lg navbar-light shadow mb-5">
            <div className="container-fluid justify-content-center">
                <ul className="navbar-nav flex-nowrap">
                    <li className="nav-item">
                        <a className={classNames('nav-link', {'active': pathname === '/'})} href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className={classNames('nav-link', {'active': pathname.startsWith('/projects')})} href="/projects">Projects</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}