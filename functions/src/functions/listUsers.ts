import { onRequest } from "firebase-functions/v2/https";
import { getAuth } from "firebase-admin/auth";
 
export const listUsers = onRequest({cors:true}, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send({ error: "Method Not Allowed" });
    return;
  }
 
  try {
    const listUsersResult = await getAuth().listUsers();
    const users = listUsersResult.users.map(userRecord => userRecord.toJSON());
    console.log("List of users:", users);  // Logging each user's data, optional based on your logging preferences
    res.send(users);
  } catch (error:any) {
    console.log("Error listing users:", error);
    res.status(500).send({ error: "Error listing users: " + error.message });
  }
});