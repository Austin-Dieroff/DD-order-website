import * as admin from "firebase-admin";

// export async function checkOrderExists(orderID: string) {
//   //temp
//   // return false;

//   const db = admin.firestore();

//   //Unapproved Orders
//   const unapprovedOrdersRef = db.collection("unapprovedOrders");
//   const unapprovedOrderExists = await unapprovedOrdersRef
//     .doc(orderID)
//     .get()
//     .then(doc => {
//       if (!doc.exists) {
//         return false; //Doc does not exist
//       } else {
//         return true; //Doc exists
//       }
//     })
//     .catch(err => {
//       console.log("Error getting document", err);
//       return true; //Return true to avoid trying to add duplicate order but continue func execution
//     });

//   if (unapprovedOrderExists) {
//     return true;
//   }

//   //Approved Orders
//   const approvedOrdersRef = db.collection("approvedOrders");
//   const approvedOrderExists = await approvedOrdersRef
//     .doc(orderID)
//     .get()
//     .then(doc => {
//       if (!doc.exists) {
//         return false; //Doc does not exist
//       } else {
//         return true; //Doc exists
//       }
//     })
//     .catch(err => {
//       console.log("Error getting document", err);
//       return true; //Return true to avoid trying to add duplicate order but continue func execution
//     });

//   return approvedOrderExists;
// }

export function checkOrderExists(collection: string, orderID: string) {
  const db = admin.firestore();

  return db
    .collection(collection)
    .doc(orderID)
    .get()
    .then(doc => {
      console.log("TCL: doc.data()", doc.data());
      console.log("TCL: doc.exists", doc.exists);

      if (doc.exists) {
        return true; // Doc exists
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
      return true; //Return true to avoid trying to add duplicate order but continue func execution
    });
}
