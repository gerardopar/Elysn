import { useEffect } from "react";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { userStore } from "../stores/user";

export const useFirebase = () => {
  const auth = getAuth();

  const user = userStore.useTracked("user");
  const { setUser, setHydrated, clearUser } = userStore.actions;

  // const { mutateAsync: upsertUser } = trpc.user.createUser.useMutation();

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

      setUser({
        uid: user?.uid,
        email: user?.email ?? "",
        displayName: user?.displayName ?? "",
        photoURL: user?.photoURL ?? "",
        providerId: user?.providerId,
      });

      // await upsertUser(
      //   {
      //     email: user?.email ?? "",
      //     name: "",
      //     firebaseUid: user?.uid,
      //     picture: user?.photoURL ?? "",
      //   },
      //   {
      //     onSuccess: () => closeModal(),
      //   }
      // );
    } catch (error) {
      if ((error as { message: string }).message) {
        // console.error((error as { message: string }).message);
        // open(<ErrorToast message={(error as { message: string }).message} />, {
        //   duration: DEFAULT_TOAST_DURATION,
        // });
        // return;
      }
    }
  };

  const handleSignOut = () => {
    try {
      auth.signOut();
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
