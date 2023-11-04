import swagger from '../../assets/swagger.svg'

export default function TopNavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg top-navigation">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold"
                    href="https://www.youtube.com/channel/UCX9EuLuarfDjJRYt9l0Bbjg"
                    target="_blank">
                    Dexter's Laboratory
                </a>
                <a className="navbar-brand"
                    href="http://localhost:8099/swagger-ui.html"
                    target="_blank">
                    <img src={swagger} height="32" />
                </a>
            </div>
        </nav>
    )
}