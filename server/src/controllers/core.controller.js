// core.controller.js

import { v4 as uuidv4 } from 'uuid'
import nodeID3 from 'node-id3'
import { 
    S3Client, 
    GetObjectCommand, 
    ListObjectsV2Command, 
    DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import streamToBuffer from '../utils/streamToBuffer.js'

// updateTags - Process MP3 file's tags and get download link
export const updateTags = async (req, res) => 
{
    // Validate file uploads
    const original_mp3 = req.files.file
    const album_art = req.files.album_art

    if (!original_mp3 || original_mp3.mimetype !== "audio/mpeg" || original_mp3.size > 500000000) {
        return res.status(400).json({ error: "Server Error: Invalid Request" })
    }

    if(album_art) {
        if ((album_art.mimetype !== "image/jpeg" && album_art.mimetype !== "image/png" && album_art.mimetype !== "image/jpg") || album_art.size > 25 * 1000000) {
            return res.status(400).json({ error: "Server Error: Invalid album artwork file." })
        }
    }

    // Validate tags
    const title = req.body.title != "" ? req.body.title : "Untitled"
    const artists = req.body.artists != "" ? req.body.artists : "Unknown"
    const album = req.body.album != "" ? req.body.album : "Unknown"
    const track = req.body.track != "" ? req.body.track : "1"
    const year = req.body.year != "" ? req.body.year : ""
    const genres = req.body.genres != "" ? req.body.genres : "Unknown"
    const comments = req.body.comments != "" ? req.body.comments : ""

    try 
    {
        // Configure S3 Client
        const s3Client = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            region: 'us1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY
            },
            forcePathStyle: true
        })

        // Generate unique identifiers
        const uniqueId = uuidv4()
        const originalMp3Key = `${uniqueId}_original.mp3`
        const convertedMp3Key = `${uniqueId}_converted.mp3`
        const albumArtKey = album_art ? `${uniqueId}_albumart${album_art.mimetype.split('/')[1]}` : null

        // Upload original MP3 to S3
        const mp3Uploader = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.S3_BUCKET,
                Key: originalMp3Key,
                Body: original_mp3.data,
                ContentType: 'audio/mpeg'
            }
        })
        await mp3Uploader.done()

        // Upload album art if provided
        let albumArtBuffer = null
        if (album_art) {
            const albumArtUploader = new Upload({
                client: s3Client,
                params: {
                    Bucket: process.env.S3_BUCKET,
                    Key: albumArtKey,
                    Body: album_art.data,
                    ContentType: album_art.mimetype
                }
            })
            await albumArtUploader.done()
            albumArtBuffer = album_art.data
        }

        // Retrieve original MP3
        const mp3Response = await s3Client.send(new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: originalMp3Key
        }))
        const mp3Buffer = await streamToBuffer(mp3Response.Body)

        // Prepare ID3 tags
        const id3_tags = {
            title: title,
            artist: artists,
            album: album,
            year: year,
            genre: genres,
            comment: {
                language: "eng",
                text: comments
            },
            trackNumber: track
        }

        // Add album art if available
        if (albumArtBuffer) {
            id3_tags.image = {
                mime: album_art.mimetype,
                type: { id: 3, name: "front cover" },
                description: "Album Cover",
                imageBuffer: albumArtBuffer
            }
        }

        // Update ID3 tags
        const taggedMp3Buffer = nodeID3.update(id3_tags, mp3Buffer)
        
        if (!taggedMp3Buffer) {
            return res.status(500).json({ 
                error: "Error - Unable to update ID3 tags."
            })
        }

        // Upload tagged MP3
        const finalUploader = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.S3_BUCKET,
                Key: convertedMp3Key,
                Body: taggedMp3Buffer,
                ContentType: 'audio/mpeg',
                Metadata: {
                    title: title,
                    artist: artists,
                    album: album
                }
            }
        })

        await finalUploader.done()

        // Generate and send download link
        const downloadCommand = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: convertedMp3Key
        })

        const downloadLink = await getSignedUrl(s3Client, downloadCommand, { 
            expiresIn: 2 * 60 * 60
        })

        return res.status(201).json({
            download_link: downloadLink
        })
    } 
    
    catch (error) {
        console.error(error)
        return res.status(500).json({ 
            error: "Server error. Please try again later."
        })
    }
}

// deleteFiles - CRON job for deleting files older than 2 hours
export const deleteFiles = async (req, res) => {
    try 
    {
        // Configure the S3 Client
        const s3Client = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            region: "us1",
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
            },
            forcePathStyle: true,
        });

        const bucketName = process.env.S3_BUCKET;

        // List all objects in the bucket
        const listCommand = new ListObjectsV2Command({ Bucket: bucketName });
        const listResponse = await s3Client.send(listCommand);

        if (!listResponse.Contents || listResponse.Contents.length === 0) {
            return res.status(200).json({ message: "No files in storage." });
        }

        const now = new Date();
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

        // Filter objects older than 2 hours
        const objectsToDelete = listResponse.Contents.filter((obj) => {
            const lastModified = new Date(obj.LastModified);
            return lastModified < twoHoursAgo;
        }).map((obj) => ({ Key: obj.Key }));

        if (objectsToDelete.length === 0) {
            return res.status(200).json({ message: "No files eligible for deletion." });
        }

        // Delete filtered objects
        const deleteCommand = new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: { Objects: objectsToDelete },
        });

        await s3Client.send(deleteCommand);

        return res.status(201).json({
            message: `${objectsToDelete.length} files deleted successfully.`,
        });
    } 
    
    catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "Error cleaning up generated files. Please try again later.",
        });
    }
}
