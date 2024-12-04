// PrivacyBox.jsx -- Privacy Policy Box

import { Link } from "react-router-dom"

function PrivacyBox() {
    return (
        <section className="container">
            <div className="row py-5 mb-4">
                <div className="col-lg-12 mb-5 text-center">
                    <Link className="link" to="/"><i className="fa fa-arrow-left me-2"></i> Return Home</Link>
                </div>
                <div className="col-lg-6 mx-auto">
                    <h1 className="text-center mb-3">Privacy Policy</h1>
                </div>
            </div>
        </section>
    )
}

export default PrivacyBox