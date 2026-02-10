const { uploadFile, generateSaSUrl } = require("../services/blob");

module.exports = async function (context, req) {
    context.log('UploadFile function processed a request.');

    try {
        // Expecting file as Base64 and expiry in request body
        const file = req.body.file;
        const expiry = parseInt(req.body.expiry, 10);
        const contentType = req.body.contentType;

        if (!file || !expiry || !contentType) {
            context.res = {
                status: 400,
                body: { error: "Missing file, expiry, or contentType" }
            };
            return;
        }

        // Decode Base64 file data
        const fileBuffer = Buffer.from(file.data, 'base64');
        const blobName = Date.now() + "_" + file.name;

        // Upload to Azure Blob Storage
        await uploadFile(blobName, fileBuffer, contentType);

        // Generate SAS URL
        const sasUrl = await generateSaSUrl(blobName, expiry);

        // Simulate delay (as in your original code)
        await new Promise(resolve => setTimeout(resolve, 2000));

        context.res = {
            status: 200,
            body: { link: sasUrl }
        };
    } catch (err) {
        context.log.error("Error generating SAS link", err);
        context.res = {
            status: 500,
            body: { error: "Internal Server Error" }
        };
    }
};