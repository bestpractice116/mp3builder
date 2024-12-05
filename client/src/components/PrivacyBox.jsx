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
                    
                    <p>Last updated: <strong>Dec 05, 2023</strong></p>

                    <p>At <strong>MP3Builder</strong>, we value your privacy. This policy outlines how we handle the files and data you interact with while using our service.</p>
  
                    <h2>1. No Personal Data Collection</h2>
                    <p>We do not collect personal information, require account signups, or use cookies to track your activity on our website.</p>
                    
                    <h2>2. File Handling</h2>
                    <ul>
                        <li>Uploaded MP3 files and album art are stored temporarily for processing.</li>
                        <li>All user files are automatically deleted from our servers within <strong>2 hours</strong> of upload.</li>
                    </ul>
                    
                    <h2>3. Data Security</h2>
                    <p>We use secure servers to process your files. However, we recommend not uploading sensitive or confidential files, as we cannot guarantee absolute security.</p>
                    
                    <h2>4. Third-Party Services</h2>
                    <p>Our service does not rely on third-party analytics or advertising platforms, ensuring that no external parties have access to your activity or files.</p>
                    
                    <h2>5. Changes to This Policy</h2>
                    <p>We may update this privacy policy to reflect changes in our services. Any updates will be posted on this page, and continued use of our services signifies your acceptance of the updated policy.</p>
                    
                    <p>If you have questions about our privacy practices, please <a className="link" href="mailto:info@mp3builder.net">contact us</a>.</p>

                </div>
            </div>
        </section>
    )
}

export default PrivacyBox