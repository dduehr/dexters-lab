import swagger from '../../assets/swagger-icon.png'
import config from '../../../configuration.json'

export default function TopNavigationBar() {
    return (
        <nav id="top-navigation" className="navbar navbar-expand-lg">
            <div className="container-fluid py-n4">
                <a className="navbar-brand fw-bold"
                    href="https://www.youtube.com/channel/UCX9EuLuarfDjJRYt9l0Bbjg"
                    target="_blank">
                    <span className="ff-baby-kruffy">DEXTER'S</span> <span className="ff-data-70">Laboratory</span>
                </a>
                <a className="navbar-brand"
                    href={`${config.backendUrl}/swagger-ui.html`}
                    target="_blank">
                    <img src={swagger} />
                </a>
            </div>
        </nav>
    )
}