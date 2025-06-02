const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, ContainerSASPermissions } = require("@azure/storage-blob");
const { getStorageAccessKey } = require("./keyVault");
require('dotenv').config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
const secretName = process.env.STORAGE_SECRET_NAME;

let blobServiceClient;
let sharedKeyCredential;
let url = `https://${accountName}.blob.core.windows.net`

const initializeBlobClient = async () => {
    if (!blobServiceClient || !sharedKeyCredential) {
        const accountKey = await getStorageAccessKey(secretName);
        sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        blobServiceClient = new BlobServiceClient(url, sharedKeyCredential);
    }
};

const uploadFile = async (blobName, buffer, contentType) => {
    await initializeBlobClient();
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: {
            blobContentType: contentType
        }
    });
    return blockBlobClient.url;
}

const generateSaSUrl = async (blobName, expiryInSeconds) => {
    await initializeBlobClient();
    const expiresOn = new Date(Date.now() + expiryInSeconds * 1000);

    const sasToken = generateBlobSASQueryParameters({
        containerName,
        blobName,
        permissions: ContainerSASPermissions.parse("r"),
        expiresOn
    }, sharedKeyCredential).toString();

    return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
};

module.exports = { uploadFile, generateSaSUrl }