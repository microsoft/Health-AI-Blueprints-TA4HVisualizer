require('dotenv').config();
const crypto = require('crypto');
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const STORAGE_KEY = process.env.STORAGE_KEY;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const DEV_MODE = process.env.DEV_MODE;

const cors = require("cors");
// Initialize the web app instance,
const app = express();
app.use(cookieParser());

if (DEV_MODE) {
    app.use(cors());
}

let options = {};
// uncomment the line below if you wish to allow only specific domains to embed this page as a frame
//options = {setHeaders: (res, path, stat) => {res.set('Content-Security-Policy', 'frame-ancestors example.com')}};
// Indicate which directory static resources
// (e.g. stylesheets) should be served from.
app.use(express.static(path.join(__dirname, "azure_webapp/build"), options));

// begin listening for requests.
const port = process.env.PORT || 5555;
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
    return `sv=${(signedVersion)}&ss=${(signedService)}&srt=${(signedResourceType)}&sp=${(signedPermissions)}&se=${encodeURIComponent(signedExpiry)}&spr=${(signedProtocol)}&sig=${encodeURIComponent(sig)}`;
};
