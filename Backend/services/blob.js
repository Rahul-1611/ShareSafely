const { BlobServiceClient, generateBlobSASQueryParameters, ContainerSASPermissions, BlobSASPermissions } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

let credential = new DefaultAzureCredential();
// takes cred from azure BTS (Managed Identity)(locally  taking from CLI session)
// function app - turn on managed identity first

let url = `https://${accountName}.blob.core.windows.net`;

let blobServiceClient = new BlobServiceClient(url, credential);

// Generates a short-lived write-only SAS URL for the frontend to upload directly to Blob Storage
const generateUploadSaSUrl = async (blobName, contentType) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const now = new Date();
    const expiresOn = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes to upload
    const userDelegationKey = await blobServiceClient.getUserDelegationKey(now, expiresOn);

    const sasToken = generateBlobSASQueryParameters({
        containerName,
        blobName,
        permissions: BlobSASPermissions.parse("cw"), // create + write only
        startsOn: now,
        expiresOn: expiresOn,
        contentType: contentType
    }, userDelegationKey, accountName).toString();

    return `${blobClient.url}?${sasToken}`;
};

// Generates a read-only SAS URL for sharing the uploaded file
const generateSaSUrl = async (blobName, expiryInSeconds) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // 🔑 Get user delegation key
    const now = new Date();
    const expiresOn = new Date(now.getTime() + expiryInSeconds * 1000);
    const userDelegationKey = await blobServiceClient.getUserDelegationKey(now, expiresOn);

    const sasToken = generateBlobSASQueryParameters({
        containerName,
        blobName,
        permissions: ContainerSASPermissions.parse("r"),
        startsOn: now,
        expiresOn: expiresOn
    }, userDelegationKey, accountName).toString();

    return `${blobClient.url}?${sasToken}`;
};

module.exports = { generateUploadSaSUrl, generateSaSUrl }