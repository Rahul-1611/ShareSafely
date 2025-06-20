const { BlobServiceClient, generateBlobSASQueryParameters, ContainerSASPermissions } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

let credential = new DefaultAzureCredential();
// takes cred from azure BTS (Managed Identity)(locally it was taking it from CLI session)

let url = `https://${accountName}.blob.core.windows.net`;

let blobServiceClient = new BlobServiceClient(url, credential);


const uploadFile = async (blobName, buffer, contentType) => {
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

module.exports = { uploadFile, generateSaSUrl }