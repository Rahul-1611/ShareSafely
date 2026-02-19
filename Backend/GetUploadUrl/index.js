const { generateUploadSaSUrl } = require("../services/blob");

module.exports = async function (context, req) {
    context.log('GetUploadUrl function processed a request.');

    try {
        const fileName = req.body.fileName;
        const contentType = req.body.contentType;

        if (!fileName || !contentType) {
            context.res = {
                status: 400,
                body: { error: "Missing fileName or contentType" }
            };
            return;
        }

        // Create a unique blob name to avoid collisions
        const blobName = Date.now() + "_" + fileName;

        // Generate a short-lived write-only SAS URL
        const uploadUrl = await generateUploadSaSUrl(blobName, contentType);

        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { blobName, uploadUrl }
        };
    } catch (err) {
        context.log.error("Error generating upload URL", err);
        context.res = {
            status: 500,
            body: { error: "Internal Server Error" }
        };
    }
};
