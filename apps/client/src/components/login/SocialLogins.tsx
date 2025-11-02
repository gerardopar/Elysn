import React from "react";

import GoogleIcon from "@components/svgs/GoogleIcon";
import AppleIcon from "@components/svgs/AppleIcon";

import { useFirebase } from "../../hooks/useFirebase";

export const SocialLogins: React.FC = () => {
  const { handleSignInWithGoogle } = useFirebase();

  const buttonStyles = `text-center flex items-center justify-center gap-2 text-seasalt w-full !font-roboto
      !border-[1px] !border-seasalt !rounded-[6px] !px-4 !py-2 !max-w-[375px] !font-[400] !tracking-wide !relative`;

  return (
    <div className="w-full flex justify-center items-center flex-col gap-2">
      <button
        type="button"
        onClick={handleSignInWithGoogle}
        className={buttonStyles}
      >
        <GoogleIcon className="h-6 w-6 " /> Google Login
      </button>
      <button type="button" className={buttonStyles}>
        <AppleIcon className="h-6 w-6" /> Apple Login
      </button>
    </div>
  );
};

export default SocialLogins;
