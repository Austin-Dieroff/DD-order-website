"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveEbayOrdersTest = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const ebay_api_simple_1 = require("ebay-api-simple");
const helpers_1 = require("../helpers");
const clientID = "MichaelD-OrderInt-PRD-d447dc53a-03d21425";
const clientSecret = "PRD-447dc53a5837-ef80-4a7b-bcf4-ac47";
/**
 * Test function for the retrieveEbayOrders recurring cloud function
 *
 */
exports.retrieveEbayOrdersTest = functions.https.onCall(async (data, context) => {
    console.log("TCL: data", data);
    console.log("TCL: context", context);
    console.log("retrieveEbayOrdersTest function running...");
    try {
        const ebayAPI = new ebay_api_simple_1.EbayAPI(clientID, clientSecret);
        const createdAfter = new Date();
        createdAfter.setDate(createdAfter.getDate() - 4);
        const db = admin.firestore();
        const accessTokenRef = db.doc("var/ebayAccessToken");
        const refreshTokenRef = db.doc("var/ebayRefreshToken");
        //Update access token
        return accessTokenRef.get().then(async (doc) => {
            let accessToken = await doc.data().value;
            console.log("TCL: accessToken", accessToken);
            return ebayAPI
                .validAccessToken(accessToken)
                .then(async (validAccessTokenResult) => {
                console.log("TCL: validAccessTokenResult", validAccessTokenResult);
                //If accessToken is expired
                if (!validAccessTokenResult) {
                    //retrieve refreshToken from db
                    accessToken = await refreshTokenRef
                        .get()
                        .then(async (refreshDoc) => {
                        const refreshToken = await refreshDoc.data().value;
                        return ebayAPI
                            .renewAccessToken(refreshToken)
                            .then(renewResult => {
                            const newAccessToken = renewResult;
                            const writeResult = accessTokenRef.set({
                                value: newAccessToken
                            });
                            console.log("TCL: writeResult", writeResult);
                            return newAccessToken;
                        });
                    });
                }
                console.log("TCL: createdAfter.toISOString()", createdAfter.toISOString());
                //Get orders
                return ebayAPI.fulfillment
                    .getOrders(accessToken, createdAfter.toISOString())
                    .then((getOrdersResult) => {
                    const orders = getOrdersResult.orders;
                    console.log("TCL: orders", orders);
                    const actions = orders.map(addOrderToDB);
                    return Promise.all(actions);
                })
                    .catch(function (error) {
                    console.log("error ", error);
                    return error;
                });
                // return result;
            });
            // return accessToken;
        });
    }
    catch (error) {
        console.log("TCL: error", error);
        return error;
    }
});
//
async function addOrderToDB(order) {
    console.log("order: ", order.orderId);
    const db = admin.firestore();
    //Check if order exists
    return (0, helpers_1.checkOrderExists)("archivedOrders", order.orderId)
        .then(async (orderExists) => {
        if (!orderExists) {
            console.log("order does not exist");
            const newOrder = {
                orderId: order.orderId,
                salesChannel: "ebay",
                date: order.creationDate,
                notes: `Order ID: ${order.orderId}`,
                paymentReceived: true,
                orderDetails: {
                    salesperson: "",
                    jobNumber: "",
                    orderedBy: order.fulfillmentStartInstructions[0].shippingStep.shipTo.fullName.substr(0, order.fulfillmentStartInstructions[0].shippingStep.shipTo.fullName.indexOf(" ")),
                    customerPO: order.fulfillmentStartInstructions[0].shippingStep.shipTo.fullName.substr(0, order.fulfillmentStartInstructions[0].shippingStep.shipTo.fullName.indexOf(" ")),
                    attention: order.fulfillmentStartInstructions[0].shippingStep.shipTo.fullName.substr(0, order.fulfillmentStartInstructions[0].shippingStep.shipTo.fullName.indexOf(" "))
                },
                customerDetails: {
                    vatBranchID: "230",
                    termsCode: "   EBay"
                },
                billToContact: {
                    name: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .fullName,
                    phone1: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .primaryPhone.phoneNumber,
                    email: order.fulfillmentStartInstructions[0].shippingStep.shipTo.email
                },
                shipToContact: {
                    name: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .fullName,
                    phone1: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .primaryPhone.phoneNumber,
                    email: order.fulfillmentStartInstructions[0].shippingStep.shipTo.email
                },
                billToAddress: {
                    addressLine1: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.addressLine1,
                    addressLine2: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.addressLine2,
                    city: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.city,
                    state: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.stateOrProvince,
                    country: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.countryCode,
                    zipCode: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.postalCode
                },
                shipToAddress: {
                    addressLine1: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.addressLine1,
                    addressLine2: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.addressLine2,
                    city: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.city,
                    state: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.stateOrProvince,
                    country: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.countryCode,
                    zipCode: order.fulfillmentStartInstructions[0].shippingStep.shipTo
                        .contactAddress.postalCode
                },
                lines: []
            };
            order.lineItems.forEach((line) => {
                const newLine = {
                    partNumber: line.title.split(" - ")[3],
                    qty: line.quantity,
                    price: line.lineItemCost.value
                };
                newOrder.lines.push(newLine);
            });
            return db
                .collection("unapprovedOrders")
                .doc(newOrder.orderId)
                .set(JSON.parse(JSON.stringify(newOrder)))
                .then(function () {
                console.log(`DB Record for ${newOrder.orderId} successfully added.`);
                return `DB Record for ${newOrder.orderId} successfully added.`;
            })
                .catch(function (error) {
                console.log(`Error updating DB record for ${newOrder.orderId}\n${error}`);
                return `Error updating DB record for ${newOrder.orderId}\n${error}`;
            });
        }
        else {
            console.log("order already exists");
            return "order already exists";
        }
    })
        .catch(function (error) {
        console.log("error ", error);
        return error;
    });
}
//# sourceMappingURL=retrieveEbayOrdersTest.js.map