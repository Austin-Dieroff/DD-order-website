"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const corsModule = require("cors");
const cors = corsModule({ origin: true });
exports.listUsers = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // const email = req.body.email;
        // const source = req.body.tokenId;
        // List batch of users, 1000 at a time.
        admin
            .auth()
            .listUsers()
            .then(function (listUsersResult) {
            listUsersResult.users.forEach(function (userRecord) {
                console.log("user", userRecord.toJSON());
            });
        })
            .catch(function (error) {
            console.log("Error listing users:", error);
        });
    });
});
//# sourceMappingURL=listUsers.js.map