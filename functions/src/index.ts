// import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();

export * from "./functions/createSalesOrder";
// export * from "./functions/retrieveEbayOrders";
// export * from "./functions/retrieveAmazonOrders";
export * from "./functions/ipnListener";
// export * from "./functions/listUsers";
// export * from "./functions/addUser";
// export * from "./functions/deleteUser";
// export * from "./functions/changeUserPassword";
export * from "./functions/orderMetrics";
export * from "./functions/listUsers";

//Test functions
// export * from "./functions/retrieveAmazonOrdersTest";
// export * from "./functions/retrieveEbayOrdersTest";


