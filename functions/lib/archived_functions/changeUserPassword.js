"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPassword = void 0;
const functions = require("firebase-functions");
const corsModule = require("cors");
const cors = corsModule({ origin: true });
exports.changeUserPassword = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // const email = req.body.email;
        // const source = req.body.tokenId;
    });
});
//# sourceMappingURL=changeUserPassword.js.map