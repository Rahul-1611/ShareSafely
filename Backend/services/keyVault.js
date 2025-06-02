const { DefaultAzureCredential } = require("@azure/identity")
const { SecretClient } = require("@azure/keyvault-secrets")
require('dotenv').config();

const credential = new DefaultAzureCredential();
//takes cred from the cli session

// Build the URL to reach your key vault
const vaultName = process.env.AZURE_KEY_VAULT_NAME;
const url = `https://${vaultName}.vault.azure.net`

// Lastly, create our secrets client and connect to the service
const client = new SecretClient(url, credential);

async function getStorageAccessKey(secretName) {
    const secret = await client.getSecret(secretName);
    return secret.value;
}

module.exports = { getStorageAccessKey }