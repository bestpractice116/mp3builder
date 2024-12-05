// TermsBox.jsx -- Terms of Service Box

import { Link } from "react-router-dom"

function TermsBox() {
    return (
        <section className="container">
            <div className="row py-5 mb-4">
                <div className="col-lg-12 mb-5 text-center">
                    <Link className="link" to="/"><i className="fa fa-arrow-left me-2"></i> Return Home</Link>
                </div>
                <div className="col-lg-6 mx-auto">
                    <h1 className="text-center mb-3">Terms of Service</h1>

                    <p>Last updated: <strong>Dec 05, 2023</strong></p>

                    <p>Welcome to <strong>MP3Builder</strong>. By using our services, you agree to comply with the following terms and conditions. Please read them carefully before using the website.</p>
                    
                    <h2>1. Use of Service</h2>
                    <p>Our services are provided for use based on terms outlined by the MIT License.</p>
                    
                    <h2>2. User Responsibilities</h2>
                    <p>You are responsible for ensuring that your use of our services complies with all applicable laws and regulations. We are not liable for misuse or copyright violations.</p>
                    
                    <h2>3. Prohibited Activities</h2>
                    <ul>
                        <li>Engaging in activities that harm or disrupt our website or services.</li>
                        <li>Uploading or sharing content that infringes on intellectual property rights.</li>
                        <li>Using automated tools to access our services without permission.</li>
                    </ul>
                    
                    <h2>4. Limitation of Liability</h2>
                    <p>MP3Builder is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.</p>
                    
                    <h2>5. Changes to Terms</h2>
                    <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services signifies your acceptance of the updated terms.</p>
                    
                    <h2>6. Contact Information</h2>
                    <p>If you have any questions or concerns about these terms, please contact us at <a className="link" href="mailto:info@mp3builder.net">info@mp3builder.net</a>.</p>
                </div>
            </div>
        </section>
    )
}

export default TermsBox