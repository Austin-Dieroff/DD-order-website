"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const functions = require("firebase-functions");
const corsModule = require("cors");
const cors = corsModule({ origin: true });
exports.addUser = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // const email = req.body.email;
        // const source = req.body.tokenId;
    });
});
//# sourceMappingURL=addUser.js.map