// Legal.jsx -- Terms and Privacy Pages

import Footer from "../components/Footer"
import TermsBox from "../components/TermsBox"
import PrivacyBox from "../components/PrivacyBox"

function Legal({page}) {
    return (
        <>
            {page === "terms" ? <TermsBox /> : <PrivacyBox />}
            <Footer />
        </>
    )
}

export default Legal