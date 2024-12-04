// Footer.jsx -- Footer Component

import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 text-center mx-auto mt-2">
                        <p>Built with 💖 and ☕</p>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
                        <Link className="link" to="/legal/terms">Terms of Service</Link>
                        <Link className="link" to="/legal/privacy">Privacy Policy</Link>
                        <a href="https://github.com/kiduswb/mp3builder" target="_blank" rel="noopener" className="link"><i className="fab fa-github"></i> Contribute</a>
                        <a href='https://ko-fi.com/X8X478507' target='_blank'><img height='36' style={{border:0, height:28}} src='https://storage.ko-fi.com/cdn/kofi2.png?v=6' alt='Buy Me a Coffee at ko-fi.com' /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer