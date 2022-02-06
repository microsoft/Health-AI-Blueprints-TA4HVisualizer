require('dotenv').config();
const crypto = require('crypto');
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const STORAGE_KEY = process.env.STORAGE_KEY;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const cors = require("cors");
// Initialize the web app instance,
const app = express();
app.use(cors());
app.use(cookieParser());

// add middlewares
app.use(express.static(path.join(__dirname, "azure-webapp", "build")));

// begin listening for requests.
const port = process.env.PORT || 5000;
const region = process.env.REGION || "Unknown";

app.listen(port, function() {
    console.log("Express server listening on port " + port);
});

function healthResponse(res, statusCode, message) {
    res.status(statusCode).send({
        health: message,
        region: region
    });
}
function healthy(res) {
    healthResponse(res, 200, "Ok");
}

app.get('/health', function(req, res) {
    healthy(res);
});

app.get('/generateSasToken', function(req, res) {
    res.status(200).send({
        storageUri: `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/`,
        storageAccessToken: generateSasToken(30)
    });
});

const generateSasToken = function(expiresInMinutes) {

    const accountName = STORAGE_ACCOUNT_NAME;
    const key = STORAGE_KEY;
    const end = new Date(new Date().getTime() + (expiresInMinutes * 60 * 1000));
    const signedPermissions = 'rwdlac';
    const signedService = 'b';
    const signedResourceType = 'sco';
    const signedExpiry = end.toISOString().substring(0, end.toISOString().lastIndexOf('.')) + 'Z';
    const signedProtocol = 'https';
    const signedVersion = '2020-08-04';

    const stringToSign =
        accountName + '\n' +
        signedPermissions + '\n' +
        signedService + '\n' +
        signedResourceType + '\n' + '\n' +
        signedExpiry + '\n' + '\n' +
        signedProtocol + '\n' +
        signedVersion + '\n';

    const sig = crypto.createHmac('sha256', Buffer.from(key, 'base64')).update(stringToSign, 'utf8').digest('base64');
    const sasToken = `sv=${(signedVersion)}&ss=${(signedService)}&srt=${(signedResourceType)}&sp=${(signedPermissions)}&se=${encodeURIComponent(signedExpiry)}&spr=${(signedProtocol)}&sig=${encodeURIComponent(sig)}`;
    return sasToken;
};
