// Header.jsx -- Header Component

function Header() {
    return (
        <section className="container">
            <div className="row mt-5 mb-3">
                <div className="col-lg-9 mx-auto text-center">
                    <img src="/logo.svg" alt="MP3Builder Logo" className="hero-img" />
                    <h1>MP3Builder</h1>
                    <p className="lead">Upload your MP3 files and edit your MP3's tags and metadata.</p>
                </div>
            </div>
        </section>
    )
}

export default Header