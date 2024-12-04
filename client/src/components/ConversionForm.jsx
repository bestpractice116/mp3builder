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

        // Validate uploaded file

        const original_mp3 = e.target.file.files[0]
        
        if (!original_mp3) {
            setError("Please upload an MP3 file")
            return
        }

        if (original_mp3.type !== "audio/mpeg") {
            setError("Please upload an MP3 file")
            return
        }
        
        if (original_mp3.size > 500000000) {
            setError("Please upload a file less than 500MB")
            return
        }

        // Validate tags

        const title = e.target.title.value
        const artists = e.target.artists.value
        const album = e.target.album.value
        const track = e.target.track.value
        const year = e.target.year.value
        const genres = e.target.genres.value
        const comments = e.target.comments.value
        const album_art = e.target.album_art.files[0]

        // Validate input lengths and required fields

        if (title.length > 100 || artists.length > 100 || album.length > 100 || track.length > 100 || genres.length > 100 || comments.length > 100) {
            setError("Please limit all fields to 100 characters.")
            return
        }

        if (title.length === 0 || artists.length === 0) {
            setError("Please fill out all required fields.")
            return
        }

        // Validate list types

        const commaRegex = /^(?:[\w\s]+)(?:,\s*[\w\s]+)*$/
        if(genres !== "" && !commaRegex.test(genres)) {
            setError("Genres must be comma separated.")
            return
        }

        if(!commaRegex.test(artists)) {
            setError("Artists must be comma separated.")
            return
        }

        const yearRegex = /^\d{4}$/
        if(year !== "" && !yearRegex.test(year)) {
            setError("Please enter a valid year.")
            return
        }

        const trackNumberRegex = /^\d+$/
        if(track !== "" && !trackNumberRegex.test(track)) { 
            setError("Track number must be a number.")
            return
        }

        // Validate album art file
        
        if(album_art) 
        {
            if(album_art.type !== "image/jpeg" && album_art.type !== "image/png" && album_art.type !== "image/jpg") {
                setError("Please upload a JPEG or PNG file.")
                return
            }
    
            if(album_art.size > 25 * 1000000) {
                setError("Please upload album artwork files less than 25MB.")
                return
            }
        }

        // Process file

        document.getElementById("download-btn").classList.add("d-none")
        document.getElementById("loader").classList.remove("d-none")

        const formData = new FormData()
        formData.append("file", original_mp3)
        formData.append("title", title)
        formData.append("artists", artists)
        formData.append("album", album)
        formData.append("track", track)
        formData.append("year", year)
        formData.append("genres", genres)
        formData.append("comments", comments)
        formData.append("album_art", album_art)

        const result = await fetch(`${import.meta.env.VITE_BASE_API_URL}/process`, {
            method: "POST",
            body: formData
        })

        const response = await result.json()

        if(result.ok) 
        {
            // Update UI
            document.getElementById("loader").classList.add("d-none")
            document.getElementById("download-btn").classList.remove("d-none")
            document.getElementById("conversion-form").reset()

            // Fetch download link and attempt to download
            setDownloadLink(response.download_link)
            
            try 
            {
                const file_response = await fetch(response.download_link)
                const blob = await file_response.blob()
                saveAs(blob, `${title} - ${artists}_mp3builder.net.mp3`)
            } 
            
            catch (error) {
                console.error("Failed to automatically download file. Please download it manually.")
            }
        } 
        
        else 
        {
            document.getElementById("loader").classList.add("d-none")
            document.getElementById("download-btn").classList.remove("d-none")
            setError(response.error)
        }
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
                                    <label className="form-label">Song Title <span className="text-danger">*</span></label>
                                    <input className="form-control form-control-dark bg-dark text-light rounded-0" type="text" id="title" name="title" placeholder="Enter the song title" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Artist(s) <span className="text-danger">*</span></label>
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
