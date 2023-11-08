import githubIcon from '../../assets/github-icon.png'
import swaggerIcon from '../../assets/swagger-icon.png'

export default function TopNavigationBar() {
    return (
        <nav id="top-navigation" className="navbar navbar-expand-lg">
            <div className="container-fluid py-n4">
                <div>
                    <a className="navbar-brand fw-bold"
                        href="https://www.youtube.com/channel/UCX9EuLuarfDjJRYt9l0Bbjg"
                        target="_blank">
                        <span className="ff-baby-kruffy pe-1">DEXTER'S</span> <span className="ff-data-70">LABORATORY</span>
                    </a>
                </div>
                <div className="logos">
                    <a className="navbar-brand"
                        href="https://github.com/z0lgl428/dexters-lab"
                        target="_blank">
                        <img src={githubIcon} />
                    </a>
                    <a className="navbar-brand"
                        href={`${import.meta.env.VITE_API_ENDPOINT}/swagger-ui.html`}
                        target="_blank">
                        <img src={swaggerIcon} />
                    </a>
                </div>
            </div>
        </nav>
    )
}