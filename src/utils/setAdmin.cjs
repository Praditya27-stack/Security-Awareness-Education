const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function setAdmin() {
  try {
    const user = await admin.auth().getUserByEmail("");
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin claim granted to ${user.email}`);
  } catch (error) {
    console.error("Error setting admin claim:", error);
  }
}

setAdmin();
