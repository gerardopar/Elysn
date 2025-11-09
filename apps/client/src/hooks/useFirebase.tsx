import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUpsertUserMutation } from "../graphql/mutations/user";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { userStore } from "@stores/user";

export const useFirebase = () => {
  const auth = getAuth();
  const history = useHistory();

  const { setUser, setHydrated, clearUser } = userStore.actions;

  const [upsertUser] = useUpsertUserMutation();

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      if (!isMounted) return;

      if (fbUser) {
        try {
          await fbUser.reload();
          const currentUser = auth.currentUser;

          setUser({
            uid: currentUser?.uid || "",
            email: currentUser?.email || "",
            displayName: currentUser?.displayName || "",
            photoURL: currentUser?.photoURL || "",
            providerId: currentUser?.providerId || "",
          });
        } catch (error) {
          console.error("Error reloading user:", error);
        }
      } else {
        setUser(null);
      }

      setHydrated(true);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setUser, setHydrated]);

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      if (user?.uid) {
        // Call the mutation with variables directly
        const { data } = await upsertUser({
          variables: {
            name: user.displayName || "",
            email: user.email!,
            firebaseUid: user.uid,
            picture: user.photoURL || "",
          },
        });

        const gqlUser = data?.upsertUser;

        if (gqlUser && user) {
          setUser({
            uid: user.uid,
            email: user.email ?? "",
            displayName: user.displayName ?? "",
            photoURL: user.photoURL ?? "",
            providerId: user.providerId,
          });
          history.push("/home");
        }
      } else {
        throw new Error("Missing required user information");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      // Uncomment and use your error handling here
      // if ((error as { message: string }).message) {
      //   open(<ErrorToast message={(error as { message: string }).message} />, {
      //     duration: DEFAULT_TOAST_DURATION,
      //   });
      // }
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      clearUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    handleSignInWithGoogle,
    handleSignOut,
  };
};
