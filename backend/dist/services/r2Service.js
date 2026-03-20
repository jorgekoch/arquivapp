"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.r2 = void 0;
exports.buildPrivateStorageKey = buildPrivateStorageKey;
exports.createPrivateUploadUrl = createPrivateUploadUrl;
exports.uploadPublicFile = uploadPublicFile;
exports.deletePublicFile = deletePublicFile;
exports.deletePrivateFile = deletePrivateFile;
exports.generatePrivateFileUrl = generatePrivateFileUrl;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const publicBucket = process.env.R2_PUBLIC_BUCKET;
const privateBucket = process.env.R2_PRIVATE_BUCKET;
const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;
exports.r2 = new client_s3_1.S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
function sanitizeFileName(fileName) {
    return fileName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9._-]/g, "")
        .toLowerCase();
}
function buildPrivateStorageKey(originalName, userId, folderId) {
    const safeName = sanitizeFileName(originalName);
    return `users/${userId}/folders/${folderId}/${Date.now()}-${safeName}`;
}
async function createPrivateUploadUrl(key, mimeType, expiresIn = 300) {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: privateBucket,
        Key: key,
        ContentType: mimeType,
    });
    const url = await (0, s3_request_presigner_1.getSignedUrl)(exports.r2, command, { expiresIn });
    return { url, key };
}
async function uploadPublicFile(fileBuffer, originalName, mimeType, folder = "uploads") {
    const safeName = sanitizeFileName(originalName);
    const key = `${folder}/${Date.now()}-${safeName}`;
    await exports.r2.send(new client_s3_1.PutObjectCommand({
        Bucket: publicBucket,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
    }));
    return {
        key,
        url: `${publicBaseUrl}/${key}`,
    };
}
async function deletePublicFile(key) {
    await exports.r2.send(new client_s3_1.DeleteObjectCommand({
        Bucket: publicBucket,
        Key: key,
    }));
}
async function deletePrivateFile(key) {
    await exports.r2.send(new client_s3_1.DeleteObjectCommand({
        Bucket: privateBucket,
        Key: key,
    }));
}
async function generatePrivateFileUrl(key, expiresIn = 300) {
    const command = new client_s3_1.GetObjectCommand({
        Bucket: privateBucket,
        Key: key,
    });
    return (0, s3_request_presigner_1.getSignedUrl)(exports.r2, command, { expiresIn });
}
