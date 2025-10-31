import admin from "firebase-admin";

if (!admin.apps.length) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please set it to the JSON string of your Firebase service account."
    );
  }

  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
      } as admin.ServiceAccount),
    });

    console.log("🔥 Connected to Firebase");
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    throw new Error(
      "Failed to initialize Firebase Admin. Please check your service account configuration."
    );
  }
}

export const firebaseAdmin = admin;
