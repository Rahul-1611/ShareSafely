require('dotenv').config(); // Load .env first

const { getStorageAccessKey } = require('./services/keyVault');

(async () => {
    try {
        const secretName = process.env.STORAGE_SECRET_NAME;
        const key = await getStorageAccessKey(secretName);
        console.log("✅ Secret fetched successfully:");
        console.log(key); // Should print your storage access key
    } catch (err) {
        console.error("❌ Failed to fetch secret:");
        console.error(err.message);
    }
})();