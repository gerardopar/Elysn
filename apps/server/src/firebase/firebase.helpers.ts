import { firebaseAdmin } from "./firebase.js";
import { UserRecord } from "firebase-admin/auth";

export const updateFirebaseUser = async (uid: string, user: UserRecord) => {
  try {
    const userRecord = await firebaseAdmin.auth().updateUser(uid, {
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    });
    return userRecord;
  } catch (error) {
    console.error("Failed to update Firebase user:", error);
    throw new Error("Failed to update Firebase user");
  }
};

export const deleteFirebaseUser = async (uid: string) => {
  try {
    await firebaseAdmin.auth().deleteUser(uid);
  } catch (error) {
    console.error("Failed to delete Firebase user:", error);
    throw new Error("Failed to delete Firebase user");
  }
};
