// ConversionForm.jsx
// Accepts MP3 upload and sends download link for converted file

import { useState } from "react"
import { saveAs } from "file-saver"

function ConversionForm() {

    const [error, setError] = useState(null)
    const [downloadLink, setDownloadLink] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setDownloadLink(null)
    }

    return (
        <section className="container">
            <div className="row py-2">

                <div className="col-lg-6 mx-auto">
                    <div className="card p-3 mb-5 rounded-0 shadow bg-dark text-ivory">
                        <div className="card-body">

                            <form id="conversion-form" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label className="form-label">Upload MP3 File</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="file" id="file" name="file" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Song Title</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="title" name="title" placeholder="Enter the song title" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Artist(s)</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="artists" name="artists" placeholder="Enter a comma separated list of artists" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Album</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="album" name="album" placeholder="Enter the album name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Track Number</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="track" name="track" placeholder="Enter the track number" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Year</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="year" name="year" placeholder="Enter the release year" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Genre(s)</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="genres" name="genres" placeholder="Enter a comma separated list of genres" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Comments</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="comments" name="comments" placeholder="Enter any comments" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Upload Album Art</label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="file" id="album_art" name="album_art" />
                                </div>
                                
                                <div className="d-flex justify-content-center gap-2 mb-3" id="download-btn">
                                    <button type="submit" className="btn btn-lime btn-lg rounded-0 col-12">
                                        <i className="fa fa-file-upload me-2"></i> Update MP3 Tags
                                    </button>
                                </div>

                                <div className="d-flex justify-content-center gap-2 mb-3 d-none" id="loader">
                                    <i className="fa fa-3x fa-cog fa-spin"></i> Uploading and processing your MP3 file, please don't refresh this page...
                                </div>
                                
                                {
                                    error &&
                                    <div className="mb-3">
                                        <div className="alert rounded-0 bg-danger text-light">
                                            <i className="fa fa-exclamation-triangle me-2"></i>
                                            {error}
                                        </div>
                                    </div>
                                }

                                {
                                    downloadLink &&
                                    <div className="alert rounded-0 bg-success text-light mb-3">
                                        <h4 className="alert-heading"><i className="fa fa-check-circle me-2"></i> MP3 tags successfully updated!</h4>
                                        <p>
                                            Your download should start automatically. If it doesn't, <a download href={downloadLink} className="link-light">click here</a> to download it manually.
                                            Your file will be deleted after 2 hours.
                                        </p>
                                    </div>
                                }

                            </form>
                            
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ConversionForm
