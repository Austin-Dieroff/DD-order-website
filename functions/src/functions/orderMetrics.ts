// import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import * as functions from "firebase-functions/v2";
import { onDocumentWritten } from "firebase-functions/v2/firestore";

// Initialize Firebase Admin with default credentials
// initializeApp();

export const orderMetrics = onDocumentWritten(
  "unapprovedOrders/{orderId}",
  async (event) => {
    const db = getFirestore();

    // Collect all promises to update metrics in parallel
    const metricsUpdatePromises = [];

    const updateOrderMetrics = async (salesChannel: string) => {
      const snapshot = await db
        .collection("unapprovedOrders")
        .where("salesChannel", "==", salesChannel)
        .get();
      const orderCount = snapshot.size;
      const docRef = db.collection("var").doc("orderMetrics");
      return docRef.update({
        [`${salesChannel.toLowerCase()}OrderCount`]: orderCount,
      });
    };

    // Update metrics for each sales channel
    metricsUpdatePromises.push(updateOrderMetrics("Credit Card"));
    metricsUpdatePromises.push(updateOrderMetrics("ebay"));
    metricsUpdatePromises.push(updateOrderMetrics("amazon"));

    // Additional calculation for overall unapproved orders
    const allUnapprovedOrdersSnapshot = await db
      .collection("unapprovedOrders")
      .get();
    const unapprovedOrderCount = allUnapprovedOrdersSnapshot.size;
    metricsUpdatePromises.push(
      db.collection("var").doc("orderMetrics").update({ unapprovedOrderCount })
    );

    return Promise.all(metricsUpdatePromises);
  }
);
