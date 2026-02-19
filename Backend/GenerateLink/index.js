const { generateSaSUrl } = require("../services/blob");

module.exports = async function (context, req) {
    context.log('GenerateLink function processed a request.');

    try {
        const blobName = req.body.blobName;
        const expiry = parseInt(req.body.expiry, 10);

        if (!blobName || !expiry) {
            context.res = {
                status: 400,
                body: { error: "Missing blobName or expiry" }
            };
            return;
        }

        // Generate a read-only SAS URL for the uploaded blob
        const sasUrl = await generateSaSUrl(blobName, expiry);

        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
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
