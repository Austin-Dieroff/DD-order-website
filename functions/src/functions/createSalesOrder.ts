import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin with default credentials

const key = "B8Ua8Kp1CEOjibOIu+8ONg==";

export const createSalesOrder = onRequest({cors:true}, async (req, res) => {
  try {
    // Check for POST request
    if (req.method !== "POST") {
      res.status(400).send("Please send a POST request");
      return;
    }

    // Check authorization key
    const api_key = req.get("authorization");
    if (key === api_key) {
      console.log("Authentication granted");
    } else {
      console.log(
        "Unable to grant access, your authorization key is either not present or incorrect."
      );
      res
        .status(400)
        .send(
          "Unable to grant access, your authorization key is either not present or incorrect."
        );
      return;
    }

    // Add order to db
    const orderId = req.body.orderId;
    const order = req.body;
    console.log("Attempting to add order: ", orderId);
    console.log("Order content: ", order);
    const db = getFirestore();
    await db
      .collection("unapprovedOrders")
      .doc(orderId)
      .set(order)
      .then(() => {
        console.log(`DB Record for ${orderId} successfully added.`);
        res.send({
          success: true,
          message: "Successfully added order: " + orderId,
        });
      })
      .catch((error) => {
        console.log(`Error updating DB record for ${orderId} !`, error);
        res.status(500).send({
          success: false,
          message: `Error updating DB record for ${orderId} ! ` + error,
        });
      });
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ success: false, message: err.message });
  }
});
