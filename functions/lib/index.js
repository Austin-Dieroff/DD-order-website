"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
__exportStar(require("./functions/createSalesOrder"), exports);
// export * from "./functions/retrieveEbayOrders";
// export * from "./functions/retrieveAmazonOrders";
__exportStar(require("./functions/ipnListener"), exports);
// export * from "./functions/listUsers";
// export * from "./functions/addUser";
// export * from "./functions/deleteUser";
// export * from "./functions/changeUserPassword";
__exportStar(require("./functions/orderMetrics"), exports);
__exportStar(require("./functions/listUsers"), exports);
//Test functions
// export * from "./functions/retrieveAmazonOrdersTest";
// export * from "./functions/retrieveEbayOrdersTest";
//# sourceMappingURL=index.js.map