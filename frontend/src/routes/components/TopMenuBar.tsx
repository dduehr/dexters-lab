export default function TopMenuBar() {
    return (
        <nav id="top-menu" className="navbar navbar-expand-lg navbar-light shadow mb-5">
            <div className="container-fluid justify-content-center">
                <ul className="navbar-nav flex-nowrap">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/projects">Projects</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}