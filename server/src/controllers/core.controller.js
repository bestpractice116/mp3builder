// core.controller.js

import nodeID3 from 'node-id3'
import { 
    S3Client, 
    GetObjectCommand, 
    DeleteObjectCommand, 
    ListObjectsV2Command, 
    DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import streamToBuffer from '../utils/streamToBuffer.js'

// updateTags - Update MP3 tags and send download link
export const updateTags = async (req, res) => {
    //...
}

// deleteFiles - CRON job - Delete files older than 2 hours
export const deleteFiles = async (req, res) => {
    //...
}