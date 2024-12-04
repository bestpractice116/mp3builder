// streamToBuffer.js
// Utility function to convert stream to buffer

async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = []
        stream.on('data', (chunk) => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
}

export default streamToBuffer
