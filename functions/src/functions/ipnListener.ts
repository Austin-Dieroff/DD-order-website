import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
 
export const ipnListener = onRequest({cors:true}, async (req, res) => {
  try {
    // Check for POST request
    if (req.method !== "POST") {
      res.status(400).send("Please send a POST request");
      return;
    }
 
    console.log("POST Request received!");
    console.log("Request Body: ", req.body);
    const body = req.body;
 
    if (body.custom.toUpperCase().includes("ORDER ID")) {
      const custom = body.custom;
      console.log("Custom: ", custom);
      const orderId = custom.substring(custom.indexOf("Order ID: ") + 10, custom.indexOf(","));
      const notes = custom.substring(custom.indexOf(",") + 2);
      console.log("Order ID: ", orderId);
      console.log("Notes: ", notes);
 
      // Retrieve order from db
      const db = getFirestore();
      const doc = await db.collection("unapprovedOrders").doc(orderId).get();
 
      if (doc.exists) {
        console.log("Document: ", doc.data());
        const order = doc.data() || {};
 
        // Update order details
        order.shipToContact = order.billToContact = {
          name: body.address_name,
          phone1: body.contact_phone,
          email: body.payer_email
        };
        order.shipToAddress = order.billToAddress = {
          addressLine1: body.address_street,
          city: body.address_city,
          state: body.address_state,
          country: body.address_country,
          zipCode: body.address_zip
        };
        order.notes = notes;
        order.paymentReceived = true;
 
        // Update buyer name handling
        let buyerName = body.address_name || "";
        buyerName = buyerName.includes(" ") ? buyerName.split(" ")[0].toLowerCase() : buyerName.toLowerCase();
        order.orderDetails = {
          ...order.orderDetails,
          orderedBy: buyerName,
          customerPO: buyerName,
          attention: buyerName
        };
 
        // Write updated order to db
        await db.collection("unapprovedOrders").doc(orderId).set(order);
        console.log("Order document updated in db");
        res.send({ success: true, message: "POST request successfully processed." });
      } else {
        console.log("Unable to find order in database!");
        res.status(404).send({ success: false, message: "Order not found in the database." });
      }
    } else {
      res.send({ success: true, message: "POST request successfully processed." });
    }
  } catch (err:any) {
    console.error("Error: ", err);
    res.status(500).send({ success: false, message: err.message });
  }
});